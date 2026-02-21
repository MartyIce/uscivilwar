"""Boundary Pydantic schemas."""

from datetime import date as date_type
from typing import Optional, Any
from pydantic import BaseModel, Field


class BoundaryBase(BaseModel):
    """Base boundary schema with common fields."""
    id: int
    name: str
    boundary_type: str = Field(..., alias="type", description="Boundary type: state, territory, county")
    side: Optional[str] = None

    class Config:
        populate_by_name = True


class BoundaryResponse(BoundaryBase):
    """Boundary response schema."""
    geojson: Optional[dict[str, Any]] = None


class BoundaryListResponse(BaseModel):
    """List of boundaries for a specific date."""
    query_date: str = Field(..., alias="date")
    boundaries: list[BoundaryResponse]

    class Config:
        populate_by_name = True


class BoundaryQueryParams(BaseModel):
    """Query parameters for boundary endpoint."""
    query_date: date_type = Field(..., alias="date", description="Date for which to retrieve boundaries")
    boundary_type: Optional[str] = Field(None, alias="type", description="Filter by boundary type: state, territory, county")
    include_geojson: bool = Field(default=True, description="Include GeoJSON data in response")

    class Config:
        populate_by_name = True


class BoundaryTimelineResponse(BaseModel):
    """Response for boundary timeline endpoint."""
    change_dates: list[date_type]
    date_range: dict[str, str]  # {"start": "...", "end": "..."}
