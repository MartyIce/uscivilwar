"""API routers for Civil War REST API."""

from .events import router as events_router
from .people import router as people_router
from .locations import router as locations_router
from .units import router as units_router
from .boundaries import router as boundaries_router
from .stats import router as stats_router

__all__ = [
    "events_router",
    "people_router",
    "locations_router",
    "units_router",
    "boundaries_router",
    "stats_router",
]
