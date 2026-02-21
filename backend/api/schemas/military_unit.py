"""Military unit Pydantic schemas."""

from datetime import date
from typing import Optional
from pydantic import BaseModel, Field

from .common import PaginationMeta


class MilitaryUnitBase(BaseModel):
    """Base military unit schema with common fields."""
    id: int
    name: str
    type: str = Field(..., description="Unit type: army, corps, division, brigade, regiment, battalion, company, navy_fleet, navy_ship")
    side: str
    parent_id: Optional[int] = None
    formed_date: Optional[date] = None
    disbanded_date: Optional[date] = None
    description: Optional[str] = None
    peak_strength: Optional[int] = None


class MilitaryUnitResponse(MilitaryUnitBase):
    """Military unit response schema."""
    pass


class MilitaryUnitListResponse(BaseModel):
    """Paginated list of military units."""
    data: list[MilitaryUnitResponse]
    meta: PaginationMeta


class MilitaryUnitDetailResponse(MilitaryUnitResponse):
    """Detailed military unit response with subunits and events."""
    subunits: list["MilitaryUnitResponse"] = []
    events: list[dict] = []  # Events this unit participated in


class MilitaryUnitQueryParams(BaseModel):
    """Query parameters for military unit list endpoint."""
    type: Optional[str] = None
    side: Optional[str] = None
    name: Optional[str] = None
    parent_id: Optional[int] = None
    limit: int = Field(default=50, ge=1, le=200)
    offset: int = Field(default=0, ge=0)
