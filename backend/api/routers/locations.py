"""Locations router with endpoints for Civil War locations."""

from typing import Optional
from fastapi import APIRouter, HTTPException, Query

from ..dependencies import LocationRepoDep, EventRepoDep
from ..schemas import (
    LocationResponse,
    LocationListResponse,
    LocationDetailResponse,
    PaginationMeta,
    Coordinates,
)

router = APIRouter()


def _build_location_response(location) -> LocationResponse:
    """Build location response from domain model."""
    coords = None
    if location.coordinates:
        coords = Coordinates(lat=location.coordinates.lat, lng=location.coordinates.lng)

    return LocationResponse(
        id=location.id,
        name=location.name,
        type=location.type.value,
        coordinates=coords,
        state=location.state,
        description=location.description,
    )


@router.get("", response_model=LocationListResponse)
async def get_locations(
    location_repo: LocationRepoDep,
    type: Optional[str] = Query(None, description="Location type filter"),
    state: Optional[str] = Query(None, description="State filter"),
    name: Optional[str] = Query(None, description="Name search filter"),
    limit: int = Query(50, ge=1, le=200, description="Maximum results"),
    offset: int = Query(0, ge=0, description="Results offset"),
):
    """Get a paginated list of locations with optional filtering."""
    filters = {}
    if type:
        filters["type"] = type
    if state:
        filters["state"] = state
    if name:
        filters["name"] = name

    locations = await location_repo.get_all(limit=limit, offset=offset, **filters)
    total = await location_repo.count(**filters)

    return LocationListResponse(
        data=[_build_location_response(loc) for loc in locations],
        meta=PaginationMeta(
            total=total,
            limit=limit,
            offset=offset,
            has_more=offset + limit < total,
        ),
    )


@router.get("/bounds")
async def get_locations_in_bounds(
    location_repo: LocationRepoDep,
    north: float = Query(..., description="North latitude bound"),
    south: float = Query(..., description="South latitude bound"),
    east: float = Query(..., description="East longitude bound"),
    west: float = Query(..., description="West longitude bound"),
    type: Optional[str] = Query(None, description="Location type filter"),
    limit: int = Query(100, ge=1, le=500, description="Maximum results"),
):
    """Get locations within specified geographic bounds."""
    locations = await location_repo.get_within_bounds(
        north=north,
        south=south,
        east=east,
        west=west,
        type=type,
        limit=limit,
    )

    return {
        "bounds": {"north": north, "south": south, "east": east, "west": west},
        "locations": [_build_location_response(loc) for loc in locations],
        "count": len(locations),
    }


@router.get("/{location_id}", response_model=LocationDetailResponse)
async def get_location(
    location_id: int,
    location_repo: LocationRepoDep,
    event_repo: EventRepoDep,
):
    """Get detailed information about a specific location."""
    location = await location_repo.get_by_id(location_id)
    if not location:
        raise HTTPException(status_code=404, detail=f"Location {location_id} not found")

    # Get events at this location
    events = await event_repo.get_by_location(location_id)
    events_data = [
        {
            "id": e.id,
            "name": e.name,
            "type": e.type.value,
            "date_start": e.date_start.isoformat(),
            "result": e.result,
        }
        for e in events
    ]

    coords = None
    if location.coordinates:
        coords = Coordinates(lat=location.coordinates.lat, lng=location.coordinates.lng)

    return LocationDetailResponse(
        id=location.id,
        name=location.name,
        type=location.type.value,
        coordinates=coords,
        state=location.state,
        description=location.description,
        geojson=location.geojson,
        events=events_data,
    )
