"""SQLAlchemy person repository implementation (placeholder)."""

from typing import Optional

from ..base import BasePersonRepository
from ...models import Person


class SQLAlchemyPersonRepository(BasePersonRepository):
    """SQLAlchemy implementation of person repository.

    This is a placeholder that will be implemented when the database layer is ready.
    """

    async def get_by_id(self, id: int) -> Optional[Person]:
        """Get a person by ID."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def get_all(self, limit: int = 50, offset: int = 0, **filters) -> list[Person]:
        """Get all people with optional filtering."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def count(self, **filters) -> int:
        """Count people with optional filtering."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def get_by_event(self, event_id: int) -> list[tuple[Person, str, Optional[str]]]:
        """Get people who participated in an event with their roles."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")

    async def search_by_name(self, name: str, limit: int = 20) -> list[Person]:
        """Search for people by name."""
        raise NotImplementedError("SQLAlchemy repository not yet implemented")
