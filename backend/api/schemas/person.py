"""Person Pydantic schemas."""

from datetime import date
from typing import Optional
from pydantic import BaseModel, Field

from .common import PaginationMeta


class PersonBase(BaseModel):
    """Base person schema with common fields."""
    id: int
    name: str
    birth_date: Optional[date] = None
    death_date: Optional[date] = None
    side: Optional[str] = None
    rank: Optional[str] = None
    highest_rank: Optional[str] = None
    biography: Optional[str] = None
    image_url: Optional[str] = None
    wikipedia_url: Optional[str] = None


class PersonResponse(PersonBase):
    """Person response schema."""
    pass


class PersonListResponse(BaseModel):
    """Paginated list of people."""
    data: list[PersonResponse]
    meta: PaginationMeta


class PersonEvent(BaseModel):
    """Event participation record for a person."""
    event_id: int
    event_name: str
    date: date
    role: str
    unit_commanded: Optional[str] = None


class PersonDetailResponse(PersonBase):
    """Detailed person response with events and units."""
    events: list[PersonEvent] = []
    units_commanded: list[str] = []


class PersonQueryParams(BaseModel):
    """Query parameters for person list endpoint."""
    name: Optional[str] = None
    side: Optional[str] = None
    rank: Optional[str] = None
    limit: int = Field(default=50, ge=1, le=200)
    offset: int = Field(default=0, ge=0)
