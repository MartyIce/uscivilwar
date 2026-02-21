"""Location Pydantic schemas."""

from typing import Optional, Any
from pydantic import BaseModel, Field

from .common import PaginationMeta, Coordinates


class LocationBase(BaseModel):
    """Base location schema with common fields."""
    id: int
    name: str
    type: str = Field(..., description="Location type: city, battlefield, fort, river, landmark, capital")
    coordinates: Optional[Coordinates] = None
    state: Optional[str] = None


class LocationResponse(LocationBase):
    """Location response schema."""
    description: Optional[str] = None


class LocationListResponse(BaseModel):
    """Paginated list of locations."""
    data: list[LocationResponse]
    meta: PaginationMeta


class LocationDetailResponse(LocationResponse):
    """Detailed location response with full data."""
    geojson: Optional[dict[str, Any]] = None
    events: Optional[list[dict[str, Any]]] = None  # Events at this location


class LocationQueryParams(BaseModel):
    """Query parameters for location list endpoint."""
    type: Optional[str] = None
    state: Optional[str] = None
    name: Optional[str] = None
    limit: int = Field(default=50, ge=1, le=200)
    offset: int = Field(default=0, ge=0)


class BoundsQueryParams(BaseModel):
    """Query parameters for locations within bounds."""
    north: float = Field(..., description="North latitude bound")
    south: float = Field(..., description="South latitude bound")
    east: float = Field(..., description="East longitude bound")
    west: float = Field(..., description="West longitude bound")
    type: Optional[str] = None
    limit: int = Field(default=100, ge=1, le=500)
