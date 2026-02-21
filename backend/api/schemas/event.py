"""Event Pydantic schemas."""

from datetime import date
from typing import Optional
from pydantic import BaseModel, Field

from .common import PaginationMeta, Coordinates
from .location import LocationResponse


class CasualtyStats(BaseModel):
    """Casualty statistics for one side."""
    killed: Optional[int] = None
    wounded: Optional[int] = None
    captured: Optional[int] = None
    missing: Optional[int] = None
    total_engaged: Optional[int] = None


class EventCasualties(BaseModel):
    """Casualty statistics for both sides of an event."""
    union: CasualtyStats
    confederate: CasualtyStats


class EventBase(BaseModel):
    """Base event schema with common fields."""
    id: int
    name: str
    type: str = Field(..., description="Event type: battle, siege, raid, skirmish, treaty, election, proclamation, surrender")
    date_start: date
    date_end: Optional[date] = None
    description: Optional[str] = None
    campaign: Optional[str] = None
    theater: Optional[str] = None
    result: Optional[str] = None
    significance: Optional[int] = Field(None, ge=1, le=5)
    cwsac_id: Optional[str] = None
    wikipedia_url: Optional[str] = None
    image_url: Optional[str] = None


class EventResponse(EventBase):
    """Event response with optional related data."""
    location: Optional[LocationResponse] = None
    casualties: Optional[EventCasualties] = None


class EventListResponse(BaseModel):
    """Paginated list of events."""
    data: list[EventResponse]
    meta: PaginationMeta


class EventDetailResponse(EventResponse):
    """Detailed event response with all related data."""
    commanders: Optional[dict[str, list[str]]] = None  # {"union": [...], "confederate": [...]}


class TimelineEvent(BaseModel):
    """Simplified event for timeline display."""
    id: int
    name: str
    type: str
    date: date
    coordinates: Optional[Coordinates] = None
    significance: Optional[int] = None
    result: Optional[str] = None


class TimelineResponse(BaseModel):
    """Response for timeline endpoint."""
    events: list[TimelineEvent]
    date_range: dict[str, str]  # {"start": "...", "end": "..."}


class EventQueryParams(BaseModel):
    """Query parameters for event list endpoint."""
    type: Optional[str] = None
    date_from: Optional[date] = None
    date_to: Optional[date] = None
    side: Optional[str] = None
    theater: Optional[str] = None
    campaign: Optional[str] = None
    min_significance: Optional[int] = Field(None, ge=1, le=5)
    location_id: Optional[int] = None
    limit: int = Field(default=50, ge=1, le=200)
    offset: int = Field(default=0, ge=0)
    include_casualties: bool = True
    include_location: bool = True


class TimelineQueryParams(BaseModel):
    """Query parameters for timeline endpoint."""
    date_from: Optional[date] = Field(default=None, description="Start date (default: 1861-01-01)")
    date_to: Optional[date] = Field(default=None, description="End date (default: 1865-12-31)")
    types: Optional[list[str]] = None
    granularity: str = Field(default="day", description="day, week, or month")
