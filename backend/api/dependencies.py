"""Dependency injection for FastAPI application."""

from typing import Annotated
from fastapi import Depends

from .config import settings
from .repositories.base import (
    BaseEventRepository,
    BasePersonRepository,
    BaseLocationRepository,
    BaseMilitaryUnitRepository,
    BaseBoundaryRepository,
)


def get_event_repository() -> BaseEventRepository:
    """Get the event repository based on configuration."""
    if settings.USE_MOCK_DATA:
        from .repositories.mock.event_repository import MockEventRepository
        return MockEventRepository()
    else:
        from .repositories.sqlalchemy.event_repository import SQLAlchemyEventRepository
        return SQLAlchemyEventRepository()


def get_person_repository() -> BasePersonRepository:
    """Get the person repository based on configuration."""
    if settings.USE_MOCK_DATA:
        from .repositories.mock.person_repository import MockPersonRepository
        return MockPersonRepository()
    else:
        from .repositories.sqlalchemy.person_repository import SQLAlchemyPersonRepository
        return SQLAlchemyPersonRepository()


def get_location_repository() -> BaseLocationRepository:
    """Get the location repository based on configuration."""
    if settings.USE_MOCK_DATA:
        from .repositories.mock.location_repository import MockLocationRepository
        return MockLocationRepository()
    else:
        from .repositories.sqlalchemy.location_repository import SQLAlchemyLocationRepository
        return SQLAlchemyLocationRepository()


def get_military_unit_repository() -> BaseMilitaryUnitRepository:
    """Get the military unit repository based on configuration."""
    if settings.USE_MOCK_DATA:
        from .repositories.mock.military_unit_repository import MockMilitaryUnitRepository
        return MockMilitaryUnitRepository()
    else:
        from .repositories.sqlalchemy.military_unit_repository import SQLAlchemyMilitaryUnitRepository
        return SQLAlchemyMilitaryUnitRepository()


def get_boundary_repository() -> BaseBoundaryRepository:
    """Get the boundary repository based on configuration."""
    if settings.USE_MOCK_DATA:
        from .repositories.mock.boundary_repository import MockBoundaryRepository
        return MockBoundaryRepository()
    else:
        from .repositories.sqlalchemy.boundary_repository import SQLAlchemyBoundaryRepository
        return SQLAlchemyBoundaryRepository()


# Type aliases for dependency injection
EventRepoDep = Annotated[BaseEventRepository, Depends(get_event_repository)]
PersonRepoDep = Annotated[BasePersonRepository, Depends(get_person_repository)]
LocationRepoDep = Annotated[BaseLocationRepository, Depends(get_location_repository)]
MilitaryUnitRepoDep = Annotated[BaseMilitaryUnitRepository, Depends(get_military_unit_repository)]
BoundaryRepoDep = Annotated[BaseBoundaryRepository, Depends(get_boundary_repository)]
