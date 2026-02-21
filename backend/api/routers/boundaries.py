"""Boundaries router with endpoints for Civil War territory boundaries."""

from datetime import date
from typing import Optional
from fastapi import APIRouter, Query

from ..dependencies import BoundaryRepoDep
from ..schemas import BoundaryResponse, BoundaryListResponse

router = APIRouter()


def _build_boundary_response(boundary, include_geojson: bool = True) -> BoundaryResponse:
    """Build boundary response from domain model."""
    return BoundaryResponse(
        id=boundary.id,
        name=boundary.name,
        type=boundary.type.value,
        side=boundary.side.value if boundary.side else None,
        geojson=boundary.geojson if include_geojson else None,
    )


@router.get("", response_model=BoundaryListResponse)
async def get_boundaries(
    boundary_repo: BoundaryRepoDep,
    date_param: date = Query(..., alias="date", description="Date for which to retrieve boundaries"),
    type: Optional[str] = Query(None, description="Boundary type filter (state, territory, county)"),
    include_geojson: bool = Query(True, description="Include GeoJSON data"),
):
    """Get territory boundaries valid for a specific date."""
    boundaries = await boundary_repo.get_for_date(
        target_date=date_param,
        type=type,
        include_geojson=include_geojson,
    )

    return BoundaryListResponse(
        date=date_param.isoformat(),
        boundaries=[_build_boundary_response(b, include_geojson) for b in boundaries],
    )


@router.get("/timeline")
async def get_boundary_timeline(
    boundary_repo: BoundaryRepoDep,
):
    """Get dates when territory boundaries changed during the Civil War."""
    change_dates = await boundary_repo.get_change_dates()

    return {
        "change_dates": [d.isoformat() for d in change_dates],
        "date_range": {
            "start": "1861-01-01",
            "end": "1865-12-31",
        },
    }
