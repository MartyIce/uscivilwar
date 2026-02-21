"""Military units router with endpoints for Civil War units."""

from typing import Optional
from fastapi import APIRouter, HTTPException, Query

from ..dependencies import MilitaryUnitRepoDep, EventRepoDep
from ..schemas import (
    MilitaryUnitResponse,
    MilitaryUnitListResponse,
    MilitaryUnitDetailResponse,
    PaginationMeta,
)

router = APIRouter()


def _build_unit_response(unit) -> MilitaryUnitResponse:
    """Build military unit response from domain model."""
    return MilitaryUnitResponse(
        id=unit.id,
        name=unit.name,
        type=unit.type.value,
        side=unit.side.value,
        parent_id=unit.parent_id,
        formed_date=unit.formed_date,
        disbanded_date=unit.disbanded_date,
        description=unit.description,
        peak_strength=unit.peak_strength,
    )


@router.get("", response_model=MilitaryUnitListResponse)
async def get_units(
    unit_repo: MilitaryUnitRepoDep,
    type: Optional[str] = Query(None, description="Unit type filter"),
    side: Optional[str] = Query(None, description="Side filter (union, confederate)"),
    name: Optional[str] = Query(None, description="Name search filter"),
    parent_id: Optional[int] = Query(None, description="Parent unit ID filter"),
    limit: int = Query(50, ge=1, le=200, description="Maximum results"),
    offset: int = Query(0, ge=0, description="Results offset"),
):
    """Get a paginated list of military units with optional filtering."""
    filters = {}
    if type:
        filters["type"] = type
    if side:
        filters["side"] = side
    if name:
        filters["name"] = name
    if parent_id:
        filters["parent_id"] = parent_id

    units = await unit_repo.get_all(limit=limit, offset=offset, **filters)
    total = await unit_repo.count(**filters)

    return MilitaryUnitListResponse(
        data=[_build_unit_response(u) for u in units],
        meta=PaginationMeta(
            total=total,
            limit=limit,
            offset=offset,
            has_more=offset + limit < total,
        ),
    )


@router.get("/{unit_id}", response_model=MilitaryUnitDetailResponse)
async def get_unit(
    unit_id: int,
    unit_repo: MilitaryUnitRepoDep,
    event_repo: EventRepoDep,
):
    """Get detailed information about a specific military unit."""
    unit = await unit_repo.get_by_id(unit_id)
    if not unit:
        raise HTTPException(status_code=404, detail=f"Unit {unit_id} not found")

    # Get subunits
    subunits = await unit_repo.get_subunits(unit_id)

    # Get event participation
    events_data = await unit_repo.get_unit_event_participation(unit_id)
    events = []
    for ep in events_data:
        event = await event_repo.get_by_id(ep["event_id"])
        if event:
            events.append({
                "event_id": event.id,
                "event_name": event.name,
                "date": event.date_start.isoformat(),
                "strength": ep.get("strength"),
                "casualties": ep.get("casualties"),
                "role": ep.get("role"),
            })

    return MilitaryUnitDetailResponse(
        id=unit.id,
        name=unit.name,
        type=unit.type.value,
        side=unit.side.value,
        parent_id=unit.parent_id,
        formed_date=unit.formed_date,
        disbanded_date=unit.disbanded_date,
        description=unit.description,
        peak_strength=unit.peak_strength,
        subunits=[_build_unit_response(s) for s in subunits],
        events=events,
    )


@router.get("/{unit_id}/subunits")
async def get_unit_subunits(
    unit_id: int,
    unit_repo: MilitaryUnitRepoDep,
):
    """Get all subunits of a military unit."""
    unit = await unit_repo.get_by_id(unit_id)
    if not unit:
        raise HTTPException(status_code=404, detail=f"Unit {unit_id} not found")

    subunits = await unit_repo.get_subunits(unit_id)

    return {
        "parent_id": unit_id,
        "parent_name": unit.name,
        "subunits": [_build_unit_response(s) for s in subunits],
    }


@router.get("/{unit_id}/events")
async def get_unit_events(
    unit_id: int,
    unit_repo: MilitaryUnitRepoDep,
    event_repo: EventRepoDep,
):
    """Get all events a military unit participated in."""
    unit = await unit_repo.get_by_id(unit_id)
    if not unit:
        raise HTTPException(status_code=404, detail=f"Unit {unit_id} not found")

    events_data = await unit_repo.get_unit_event_participation(unit_id)
    events = []
    for ep in events_data:
        event = await event_repo.get_by_id(ep["event_id"])
        if event:
            events.append({
                "event_id": event.id,
                "event_name": event.name,
                "date": event.date_start.isoformat(),
                "strength": ep.get("strength"),
                "casualties": ep.get("casualties"),
                "role": ep.get("role"),
            })

    return {
        "unit_id": unit_id,
        "unit_name": unit.name,
        "events": events,
    }
