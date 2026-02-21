"""Territory boundary domain model."""

from dataclasses import dataclass
from datetime import date
from enum import Enum
from typing import Optional, Any

from .person import Side


class BoundaryType(str, Enum):
    """Types of territory boundaries."""
    STATE = "state"
    TERRITORY = "territory"
    COUNTY = "county"


@dataclass
class TerritoryBoundary:
    """A territorial boundary during the Civil War era."""
    id: int
    name: str
    type: BoundaryType
    valid_from: date
    valid_to: Optional[date] = None
    side: Optional[Side] = None
    geojson: Optional[dict[str, Any]] = None
    source: Optional[str] = None
