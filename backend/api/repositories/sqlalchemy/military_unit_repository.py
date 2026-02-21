"""SQLAlchemy military unit repository implementation (placeholder)."""

from typing import Optional

from ..base import BaseMilitaryUnitRepository
from ...models import MilitaryUnit


class SQLAlchemyMilitaryUnitRepository(BaseMilitaryUnitRepository):
    """SQLAlchemy implementation of military unit repository.

    This is a placeholder that will be implemented when the database layer is ready.
    """

    async def get_by_id(self, id: int) -> Optional[MilitaryUnit]:
        """Get a unit by ID."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def get_all(self, limit: int = 50, offset: int = 0, **filters) -> list[MilitaryUnit]:
        """Get all units with optional filtering."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def count(self, **filters) -> int:
        """Count units with optional filtering."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def get_subunits(self, parent_id: int) -> list[MilitaryUnit]:
        """Get subunits of a unit."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def get_by_event(self, event_id: int) -> list[MilitaryUnit]:
        """Get units that participated in an event."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")
