"""Mock event repository with hardcoded Civil War battle data."""

from datetime import date
from typing import Optional, Any

from ..base import BaseEventRepository
from ...models import Event, EventType, EventCasualty


# Mock location data (to be used for event locations)
MOCK_LOCATIONS = {
    1: {"name": "Fort Sumter", "lat": 32.7522, "lng": -79.8745, "state": "South Carolina"},
    2: {"name": "Gettysburg", "lat": 39.8309, "lng": -77.2311, "state": "Pennsylvania"},
    3: {"name": "Appomattox Court House", "lat": 37.3765, "lng": -78.7969, "state": "Virginia"},
    4: {"name": "Antietam", "lat": 39.4747, "lng": -77.7447, "state": "Maryland"},
    5: {"name": "Bull Run", "lat": 38.8128, "lng": -77.5214, "state": "Virginia"},
    6: {"name": "Shiloh", "lat": 35.1486, "lng": -88.3394, "state": "Tennessee"},
    7: {"name": "Vicksburg", "lat": 32.3526, "lng": -90.8779, "state": "Mississippi"},
    8: {"name": "Fredericksburg", "lat": 38.3032, "lng": -77.4605, "state": "Virginia"},
    9: {"name": "Chancellorsville", "lat": 38.3135, "lng": -77.6492, "state": "Virginia"},
    10: {"name": "Chickamauga", "lat": 34.9411, "lng": -85.2594, "state": "Georgia"},
}


