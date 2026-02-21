"""SQLAlchemy location repository implementation (placeholder)."""

from typing import Optional

from ..base import BaseLocationRepository
from ...models import Location


class SQLAlchemyLocationRepository(BaseLocationRepository):
    """SQLAlchemy implementation of location repository.

    This is a placeholder that will be implemented when the database layer is ready.
    """

    async def get_by_id(self, id: int) -> Optional[Location]:
        """Get a location by ID."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def get_all(self, limit: int = 50, offset: int = 0, **filters) -> list[Location]:
        """Get all locations with optional filtering."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def count(self, **filters) -> int:
        """Count locations with optional filtering."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def get_within_bounds(
        self,
        north: float,
        south: float,
        east: float,
        west: float,
        type: Optional[str] = None,
        limit: int = 100,
    ) -> list[Location]:
        """Get locations within geographic bounds."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def search_by_name(self, name: str, limit: int = 20) -> list[Location]:
        """Search for locations by name."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")
