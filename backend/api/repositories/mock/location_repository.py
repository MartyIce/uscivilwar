"""Mock location repository with hardcoded Civil War locations."""

from typing import Optional

from ..base import BaseLocationRepository
from ...models import Location, LocationType
from ...models.location import Coordinates


# Mock locations with realistic Civil War data
MOCK_LOCATIONS: list[Location] = [
    Location(
        id=1,
        name="Fort Sumter",
        type=LocationType.FORT,
        coordinates=Coordinates(lat=32.7522, lng=-79.8745),
        state="South Carolina",
        description="Fort Sumter is a sea fort located in Charleston Harbor, South Carolina. It is famous as the site where the first shots of the Civil War were fired on April 12, 1861.",
    ),
    Location(
        id=2,
        name="Gettysburg",
        type=LocationType.BATTLEFIELD,
        coordinates=Coordinates(lat=39.8309, lng=-77.2311),
        state="Pennsylvania",
        description="Gettysburg is the site of the largest battle ever fought in North America. The three-day battle in July 1863 was a turning point of the Civil War.",
    ),
    Location(
        id=3,
        name="Appomattox Court House",
        type=LocationType.LANDMARK,
        coordinates=Coordinates(lat=37.3765, lng=-78.7969),
        state="Virginia",
        description="Appomattox Court House is the site where General Robert E. Lee surrendered the Army of Northern Virginia to General Ulysses S. Grant on April 9, 1865.",
    ),
    Location(
        id=4,
        name="Antietam",
        type=LocationType.BATTLEFIELD,
        coordinates=Coordinates(lat=39.4747, lng=-77.7447),
        state="Maryland",
        description="Antietam National Battlefield is the site of the bloodiest single-day battle in American history, fought on September 17, 1862.",
    ),
    Location(
        id=5,
        name="Bull Run (Manassas)",
        type=LocationType.BATTLEFIELD,
        coordinates=Coordinates(lat=38.8128, lng=-77.5214),
        state="Virginia",
        description="Manassas National Battlefield Park encompasses the site of two major Civil War battles: First Bull Run (1861) and Second Bull Run (1862).",
    ),
    Location(
        id=6,
        name="Shiloh",
        type=LocationType.BATTLEFIELD,
        coordinates=Coordinates(lat=35.1486, lng=-88.3394),
        state="Tennessee",
        description="Shiloh National Military Park preserves the Shiloh battlefield where over 23,000 soldiers were killed, wounded, or captured in April 1862.",
    ),
    Location(
        id=7,
        name="Vicksburg",
        type=LocationType.CITY,
        coordinates=Coordinates(lat=32.3526, lng=-90.8779),
        state="Mississippi",
        description="Vicksburg was the site of a crucial 47-day siege. Its surrender on July 4, 1863, gave the Union control of the Mississippi River.",
    ),
    Location(
        id=8,
        name="Fredericksburg",
        type=LocationType.BATTLEFIELD,
        coordinates=Coordinates(lat=38.3032, lng=-77.4605),
        state="Virginia",
        description="Fredericksburg was the site of four major Civil War battles. The December 1862 battle resulted in a devastating Union defeat.",
    ),
    Location(
        id=9,
        name="Chancellorsville",
        type=LocationType.BATTLEFIELD,
        coordinates=Coordinates(lat=38.3135, lng=-77.6492),
        state="Virginia",
        description="Chancellorsville was the site of Lee's greatest victory but also where Stonewall Jackson was mortally wounded by friendly fire.",
    ),
    Location(
        id=10,
        name="Chickamauga",
        type=LocationType.BATTLEFIELD,
        coordinates=Coordinates(lat=34.9411, lng=-85.2594),
        state="Georgia",
        description="Chickamauga and Chattanooga National Military Park preserves the site of one of the bloodiest battles of the Civil War.",
    ),
    Location(
        id=11,
        name="Richmond",
        type=LocationType.CAPITAL,
        coordinates=Coordinates(lat=37.5407, lng=-77.4360),
        state="Virginia",
        description="Richmond was the capital of the Confederate States of America from 1861 to 1865.",
    ),
    Location(
        id=12,
        name="Washington, D.C.",
        type=LocationType.CAPITAL,
        coordinates=Coordinates(lat=38.9072, lng=-77.0369),
        state="District of Columbia",
        description="Washington, D.C. was the capital of the United States and headquarters of the Union war effort.",
    ),
]


class MockLocationRepository(BaseLocationRepository):
    """Mock repository with hardcoded Civil War location data."""

    async def get_by_id(self, id: int) -> Optional[Location]:
        """Get a location by ID."""
        return next((loc for loc in MOCK_LOCATIONS if loc.id == id), None)

    async def get_all(self, limit: int = 50, offset: int = 0, **filters) -> list[Location]:
        """Get all locations with optional filtering."""
        filtered = MOCK_LOCATIONS.copy()

        # Apply filters
        if filters.get("type"):
            filtered = [loc for loc in filtered if loc.type.value == filters["type"]]
        if filters.get("state"):
            filtered = [loc for loc in filtered if loc.state == filters["state"]]
        if filters.get("name"):
            name_filter = filters["name"].lower()
            filtered = [loc for loc in filtered if name_filter in loc.name.lower()]

        # Sort by name
        filtered.sort(key=lambda loc: loc.name)

        return filtered[offset : offset + limit]

    async def count(self, **filters) -> int:
        """Count locations with optional filtering."""
        return len(await self.get_all(limit=10000, **filters))

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
        filtered = []
        for loc in MOCK_LOCATIONS:
            if loc.coordinates:
                lat, lng = loc.coordinates.lat, loc.coordinates.lng
                if south <= lat <= north and west <= lng <= east:
                    if type is None or loc.type.value == type:
                        filtered.append(loc)

        return filtered[:limit]

    async def search_by_name(self, name: str, limit: int = 20) -> list[Location]:
        """Search for locations by name."""
        name_lower = name.lower()
        return [loc for loc in MOCK_LOCATIONS if name_lower in loc.name.lower()][:limit]
