"""Location domain model."""

from dataclasses import dataclass
from enum import Enum
from typing import Optional, Any


class LocationType(str, Enum):
    """Types of locations."""
    CITY = "city"
    BATTLEFIELD = "battlefield"
    FORT = "fort"
    RIVER = "river"
    LANDMARK = "landmark"
    CAPITAL = "capital"


@dataclass
class Coordinates:
    """Geographic coordinates."""
    lat: float
    lng: float


@dataclass
class Location:
    """A geographic location relevant to the Civil War."""
    id: int
    name: str
    type: LocationType
    coordinates: Optional[Coordinates] = None
    state: Optional[str] = None
    description: Optional[str] = None
    geojson: Optional[dict[str, Any]] = None
    external_id: Optional[str] = None
