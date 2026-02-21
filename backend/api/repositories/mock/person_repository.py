"""Mock person repository with hardcoded Civil War figures."""

from datetime import date
from typing import Optional

from ..base import BasePersonRepository
from ...models import Person, Side


# Mock people with realistic Civil War figures
MOCK_PEOPLE: list[Person] = [
    Person(
        id=1,
        name="Ulysses S. Grant",
        birth_date=date(1822, 4, 27),
        death_date=date(1885, 7, 23),
        side=Side.UNION,
        rank="Lieutenant General",
        highest_rank="General of the Army",
        biography="Ulysses S. Grant was the commanding general of the Union Army during the Civil War. He led the Union to victory and later served as the 18th President of the United States.",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Ulysses_S_Grant_by_Brady_c1870-restored.jpg/220px-Ulysses_S_Grant_by_Brady_c1870-restored.jpg",
        wikipedia_url="https://en.wikipedia.org/wiki/Ulysses_S._Grant",
        wikidata_id="Q34836",
    ),
    Person(
        id=2,
        name="Robert E. Lee",
        birth_date=date(1807, 1, 19),
        death_date=date(1870, 10, 12),
        side=Side.CONFEDERATE,
        rank="General",
        highest_rank="General",
        biography="Robert E. Lee was the commander of the Confederate Army of Northern Virginia. He is considered one of the greatest American military leaders, despite leading the losing side in the Civil War.",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Robert_E_Lee.jpg/220px-Robert_E_Lee.jpg",
        wikipedia_url="https://en.wikipedia.org/wiki/Robert_E._Lee",
        wikidata_id="Q165557",
    ),
    Person(
        id=3,
        name="Abraham Lincoln",
        birth_date=date(1809, 2, 12),
        death_date=date(1865, 4, 15),
        side=Side.UNION,
        rank="President",
        highest_rank="President",
        biography="Abraham Lincoln was the 16th President of the United States. He preserved the Union during the Civil War and began the process of abolishing slavery with the Emancipation Proclamation.",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/220px-Abraham_Lincoln_O-77_matte_collodion_print.jpg",
        wikipedia_url="https://en.wikipedia.org/wiki/Abraham_Lincoln",
        wikidata_id="Q91",
    ),
    Person(
        id=4,
        name="Thomas J. 'Stonewall' Jackson",
        birth_date=date(1824, 1, 21),
        death_date=date(1863, 5, 10),
        side=Side.CONFEDERATE,
        rank="Lieutenant General",
        highest_rank="Lieutenant General",
        biography="Thomas J. 'Stonewall' Jackson was one of the most talented Confederate generals. He earned his nickname at the First Battle of Bull Run and was mortally wounded by friendly fire at Chancellorsville.",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Stonewall_Jackson_by_Routzahn%2C_1862.png/220px-Stonewall_Jackson_by_Routzahn%2C_1862.png",
        wikipedia_url="https://en.wikipedia.org/wiki/Stonewall_Jackson",
        wikidata_id="Q214648",
    ),
    Person(
        id=5,
        name="William Tecumseh Sherman",
        birth_date=date(1820, 2, 8),
        death_date=date(1891, 2, 14),
        side=Side.UNION,
        rank="Major General",
        highest_rank="General of the Army",
        biography="William Tecumseh Sherman was a Union general known for his 'March to the Sea' which devastated Georgia. He is famous for the quote 'War is hell.'",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/William-Tecumseh-Sherman.jpg/220px-William-Tecumseh-Sherman.jpg",
        wikipedia_url="https://en.wikipedia.org/wiki/William_Tecumseh_Sherman",
        wikidata_id="Q11459",
    ),
    Person(
        id=6,
        name="George G. Meade",
        birth_date=date(1815, 12, 31),
        death_date=date(1872, 11, 6),
        side=Side.UNION,
        rank="Major General",
        highest_rank="Major General",
        biography="George G. Meade was a Union general who commanded the Army of the Potomac at the Battle of Gettysburg, defeating Robert E. Lee and ending his second invasion of the North.",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Meade-cropped.jpg/220px-Meade-cropped.jpg",
        wikipedia_url="https://en.wikipedia.org/wiki/George_Meade",
        wikidata_id="Q313071",
    ),
    Person(
        id=7,
        name="P.G.T. Beauregard",
        birth_date=date(1818, 5, 28),
        death_date=date(1893, 2, 20),
        side=Side.CONFEDERATE,
        rank="General",
        highest_rank="General",
        biography="P.G.T. Beauregard was a Confederate general who ordered the first shots of the Civil War at Fort Sumter and commanded forces at the First Battle of Bull Run.",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/PGT_Beauregard.jpg/220px-PGT_Beauregard.jpg",
        wikipedia_url="https://en.wikipedia.org/wiki/P._G._T._Beauregard",
        wikidata_id="Q312729",
    ),
    Person(
        id=8,
        name="George B. McClellan",
        birth_date=date(1826, 12, 3),
        death_date=date(1885, 10, 29),
        side=Side.UNION,
        rank="Major General",
        highest_rank="Major General",
        biography="George B. McClellan was a Union general who organized the Army of the Potomac. Known for his excellent organizational skills but excessive caution in battle.",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/George_B._McClellan_-_retouched.jpg/220px-George_B._McClellan_-_retouched.jpg",
        wikipedia_url="https://en.wikipedia.org/wiki/George_B._McClellan",
        wikidata_id="Q310192",
    ),
    Person(
        id=9,
        name="Jefferson Davis",
        birth_date=date(1808, 6, 3),
        death_date=date(1889, 12, 6),
        side=Side.CONFEDERATE,
        rank="President",
        highest_rank="President",
        biography="Jefferson Davis was the President of the Confederate States of America throughout the Civil War. A former U.S. Senator and Secretary of War.",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/President-Jefferson-Davis.jpg/220px-President-Jefferson-Davis.jpg",
        wikipedia_url="https://en.wikipedia.org/wiki/Jefferson_Davis",
        wikidata_id="Q162269",
    ),
    Person(
        id=10,
        name="Ambrose Burnside",
        birth_date=date(1824, 5, 23),
        death_date=date(1881, 9, 13),
        side=Side.UNION,
        rank="Major General",
        highest_rank="Major General",
        biography="Ambrose Burnside was a Union general who commanded the Army of the Potomac during the disastrous Battle of Fredericksburg. Famous for his distinctive facial hair (sideburns).",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Ambrose_Burnside_-_retouched.jpg/220px-Ambrose_Burnside_-_retouched.jpg",
        wikipedia_url="https://en.wikipedia.org/wiki/Ambrose_Burnside",
        wikidata_id="Q312788",
    ),
]


