"""Mock boundary repository with hardcoded Civil War territory data."""

from datetime import date
from typing import Optional

from ..base import BaseBoundaryRepository
from ...models import TerritoryBoundary, BoundaryType, Side


# Mock territory boundaries
# Using simplified GeoJSON polygons (actual boundaries would be much more detailed)
MOCK_BOUNDARIES: list[TerritoryBoundary] = [
    # Union States
    TerritoryBoundary(
        id=1,
        name="New York",
        type=BoundaryType.STATE,
        valid_from=date(1788, 7, 26),
        side=Side.UNION,
        geojson={
            "type": "Feature",
            "properties": {"name": "New York", "side": "union"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-79.76, 42.0], [-73.0, 42.0], [-73.0, 45.0], [-79.76, 45.0], [-79.76, 42.0]]],
            },
        },
    ),
    TerritoryBoundary(
        id=2,
        name="Pennsylvania",
        type=BoundaryType.STATE,
        valid_from=date(1787, 12, 12),
        side=Side.UNION,
        geojson={
            "type": "Feature",
            "properties": {"name": "Pennsylvania", "side": "union"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-80.5, 39.7], [-75.0, 39.7], [-75.0, 42.0], [-80.5, 42.0], [-80.5, 39.7]]],
            },
        },
    ),
    TerritoryBoundary(
        id=3,
        name="Ohio",
        type=BoundaryType.STATE,
        valid_from=date(1803, 3, 1),
        side=Side.UNION,
        geojson={
            "type": "Feature",
            "properties": {"name": "Ohio", "side": "union"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-84.8, 38.4], [-80.5, 38.4], [-80.5, 42.0], [-84.8, 42.0], [-84.8, 38.4]]],
            },
        },
    ),
    TerritoryBoundary(
        id=4,
        name="Massachusetts",
        type=BoundaryType.STATE,
        valid_from=date(1788, 2, 6),
        side=Side.UNION,
        geojson={
            "type": "Feature",
            "properties": {"name": "Massachusetts", "side": "union"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-73.5, 41.2], [-69.9, 41.2], [-69.9, 42.9], [-73.5, 42.9], [-73.5, 41.2]]],
            },
        },
    ),
    # Confederate States
    TerritoryBoundary(
        id=5,
        name="Virginia",
        type=BoundaryType.STATE,
        valid_from=date(1788, 6, 25),
        side=Side.CONFEDERATE,
        geojson={
            "type": "Feature",
            "properties": {"name": "Virginia", "side": "confederate"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-83.7, 36.5], [-75.2, 36.5], [-75.2, 39.5], [-83.7, 39.5], [-83.7, 36.5]]],
            },
        },
    ),
    TerritoryBoundary(
        id=6,
        name="South Carolina",
        type=BoundaryType.STATE,
        valid_from=date(1788, 5, 23),
        side=Side.CONFEDERATE,
        geojson={
            "type": "Feature",
            "properties": {"name": "South Carolina", "side": "confederate"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-83.4, 32.0], [-78.5, 32.0], [-78.5, 35.2], [-83.4, 35.2], [-83.4, 32.0]]],
            },
        },
    ),
    TerritoryBoundary(
        id=7,
        name="Georgia",
        type=BoundaryType.STATE,
        valid_from=date(1788, 1, 2),
        side=Side.CONFEDERATE,
        geojson={
            "type": "Feature",
            "properties": {"name": "Georgia", "side": "confederate"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-85.6, 30.4], [-80.8, 30.4], [-80.8, 35.0], [-85.6, 35.0], [-85.6, 30.4]]],
            },
        },
    ),
    TerritoryBoundary(
        id=8,
        name="Texas",
        type=BoundaryType.STATE,
        valid_from=date(1845, 12, 29),
        side=Side.CONFEDERATE,
        geojson={
            "type": "Feature",
            "properties": {"name": "Texas", "side": "confederate"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-106.6, 25.8], [-93.5, 25.8], [-93.5, 36.5], [-106.6, 36.5], [-106.6, 25.8]]],
            },
        },
    ),
    TerritoryBoundary(
        id=9,
        name="Mississippi",
        type=BoundaryType.STATE,
        valid_from=date(1817, 12, 10),
        side=Side.CONFEDERATE,
        geojson={
            "type": "Feature",
            "properties": {"name": "Mississippi", "side": "confederate"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-91.7, 30.2], [-88.1, 30.2], [-88.1, 35.0], [-91.7, 35.0], [-91.7, 30.2]]],
            },
        },
    ),
    # Border States
    TerritoryBoundary(
        id=10,
        name="Maryland",
        type=BoundaryType.STATE,
        valid_from=date(1788, 4, 28),
        side=Side.BORDER,
        geojson={
            "type": "Feature",
            "properties": {"name": "Maryland", "side": "border"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-79.5, 37.9], [-75.0, 37.9], [-75.0, 39.7], [-79.5, 39.7], [-79.5, 37.9]]],
            },
        },
    ),
    TerritoryBoundary(
        id=11,
        name="Kentucky",
        type=BoundaryType.STATE,
        valid_from=date(1792, 6, 1),
        side=Side.BORDER,
        geojson={
            "type": "Feature",
            "properties": {"name": "Kentucky", "side": "border"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-89.6, 36.5], [-82.0, 36.5], [-82.0, 39.1], [-89.6, 39.1], [-89.6, 36.5]]],
            },
        },
    ),
    TerritoryBoundary(
        id=12,
        name="Missouri",
        type=BoundaryType.STATE,
        valid_from=date(1821, 8, 10),
        side=Side.BORDER,
        geojson={
            "type": "Feature",
            "properties": {"name": "Missouri", "side": "border"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-95.8, 36.0], [-89.1, 36.0], [-89.1, 40.6], [-95.8, 40.6], [-95.8, 36.0]]],
            },
        },
    ),
    # West Virginia (created during the war)
    TerritoryBoundary(
        id=13,
        name="West Virginia",
        type=BoundaryType.STATE,
        valid_from=date(1863, 6, 20),
        side=Side.UNION,
        geojson={
            "type": "Feature",
            "properties": {"name": "West Virginia", "side": "union"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-82.6, 37.2], [-77.7, 37.2], [-77.7, 40.6], [-82.6, 40.6], [-82.6, 37.2]]],
            },
        },
    ),
]

