"""Events router with endpoints for Civil War events."""

from datetime import date
from typing import Optional
from fastapi import APIRouter, HTTPException, Query

from ..dependencies import EventRepoDep, LocationRepoDep
from ..schemas import (
    EventResponse,
    EventListResponse,
    EventDetailResponse,
    TimelineEvent,
    TimelineResponse,
    CasualtyStats,
    EventCasualties,
    PaginationMeta,
    Coordinates,
)
from ..schemas.location import LocationResponse

router = APIRouter()


def _build_event_response(event, location_data: Optional[dict] = None, include_casualties: bool = True) -> EventResponse:
    """Build event response from domain model."""
    location = None
    if location_data:
        location = LocationResponse(
            id=location_data.get("id", event.location_id),
            name=location_data["name"],
            type=location_data.get("type", "battlefield"),
            coordinates=Coordinates(lat=location_data["lat"], lng=location_data["lng"]) if "lat" in location_data else None,
            state=location_data.get("state"),
        )

    casualties = None
    if include_casualties and event.casualties:
        union_stats = CasualtyStats()
        confederate_stats = CasualtyStats()
        for c in event.casualties:
            stats = CasualtyStats(
                killed=c.killed,
                wounded=c.wounded,
                captured=c.captured,
                missing=c.missing,
                total_engaged=c.total_engaged,
            )
            if c.side == "union":
                union_stats = stats
            else:
                confederate_stats = stats
        casualties = EventCasualties(union=union_stats, confederate=confederate_stats)

    return EventResponse(
        id=event.id,
        name=event.name,
        type=event.type.value,
        date_start=event.date_start,
        date_end=event.date_end,
        description=event.description,
        campaign=event.campaign,
        theater=event.theater,
        result=event.result,
        significance=event.significance,
        cwsac_id=event.cwsac_id,
        wikipedia_url=event.wikipedia_url,
        image_url=event.image_url,
        location=location,
        casualties=casualties,
    )


@router.get("", response_model=EventListResponse)
async def get_events(
    event_repo: EventRepoDep,
    location_repo: LocationRepoDep,
    type: Optional[str] = Query(None, description="Event type filter"),
    date_from: Optional[date] = Query(None, description="Start date filter"),
    date_to: Optional[date] = Query(None, description="End date filter"),
    theater: Optional[str] = Query(None, description="Theater filter"),
    campaign: Optional[str] = Query(None, description="Campaign filter"),
    min_significance: Optional[int] = Query(None, ge=1, le=5, description="Minimum significance"),
    location_id: Optional[int] = Query(None, description="Location ID filter"),
    limit: int = Query(50, ge=1, le=200, description="Maximum results"),
    offset: int = Query(0, ge=0, description="Results offset"),
    include_casualties: bool = Query(True, description="Include casualty data"),
    include_location: bool = Query(True, description="Include location data"),
):
    """Get a paginated list of events with optional filtering."""
    filters = {}
    if type:
        filters["type"] = type
    if date_from:
        filters["date_from"] = date_from
    if date_to:
        filters["date_to"] = date_to
    if theater:
        filters["theater"] = theater
    if campaign:
        filters["campaign"] = campaign
    if min_significance:
        filters["min_significance"] = min_significance
    if location_id:
        filters["location_id"] = location_id

    events = await event_repo.get_all(limit=limit, offset=offset, **filters)
    total = await event_repo.count(**filters)

    # Build responses with location data
    data = []
    for event in events:
        location_data = None
        if include_location and event.location_id:
            location = await location_repo.get_by_id(event.location_id)
            if location:
                location_data = {
                    "id": location.id,
                    "name": location.name,
                    "type": location.type.value,
                    "lat": location.coordinates.lat if location.coordinates else None,
                    "lng": location.coordinates.lng if location.coordinates else None,
                    "state": location.state,
                }
        data.append(_build_event_response(event, location_data, include_casualties))

    return EventListResponse(
        data=data,
        meta=PaginationMeta(
            total=total,
            limit=limit,
            offset=offset,
            has_more=offset + limit < total,
        ),
    )


@router.get("/timeline", response_model=TimelineResponse)
async def get_events_timeline(
    event_repo: EventRepoDep,
    location_repo: LocationRepoDep,
    date_from: Optional[date] = Query(None, description="Start date (default: 1861-01-01)"),
    date_to: Optional[date] = Query(None, description="End date (default: 1865-12-31)"),
    types: Optional[str] = Query(None, description="Comma-separated event types"),
):
    """Get events formatted for timeline display."""
    # Set default date range for Civil War
    if date_from is None:
        date_from = date(1861, 1, 1)
    if date_to is None:
        date_to = date(1865, 12, 31)

    # Parse types if provided
    type_list = types.split(",") if types else None

    events = await event_repo.get_timeline(date_from=date_from, date_to=date_to, types=type_list)

    # Build timeline events
    timeline_events = []
    for event in events:
        coords = None
        if event.location_id:
            location = await location_repo.get_by_id(event.location_id)
            if location and location.coordinates:
                coords = Coordinates(lat=location.coordinates.lat, lng=location.coordinates.lng)

        timeline_events.append(
            TimelineEvent(
                id=event.id,
                name=event.name,
                type=event.type.value,
                date=event.date_start,
                coordinates=coords,
                significance=event.significance,
                result=event.result,
            )
        )

    return TimelineResponse(
        events=timeline_events,
        date_range={"start": date_from.isoformat(), "end": date_to.isoformat()},
    )


@router.get("/{event_id}", response_model=EventDetailResponse)
async def get_event(
    event_id: int,
    event_repo: EventRepoDep,
    location_repo: LocationRepoDep,
):
    """Get detailed information about a specific event."""
    event = await event_repo.get_by_id(event_id)
    if not event:
        raise HTTPException(status_code=404, detail=f"Event {event_id} not found")

    # Get location data
    location_data = None
    if event.location_id:
        location = await location_repo.get_by_id(event.location_id)
        if location:
            location_data = {
                "id": location.id,
                "name": location.name,
                "type": location.type.value,
                "lat": location.coordinates.lat if location.coordinates else None,
                "lng": location.coordinates.lng if location.coordinates else None,
                "state": location.state,
            }

    response = _build_event_response(event, location_data, include_casualties=True)

    # Add commanders from the mock data (in real implementation, this would come from person repository)
    commanders = {"union": [], "confederate": []}

    return EventDetailResponse(
        **response.model_dump(),
        commanders=commanders if any(commanders.values()) else None,
    )