# Mock event participation data
MOCK_EVENT_PARTICIPATION = [
    {"person_id": 1, "event_id": 3, "role": "commander", "unit_commanded": "Army of the Tennessee"},  # Grant at Shiloh
    {"person_id": 1, "event_id": 8, "role": "commander", "unit_commanded": "Army of the Tennessee"},  # Grant at Vicksburg
    {"person_id": 1, "event_id": 10, "role": "commander", "unit_commanded": "Union Armies"},  # Grant at Appomattox
    {"person_id": 2, "event_id": 4, "role": "commander", "unit_commanded": "Army of Northern Virginia"},  # Lee at Antietam
    {"person_id": 2, "event_id": 5, "role": "commander", "unit_commanded": "Army of Northern Virginia"},  # Lee at Fredericksburg
    {"person_id": 2, "event_id": 6, "role": "commander", "unit_commanded": "Army of Northern Virginia"},  # Lee at Chancellorsville
    {"person_id": 2, "event_id": 7, "role": "commander", "unit_commanded": "Army of Northern Virginia"},  # Lee at Gettysburg
    {"person_id": 2, "event_id": 10, "role": "commander", "unit_commanded": "Army of Northern Virginia"},  # Lee at Appomattox
    {"person_id": 4, "event_id": 2, "role": "commander", "unit_commanded": "1st Virginia Brigade"},  # Jackson at Bull Run
    {"person_id": 4, "event_id": 6, "role": "subordinate", "unit_commanded": "II Corps"},  # Jackson at Chancellorsville
    {"person_id": 6, "event_id": 7, "role": "commander", "unit_commanded": "Army of the Potomac"},  # Meade at Gettysburg
    {"person_id": 7, "event_id": 1, "role": "commander", "unit_commanded": "Confederate Forces"},  # Beauregard at Fort Sumter
    {"person_id": 7, "event_id": 2, "role": "subordinate", "unit_commanded": "Confederate Forces"},  # Beauregard at Bull Run
    {"person_id": 8, "event_id": 4, "role": "commander", "unit_commanded": "Army of the Potomac"},  # McClellan at Antietam
    {"person_id": 10, "event_id": 5, "role": "commander", "unit_commanded": "Army of the Potomac"},  # Burnside at Fredericksburg
]


class MockPersonRepository(BasePersonRepository):
    """Mock repository with hardcoded Civil War people data."""

    async def get_by_id(self, id: int) -> Optional[Person]:
        """Get a person by ID."""
        return next((p for p in MOCK_PEOPLE if p.id == id), None)

    async def get_all(self, limit: int = 50, offset: int = 0, **filters) -> list[Person]:
        """Get all people with optional filtering."""
        filtered = MOCK_PEOPLE.copy()

        # Apply filters
        if filters.get("name"):
            name_filter = filters["name"].lower()
            filtered = [p for p in filtered if name_filter in p.name.lower()]
        if filters.get("side"):
            filtered = [p for p in filtered if p.side and p.side.value == filters["side"]]
        if filters.get("rank"):
            rank_filter = filters["rank"].lower()
            filtered = [p for p in filtered if p.rank and rank_filter in p.rank.lower()]

        # Sort by name
        filtered.sort(key=lambda p: p.name)

        return filtered[offset : offset + limit]

    async def count(self, **filters) -> int:
        """Count people with optional filtering."""
        return len(await self.get_all(limit=10000, **filters))

    async def get_by_event(self, event_id: int) -> list[tuple[Person, str, Optional[str]]]:
        """Get people who participated in an event with their roles."""
        result = []
        for participation in MOCK_EVENT_PARTICIPATION:
            if participation["event_id"] == event_id:
                person = await self.get_by_id(participation["person_id"])
                if person:
                    result.append((person, participation["role"], participation.get("unit_commanded")))
        return result

    async def search_by_name(self, name: str, limit: int = 20) -> list[Person]:
        """Search for people by name."""
        name_lower = name.lower()
        return [p for p in MOCK_PEOPLE if name_lower in p.name.lower()][:limit]

    async def get_events_for_person(self, person_id: int) -> list[dict]:
        """Get events a person participated in."""
        return [p for p in MOCK_EVENT_PARTICIPATION if p["person_id"] == person_id]
