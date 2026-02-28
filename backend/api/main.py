"""FastAPI application for Civil War REST API."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .routers import events, people, locations, units, boundaries, stats

# Create FastAPI application
app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION,
    description=settings.API_DESCRIPTION,
    docs_url="/api/v1/docs",
    redoc_url="/api/v1/redoc",
    openapi_url="/api/v1/openapi.json",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(events.router, prefix="/api/v1/events", tags=["events"])
app.include_router(people.router, prefix="/api/v1/people", tags=["people"])
app.include_router(locations.router, prefix="/api/v1/locations", tags=["locations"])
app.include_router(units.router, prefix="/api/v1/units", tags=["units"])
app.include_router(boundaries.router, prefix="/api/v1/boundaries", tags=["boundaries"])
app.include_router(stats.router, prefix="/api/v1/stats", tags=["stats"])


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "name": settings.API_TITLE,
        "version": settings.API_VERSION,
        "description": settings.API_DESCRIPTION,
        "docs_url": "/api/v1/docs",
        "openapi_url": "/api/v1/openapi.json",
        "using_mock_data": settings.USE_MOCK_DATA,
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "using_mock_data": settings.USE_MOCK_DATA,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.PORT)