# Dates when significant boundary changes occurred
BOUNDARY_CHANGE_DATES = [
    date(1861, 4, 12),  # Start of Civil War
    date(1861, 4, 17),  # Virginia secession
    date(1861, 5, 6),   # Arkansas secession
    date(1861, 5, 20),  # North Carolina secession
    date(1861, 6, 8),   # Tennessee secession
    date(1863, 6, 20),  # West Virginia admitted
    date(1865, 4, 9),   # Lee's surrender
]


class MockBoundaryRepository(BaseBoundaryRepository):
    """Mock repository with hardcoded Civil War boundary data."""

    async def get_by_id(self, id: int) -> Optional[TerritoryBoundary]:
        """Get a boundary by ID."""
        return next((b for b in MOCK_BOUNDARIES if b.id == id), None)

    async def get_all(self, limit: int = 50, offset: int = 0, **filters) -> list[TerritoryBoundary]:
        """Get all boundaries with optional filtering."""
        filtered = MOCK_BOUNDARIES.copy()

        # Apply filters
        if filters.get("type"):
            filtered = [b for b in filtered if b.type.value == filters["type"]]
        if filters.get("side"):
            filtered = [b for b in filtered if b.side and b.side.value == filters["side"]]

        # Sort by name
        filtered.sort(key=lambda b: b.name)

        return filtered[offset : offset + limit]

    async def count(self, **filters) -> int:
        """Count boundaries with optional filtering."""
        return len(await self.get_all(limit=10000, **filters))

    async def get_for_date(
        self,
        target_date: date,
        type: Optional[str] = None,
        include_geojson: bool = True,
    ) -> list[TerritoryBoundary]:
        """Get boundaries valid for a specific date."""
        result = []
        for boundary in MOCK_BOUNDARIES:
            # Check if boundary is valid for the target date
            if boundary.valid_from <= target_date:
                if boundary.valid_to is None or boundary.valid_to >= target_date:
                    # Apply type filter
                    if type is None or boundary.type.value == type:
                        if include_geojson:
                            result.append(boundary)
                        else:
                            # Create a copy without geojson
                            result.append(
                                TerritoryBoundary(
                                    id=boundary.id,
                                    name=boundary.name,
                                    type=boundary.type,
                                    valid_from=boundary.valid_from,
                                    valid_to=boundary.valid_to,
                                    side=boundary.side,
                                    geojson=None,
                                    source=boundary.source,
                                )
                            )

        return result

    async def get_change_dates(self) -> list[date]:
        """Get dates when boundaries changed."""
        return sorted(BOUNDARY_CHANGE_DATES)
