"""Event domain model."""

from dataclasses import dataclass, field
from datetime import date
from enum import Enum
from typing import Optional


class EventType(str, Enum):
    """Types of historical events."""
    BATTLE = "battle"
    SIEGE = "siege"
    RAID = "raid"
    SKIRMISH = "skirmish"
    TREATY = "treaty"
    ELECTION = "election"
    PROCLAMATION = "proclamation"
    SURRENDER = "surrender"


class PersonRole(str, Enum):
    """Roles a person can have in an event."""
    COMMANDER = "commander"
    SUBORDINATE = "subordinate"
    PARTICIPANT = "participant"
    CASUALTY = "casualty"
    SIGNATORY = "signatory"


@dataclass
class EventCasualty:
    """Casualty statistics for one side of an event."""
    event_id: int
    side: str  # 'union' or 'confederate'
    killed: Optional[int] = None
    wounded: Optional[int] = None
    captured: Optional[int] = None
    missing: Optional[int] = None
    total_engaged: Optional[int] = None


@dataclass
class PersonEventRole:
    """Association between a person and an event with their role."""
    person_id: int
    event_id: int
    role: PersonRole
    unit_commanded: Optional[str] = None
    notes: Optional[str] = None


@dataclass
class Event:
    """A historical event during the Civil War."""
    id: int
    name: str
    type: EventType
    date_start: date
    date_end: Optional[date] = None
    description: Optional[str] = None
    location_id: Optional[int] = None
    campaign: Optional[str] = None
    theater: Optional[str] = None
    result: Optional[str] = None
    significance: Optional[int] = None
    cwsac_id: Optional[str] = None
    wikipedia_url: Optional[str] = None
    image_url: Optional[str] = None
    external_id: Optional[str] = None
    casualties: list[EventCasualty] = field(default_factory=list)
    participants: list[PersonEventRole] = field(default_factory=list)
