"""Military unit domain model."""

from dataclasses import dataclass
from datetime import date
from enum import Enum
from typing import Optional

from .person import Side


class UnitType(str, Enum):
    """Types of military units."""
    ARMY = "army"
    CORPS = "corps"
    DIVISION = "division"
    BRIGADE = "brigade"
    REGIMENT = "regiment"
    BATTALION = "battalion"
    COMPANY = "company"
    NAVY_FLEET = "navy_fleet"
    NAVY_SHIP = "navy_ship"


@dataclass
class UnitEventParticipation:
    """Association between a unit and an event with participation details."""
    unit_id: int
    event_id: int
    strength: Optional[int] = None
    casualties: Optional[int] = None
    role: Optional[str] = None  # 'attacking', 'defending', 'reserve', etc.


@dataclass
class MilitaryUnit:
    """A military unit during the Civil War."""
    id: int
    name: str
    type: UnitType
    side: Side
    parent_id: Optional[int] = None
    formed_date: Optional[date] = None
    disbanded_date: Optional[date] = None
    description: Optional[str] = None
    peak_strength: Optional[int] = None
    external_id: Optional[str] = None
