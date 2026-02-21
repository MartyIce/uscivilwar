"""Pydantic schemas for Civil War API."""

from .common import PaginationMeta, PaginatedResponse, Coordinates
from .event import (
    EventBase,
    EventResponse,
    EventListResponse,
    EventDetailResponse,
    CasualtyStats,
    EventCasualties,
    TimelineEvent,
    TimelineResponse,
    EventQueryParams,
    TimelineQueryParams,
)
from .person import (
    PersonBase,
    PersonResponse,
    PersonListResponse,
    PersonDetailResponse,
    PersonEvent,
    PersonQueryParams,
)
from .location import (
    LocationBase,
    LocationResponse,
    LocationListResponse,
    LocationDetailResponse,
    LocationQueryParams,
    BoundsQueryParams,
)
from .military_unit import (
    MilitaryUnitBase,
    MilitaryUnitResponse,
    MilitaryUnitListResponse,
    MilitaryUnitDetailResponse,
    MilitaryUnitQueryParams,
)
from .boundary import (
    BoundaryBase,
    BoundaryResponse,
    BoundaryListResponse,
    BoundaryQueryParams,
)

__all__ = [
    # Common
    "PaginationMeta",
    "PaginatedResponse",
    "Coordinates",
    # Event
    "EventBase",
    "EventResponse",
    "EventListResponse",
    "EventDetailResponse",
    "CasualtyStats",
    "EventCasualties",
    "TimelineEvent",
    "TimelineResponse",
    "EventQueryParams",
    "TimelineQueryParams",
    # Person
    "PersonBase",
    "PersonResponse",
    "PersonListResponse",
    "PersonDetailResponse",
    "PersonEvent",
    "PersonQueryParams",
    # Location
    "LocationBase",
    "LocationResponse",
    "LocationListResponse",
    "LocationDetailResponse",
    "LocationQueryParams",
    "BoundsQueryParams",
    # Military Unit
    "MilitaryUnitBase",
    "MilitaryUnitResponse",
    "MilitaryUnitListResponse",
    "MilitaryUnitDetailResponse",
    "MilitaryUnitQueryParams",
    # Boundary
    "BoundaryBase",
    "BoundaryResponse",
    "BoundaryListResponse",
    "BoundaryQueryParams",
]
