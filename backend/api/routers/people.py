"""People router with endpoints for Civil War historical figures."""

from typing import Optional
from fastapi import APIRouter, HTTPException, Query

from ..dependencies import PersonRepoDep, EventRepoDep
from ..schemas import (
    PersonResponse,
    PersonListResponse,
    PersonDetailResponse,
    PersonEvent,
    PaginationMeta,
)

router = APIRouter()


def _build_person_response(person) -> PersonResponse:
    """Build person response from domain model."""
    return PersonResponse(
        id=person.id,
        name=person.name,
        birth_date=person.birth_date,
        death_date=person.death_date,
        side=person.side.value if person.side else None,
        rank=person.rank,
        highest_rank=person.highest_rank,
        biography=person.biography,
        image_url=person.image_url,
        wikipedia_url=person.wikipedia_url,
    )


@router.get("", response_model=PersonListResponse)
async def get_people(
    person_repo: PersonRepoDep,
    name: Optional[str] = Query(None, description="Name search filter"),
    side: Optional[str] = Query(None, description="Side filter (union, confederate)"),
    rank: Optional[str] = Query(None, description="Rank filter"),
    limit: int = Query(50, ge=1, le=200, description="Maximum results"),
    offset: int = Query(0, ge=0, description="Results offset"),
):
    """Get a paginated list of people with optional filtering."""
    filters = {}
    if name:
        filters["name"] = name
    if side:
        filters["side"] = side
    if rank:
        filters["rank"] = rank

    people = await person_repo.get_all(limit=limit, offset=offset, **filters)
    total = await person_repo.count(**filters)

    return PersonListResponse(
        data=[_build_person_response(p) for p in people],
        meta=PaginationMeta(
            total=total,
            limit=limit,
            offset=offset,
            has_more=offset + limit < total,
        ),
    )


@router.get("/{person_id}", response_model=PersonDetailResponse)
async def get_person(
    person_id: int,
    person_repo: PersonRepoDep,
    event_repo: EventRepoDep,
):
    """Get detailed information about a specific person."""
    person = await person_repo.get_by_id(person_id)
    if not person:
        raise HTTPException(status_code=404, detail=f"Person {person_id} not found")

    # Get events this person participated in
    events_data = await person_repo.get_events_for_person(person_id)
    person_events = []
    units_commanded = set()

    for event_data in events_data:
        event = await event_repo.get_by_id(event_data["event_id"])
        if event:
            person_events.append(
                PersonEvent(
                    event_id=event.id,
                    event_name=event.name,
                    date=event.date_start,
                    role=event_data["role"],
                    unit_commanded=event_data.get("unit_commanded"),
                )
            )
            if event_data.get("unit_commanded"):
                units_commanded.add(event_data["unit_commanded"])

    return PersonDetailResponse(
        id=person.id,
        name=person.name,
        birth_date=person.birth_date,
        death_date=person.death_date,
        side=person.side.value if person.side else None,
        rank=person.rank,
        highest_rank=person.highest_rank,
        biography=person.biography,
        image_url=person.image_url,
        wikipedia_url=person.wikipedia_url,
        events=person_events,
        units_commanded=list(units_commanded),
    )


@router.get("/{person_id}/events")
async def get_person_events(
    person_id: int,
    person_repo: PersonRepoDep,
    event_repo: EventRepoDep,
):
    """Get all events a person participated in."""
    person = await person_repo.get_by_id(person_id)
    if not person:
        raise HTTPException(status_code=404, detail=f"Person {person_id} not found")

    events_data = await person_repo.get_events_for_person(person_id)
    person_events = []

    for event_data in events_data:
        event = await event_repo.get_by_id(event_data["event_id"])
        if event:
            person_events.append(
                PersonEvent(
                    event_id=event.id,
                    event_name=event.name,
                    date=event.date_start,
                    role=event_data["role"],
                    unit_commanded=event_data.get("unit_commanded"),
                )
            )

    return {"person_id": person_id, "events": person_events}
