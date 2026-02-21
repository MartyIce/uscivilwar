"""SQLAlchemy boundary repository implementation (placeholder)."""

from datetime import date
from typing import Optional

from ..base import BaseBoundaryRepository
from ...models import TerritoryBoundary


class SQLAlchemyBoundaryRepository(BaseBoundaryRepository):
    """SQLAlchemy implementation of boundary repository.

    This is a placeholder that will be implemented when the database layer is ready.
    """

    async def get_by_id(self, id: int) -> Optional[TerritoryBoundary]:
        """Get a boundary by ID."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def get_all(self, limit: int = 50, offset: int = 0, **filters) -> list[TerritoryBoundary]:
        """Get all boundaries with optional filtering."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def count(self, **filters) -> int:
        """Count boundaries with optional filtering."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def get_for_date(
        self,
        target_date: date,
        type: Optional[str] = None,
        include_geojson: bool = True,
    ) -> list[TerritoryBoundary]:
        """Get boundaries valid for a specific date."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def get_change_dates(self) -> list[date]:
        """Get dates when boundaries changed."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")