# Mock events with realistic Civil War data
MOCK_EVENTS: list[Event] = [
    Event(
        id=1,
        name="Battle of Fort Sumter",
        type=EventType.BATTLE,
        date_start=date(1861, 4, 12),
        date_end=date(1861, 4, 13),
        description="The bombardment of Fort Sumter was the first military action of the American Civil War. Confederate forces under General P.G.T. Beauregard opened fire on the Union garrison at Fort Sumter in Charleston Harbor, South Carolina.",
        result="Confederate victory",
        significance=5,
        location_id=1,
        theater="Eastern",
        campaign=None,
        cwsac_id="SC001",
        wikipedia_url="https://en.wikipedia.org/wiki/Battle_of_Fort_Sumter",
        casualties=[
            EventCasualty(event_id=1, side="union", killed=2, wounded=0, captured=0, missing=0, total_engaged=85),
            EventCasualty(event_id=1, side="confederate", killed=0, wounded=4, captured=0, missing=0, total_engaged=500),
        ],
    ),
    Event(
        id=2,
        name="First Battle of Bull Run",
        type=EventType.BATTLE,
        date_start=date(1861, 7, 21),
        date_end=date(1861, 7, 21),
        description="The First Battle of Bull Run, also known as First Manassas, was the first major battle of the American Civil War. It ended in a Confederate victory and shattered Northern hopes of a quick war.",
        result="Confederate victory",
        significance=5,
        location_id=5,
        theater="Eastern",
        campaign="Manassas Campaign",
        cwsac_id="VA005",
        wikipedia_url="https://en.wikipedia.org/wiki/First_Battle_of_Bull_Run",
        casualties=[
            EventCasualty(event_id=2, side="union", killed=460, wounded=1124, captured=1312, missing=0, total_engaged=28450),
            EventCasualty(event_id=2, side="confederate", killed=387, wounded=1582, captured=13, missing=0, total_engaged=32230),
        ],
    ),
    Event(
        id=3,
        name="Battle of Shiloh",
        type=EventType.BATTLE,
        date_start=date(1862, 4, 6),
        date_end=date(1862, 4, 7),
        description="The Battle of Shiloh was a major battle in the Western Theater of the American Civil War. Union forces under Ulysses S. Grant were surprised by Confederate forces under Albert Sidney Johnston and P.G.T. Beauregard but recovered to win the battle.",
        result="Union victory",
        significance=5,
        location_id=6,
        theater="Western",
        campaign="Shiloh Campaign",
        cwsac_id="TN003",
        wikipedia_url="https://en.wikipedia.org/wiki/Battle_of_Shiloh",
        casualties=[
            EventCasualty(event_id=3, side="union", killed=1754, wounded=8408, captured=2885, missing=0, total_engaged=65085),
            EventCasualty(event_id=3, side="confederate", killed=1728, wounded=8012, captured=959, missing=0, total_engaged=44968),
        ],
    ),
    Event(
        id=4,
        name="Battle of Antietam",
        type=EventType.BATTLE,
        date_start=date(1862, 9, 17),
        date_end=date(1862, 9, 17),
        description="The Battle of Antietam, also known as the Battle of Sharpsburg, was the bloodiest single-day battle in American history. It ended Robert E. Lee's first invasion of the North and led to Lincoln's Emancipation Proclamation.",
        result="Union victory",
        significance=5,
        location_id=4,
        theater="Eastern",
        campaign="Maryland Campaign",
        cwsac_id="MD003",
        wikipedia_url="https://en.wikipedia.org/wiki/Battle_of_Antietam",
        casualties=[
            EventCasualty(event_id=4, side="union", killed=2108, wounded=9540, captured=753, missing=0, total_engaged=75316),
            EventCasualty(event_id=4, side="confederate", killed=1546, wounded=7752, captured=1018, missing=0, total_engaged=38000),
        ],
    ),
    Event(
        id=5,
        name="Battle of Fredericksburg",
        type=EventType.BATTLE,
        date_start=date(1862, 12, 11),
        date_end=date(1862, 12, 15),
        description="The Battle of Fredericksburg was a major Union defeat. General Ambrose Burnside's Army of the Potomac suffered crushing losses in futile frontal assaults against Confederate General Robert E. Lee's forces.",
        result="Confederate victory",
        significance=4,
        location_id=8,
        theater="Eastern",
        campaign="Fredericksburg Campaign",
        cwsac_id="VA044",
        wikipedia_url="https://en.wikipedia.org/wiki/Battle_of_Fredericksburg",
        casualties=[
            EventCasualty(event_id=5, side="union", killed=1284, wounded=9600, captured=1769, missing=0, total_engaged=114000),
            EventCasualty(event_id=5, side="confederate", killed=595, wounded=4061, captured=653, missing=0, total_engaged=72500),
        ],
    ),
    Event(
        id=6,
        name="Battle of Chancellorsville",
        type=EventType.BATTLE,
        date_start=date(1863, 4, 30),
        date_end=date(1863, 5, 6),
        description="The Battle of Chancellorsville is considered Robert E. Lee's greatest victory, though it came at the cost of Stonewall Jackson, who was mortally wounded by friendly fire. Despite being outnumbered, Lee divided his forces and defeated the Union Army.",
        result="Confederate victory",
        significance=5,
        location_id=9,
        theater="Eastern",
        campaign="Chancellorsville Campaign",
        cwsac_id="VA032",
        wikipedia_url="https://en.wikipedia.org/wiki/Battle_of_Chancellorsville",
        casualties=[
            EventCasualty(event_id=6, side="union", killed=1606, wounded=9762, captured=5919, missing=0, total_engaged=133868),
            EventCasualty(event_id=6, side="confederate", killed=1665, wounded=9081, captured=2018, missing=0, total_engaged=60892),
        ],
    ),
    Event(
        id=7,
        name="Battle of Gettysburg",
        type=EventType.BATTLE,
        date_start=date(1863, 7, 1),
        date_end=date(1863, 7, 3),
        description="The Battle of Gettysburg was a turning point of the Civil War. General George Meade's Army of the Potomac defeated Robert E. Lee's Army of Northern Virginia, ending Lee's second invasion of the North. Pickett's Charge on July 3rd was a devastating Confederate defeat.",
        result="Union victory",
        significance=5,
        location_id=2,
        theater="Eastern",
        campaign="Gettysburg Campaign",
        cwsac_id="PA002",
        wikipedia_url="https://en.wikipedia.org/wiki/Battle_of_Gettysburg",
        casualties=[
            EventCasualty(event_id=7, side="union", killed=3155, wounded=14529, captured=5365, missing=0, total_engaged=83289),
            EventCasualty(event_id=7, side="confederate", killed=4708, wounded=12693, captured=5830, missing=0, total_engaged=75000),
        ],
    ),
    Event(
        id=8,
        name="Siege of Vicksburg",
        type=EventType.SIEGE,
        date_start=date(1863, 5, 18),
        date_end=date(1863, 7, 4),
        description="The Siege of Vicksburg was the final major military action in the Vicksburg Campaign. General Ulysses S. Grant's forces laid siege to the Confederate fortress city, which surrendered on July 4, 1863, giving the Union complete control of the Mississippi River.",
        result="Union victory",
        significance=5,
        location_id=7,
        theater="Western",
        campaign="Vicksburg Campaign",
        cwsac_id="MS009",
        wikipedia_url="https://en.wikipedia.org/wiki/Siege_of_Vicksburg",
        casualties=[
            EventCasualty(event_id=8, side="union", killed=806, wounded=3940, captured=164, missing=0, total_engaged=77000),
            EventCasualty(event_id=8, side="confederate", killed=805, wounded=1938, captured=29491, missing=0, total_engaged=33000),
        ],
    ),
    Event(
        id=9,
        name="Battle of Chickamauga",
        type=EventType.BATTLE,
        date_start=date(1863, 9, 19),
        date_end=date(1863, 9, 20),
        description="The Battle of Chickamauga was the most significant Union defeat in the Western Theater and had the second-highest casualties after Gettysburg. Confederate General Braxton Bragg defeated Union General William Rosecrans.",
        result="Confederate victory",
        significance=4,
        location_id=10,
        theater="Western",
        campaign="Chickamauga Campaign",
        cwsac_id="GA006",
        wikipedia_url="https://en.wikipedia.org/wiki/Battle_of_Chickamauga",
        casualties=[
            EventCasualty(event_id=9, side="union", killed=1657, wounded=9756, captured=4757, missing=0, total_engaged=60000),
            EventCasualty(event_id=9, side="confederate", killed=2312, wounded=14674, captured=1468, missing=0, total_engaged=65000),
        ],
    ),
    Event(
        id=10,
        name="Appomattox Court House Surrender",
        type=EventType.SURRENDER,
        date_start=date(1865, 4, 9),
        date_end=None,
        description="The surrender at Appomattox Court House effectively ended the American Civil War. General Robert E. Lee surrendered the Army of Northern Virginia to General Ulysses S. Grant, marking the beginning of the end of the Confederacy.",
        result=None,
        significance=5,
        location_id=3,
        theater="Eastern",
        campaign="Appomattox Campaign",
        cwsac_id="VA097",
        wikipedia_url="https://en.wikipedia.org/wiki/Battle_of_Appomattox_Court_House",
        casualties=[
            EventCasualty(event_id=10, side="union", killed=164, wounded=0, captured=0, missing=0, total_engaged=63285),
            EventCasualty(event_id=10, side="confederate", killed=500, wounded=0, captured=27805, missing=0, total_engaged=28356),
        ],
    ),
]


