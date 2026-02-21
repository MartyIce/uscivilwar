"""Abstract base repository classes."""

from abc import ABC, abstractmethod
from datetime import date
from typing import Generic, TypeVar, Optional, Any

from ..models import Event, Person, Location, MilitaryUnit, TerritoryBoundary

T = TypeVar("T")


class BaseRepository(ABC, Generic[T]):
    """Abstract base repository with common CRUD operations."""

    @abstractmethod
    async def get_by_id(self, id: int) -> Optional[T]:
        """Get a single entity by ID."""
        pass

    @abstractmethod
    async def get_all(self, limit: int = 50, offset: int = 0, **filters) -> list[T]:
        """Get all entities with optional filtering and pagination."""
        pass

    @abstractmethod
    async def count(self, **filters) -> int:
        """Count entities with optional filtering."""
        pass


class BaseEventRepository(BaseRepository[Event], ABC):
    """Abstract repository for Event entities."""

    @abstractmethod
    async def get_timeline(
        self,
        date_from: Optional[date] = None,
        date_to: Optional[date] = None,
        types: Optional[list[str]] = None,
    ) -> list[Event]:
        """Get events for timeline display."""
        pass

    @abstractmethod
    async def get_by_location(self, location_id: int) -> list[Event]:
        """Get events at a specific location."""
        pass

    @abstractmethod
    async def get_casualties_aggregate(self) -> dict[str, Any]:
        """Get aggregate casualty statistics."""
        pass


class BasePersonRepository(BaseRepository[Person], ABC):
    """Abstract repository for Person entities."""

    @abstractmethod
    async def get_by_event(self, event_id: int) -> list[tuple[Person, str, Optional[str]]]:
        """Get people who participated in an event with their roles."""
        pass

    @abstractmethod
    async def search_by_name(self, name: str, limit: int = 20) -> list[Person]:
        """Search for people by name."""
        pass


class BaseLocationRepository(BaseRepository[Location], ABC):
    """Abstract repository for Location entities."""

    @abstractmethod
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
        pass

    @abstractmethod
    async def search_by_name(self, name: str, limit: int = 20) -> list[Location]:
        """Search for locations by name."""
        pass


class BaseMilitaryUnitRepository(BaseRepository[MilitaryUnit], ABC):
    """Abstract repository for MilitaryUnit entities."""

    @abstractmethod
    async def get_subunits(self, parent_id: int) -> list[MilitaryUnit]:
        """Get subunits of a unit."""
        pass

    @abstractmethod
    async def get_by_event(self, event_id: int) -> list[MilitaryUnit]:
        """Get units that participated in an event."""
        pass


class BaseBoundaryRepository(BaseRepository[TerritoryBoundary], ABC):
    """Abstract repository for TerritoryBoundary entities."""

    @abstractmethod
    async def get_for_date(
        self,
        target_date: date,
        type: Optional[str] = None,
        include_geojson: bool = True,
    ) -> list[TerritoryBoundary]:
        """Get boundaries valid for a specific date."""
        pass

    @abstractmethod
    async def get_change_dates(self) -> list[date]:
        """Get dates when boundaries changed."""
        pass