class MockEventRepository(BaseEventRepository):
    """Mock repository with hardcoded Civil War event data."""

    async def get_by_id(self, id: int) -> Optional[Event]:
        """Get an event by ID."""
        return next((e for e in MOCK_EVENTS if e.id == id), None)

    async def get_all(self, limit: int = 50, offset: int = 0, **filters) -> list[Event]:
        """Get all events with optional filtering."""
        filtered = MOCK_EVENTS.copy()

        # Apply filters
        if filters.get("type"):
            filtered = [e for e in filtered if e.type.value == filters["type"]]
        if filters.get("date_from"):
            filtered = [e for e in filtered if e.date_start >= filters["date_from"]]
        if filters.get("date_to"):
            filtered = [e for e in filtered if e.date_start <= filters["date_to"]]
        if filters.get("theater"):
            filtered = [e for e in filtered if e.theater == filters["theater"]]
        if filters.get("campaign"):
            filtered = [e for e in filtered if e.campaign and filters["campaign"].lower() in e.campaign.lower()]
        if filters.get("min_significance"):
            filtered = [e for e in filtered if e.significance and e.significance >= filters["min_significance"]]
        if filters.get("location_id"):
            filtered = [e for e in filtered if e.location_id == filters["location_id"]]

        # Sort by date
        filtered.sort(key=lambda e: e.date_start)

        return filtered[offset : offset + limit]

    async def count(self, **filters) -> int:
        """Count events with optional filtering."""
        return len(await self.get_all(limit=10000, **filters))

    async def get_timeline(
        self,
        date_from: Optional[date] = None,
        date_to: Optional[date] = None,
        types: Optional[list[str]] = None,
    ) -> list[Event]:
        """Get events for timeline display."""
        filtered = MOCK_EVENTS.copy()

        if date_from:
            filtered = [e for e in filtered if e.date_start >= date_from]
        if date_to:
            filtered = [e for e in filtered if e.date_start <= date_to]
        if types:
            filtered = [e for e in filtered if e.type.value in types]

        filtered.sort(key=lambda e: e.date_start)
        return filtered

    async def get_by_location(self, location_id: int) -> list[Event]:
        """Get events at a specific location."""
        return [e for e in MOCK_EVENTS if e.location_id == location_id]

    async def get_casualties_aggregate(self) -> dict[str, Any]:
        """Get aggregate casualty statistics."""
        union_stats = {"killed": 0, "wounded": 0, "captured": 0, "missing": 0, "total_engaged": 0}
        confederate_stats = {"killed": 0, "wounded": 0, "captured": 0, "missing": 0, "total_engaged": 0}

        for event in MOCK_EVENTS:
            for casualty in event.casualties:
                stats = union_stats if casualty.side == "union" else confederate_stats
                if casualty.killed:
                    stats["killed"] += casualty.killed
                if casualty.wounded:
                    stats["wounded"] += casualty.wounded
                if casualty.captured:
                    stats["captured"] += casualty.captured
                if casualty.missing:
                    stats["missing"] += casualty.missing
                if casualty.total_engaged:
                    stats["total_engaged"] += casualty.total_engaged

        return {
            "union": union_stats,
            "confederate": confederate_stats,
            "total_battles": len(MOCK_EVENTS),
        }

    def get_location_data(self, location_id: int) -> Optional[dict]:
        """Helper to get location data for an event."""
        return MOCK_LOCATIONS.get(location_id)
