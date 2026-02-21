"""Mock military unit repository with hardcoded Civil War units."""

from datetime import date
from typing import Optional

from ..base import BaseMilitaryUnitRepository
from ...models import MilitaryUnit, UnitType, Side


# Mock military units with realistic Civil War data
MOCK_UNITS: list[MilitaryUnit] = [
    # Union Armies
    MilitaryUnit(
        id=1,
        name="Army of the Potomac",
        type=UnitType.ARMY,
        side=Side.UNION,
        formed_date=date(1861, 8, 15),
        disbanded_date=date(1865, 6, 28),
        description="The Army of the Potomac was the principal Union Army in the Eastern Theater. It was involved in most major battles against Robert E. Lee's Army of Northern Virginia.",
        peak_strength=130000,
    ),
    MilitaryUnit(
        id=2,
        name="Army of the Tennessee",
        type=UnitType.ARMY,
        side=Side.UNION,
        formed_date=date(1862, 10, 16),
        disbanded_date=date(1865, 8, 1),
        description="The Army of the Tennessee was a major Union Army in the Western Theater, commanded successively by Ulysses S. Grant, William T. Sherman, and others.",
        peak_strength=80000,
    ),
    MilitaryUnit(
        id=3,
        name="Army of the Cumberland",
        type=UnitType.ARMY,
        side=Side.UNION,
        formed_date=date(1862, 10, 24),
        disbanded_date=date(1865, 8, 1),
        description="The Army of the Cumberland was a Union Army that fought in the Western Theater, particularly in Tennessee and Georgia.",
        peak_strength=60000,
    ),
    # Confederate Armies
    MilitaryUnit(
        id=4,
        name="Army of Northern Virginia",
        type=UnitType.ARMY,
        side=Side.CONFEDERATE,
        formed_date=date(1862, 6, 1),
        disbanded_date=date(1865, 4, 9),
        description="The Army of Northern Virginia was the primary Confederate army in the Eastern Theater, commanded by Robert E. Lee. It surrendered at Appomattox Court House.",
        peak_strength=90000,
    ),
    MilitaryUnit(
        id=5,
        name="Army of Tennessee",
        type=UnitType.ARMY,
        side=Side.CONFEDERATE,
        formed_date=date(1862, 11, 20),
        disbanded_date=date(1865, 4, 26),
        description="The Army of Tennessee was the principal Confederate army in the Western Theater, fighting in Tennessee, Georgia, and the Carolinas.",
        peak_strength=65000,
    ),
    # Union Corps
    MilitaryUnit(
        id=6,
        name="II Corps (Army of the Potomac)",
        type=UnitType.CORPS,
        side=Side.UNION,
        parent_id=1,
        formed_date=date(1862, 3, 13),
        description="The II Corps of the Army of the Potomac was one of the most distinguished Union corps, known for its role at Gettysburg defending Cemetery Ridge.",
        peak_strength=15000,
    ),
    MilitaryUnit(
        id=7,
        name="III Corps (Army of the Potomac)",
        type=UnitType.CORPS,
        side=Side.UNION,
        parent_id=1,
        formed_date=date(1862, 3, 13),
        disbanded_date=date(1864, 3, 24),
        description="The III Corps of the Army of the Potomac fought at Chancellorsville and Gettysburg before being consolidated into other corps.",
        peak_strength=12000,
    ),
    # Confederate Corps
    MilitaryUnit(
        id=8,
        name="First Corps (Army of Northern Virginia)",
        type=UnitType.CORPS,
        side=Side.CONFEDERATE,
        parent_id=4,
        formed_date=date(1862, 11, 6),
        description="The First Corps of the Army of Northern Virginia was commanded by James Longstreet and was Lee's most trusted offensive force.",
        peak_strength=20000,
    ),
    MilitaryUnit(
        id=9,
        name="Second Corps (Army of Northern Virginia)",
        type=UnitType.CORPS,
        side=Side.CONFEDERATE,
        parent_id=4,
        formed_date=date(1862, 11, 6),
        description="The Second Corps was originally commanded by Stonewall Jackson. It was famous for the flanking maneuver at Chancellorsville.",
        peak_strength=22000,
    ),
    # Famous Regiments
    MilitaryUnit(
        id=10,
        name="20th Maine Infantry Regiment",
        type=UnitType.REGIMENT,
        side=Side.UNION,
        formed_date=date(1862, 8, 29),
        disbanded_date=date(1865, 7, 16),
        description="The 20th Maine Infantry Regiment is famous for its defense of Little Round Top at Gettysburg under Colonel Joshua Chamberlain.",
        peak_strength=1000,
    ),
    MilitaryUnit(
        id=11,
        name="1st Virginia Infantry Regiment",
        type=UnitType.REGIMENT,
        side=Side.CONFEDERATE,
        formed_date=date(1861, 4, 23),
        disbanded_date=date(1865, 4, 9),
        description="The 1st Virginia Infantry was part of the Stonewall Brigade and fought in many major battles of the Eastern Theater.",
        peak_strength=800,
    ),
    MilitaryUnit(
        id=12,
        name="54th Massachusetts Infantry Regiment",
        type=UnitType.REGIMENT,
        side=Side.UNION,
        formed_date=date(1863, 3, 13),
        disbanded_date=date(1865, 8, 20),
        description="The 54th Massachusetts was one of the first African-American regiments in the Union Army. Famous for its assault on Fort Wagner.",
        peak_strength=1000,
    ),
]


# Mock unit event participation
MOCK_UNIT_EVENTS = [
    {"unit_id": 1, "event_id": 4, "strength": 75000, "casualties": 12400, "role": "attacking"},  # Army of Potomac at Antietam
    {"unit_id": 1, "event_id": 5, "strength": 114000, "casualties": 12600, "role": "attacking"},  # Army of Potomac at Fredericksburg
    {"unit_id": 1, "event_id": 6, "strength": 130000, "casualties": 17000, "role": "attacking"},  # Army of Potomac at Chancellorsville
    {"unit_id": 1, "event_id": 7, "strength": 83000, "casualties": 23000, "role": "defending"},  # Army of Potomac at Gettysburg
    {"unit_id": 2, "event_id": 3, "strength": 65000, "casualties": 13000, "role": "defending"},  # Army of Tennessee at Shiloh
    {"unit_id": 2, "event_id": 8, "strength": 77000, "casualties": 5000, "role": "besieging"},  # Army of Tennessee at Vicksburg
    {"unit_id": 4, "event_id": 4, "strength": 38000, "casualties": 10000, "role": "defending"},  # ANV at Antietam
    {"unit_id": 4, "event_id": 5, "strength": 72000, "casualties": 5000, "role": "defending"},  # ANV at Fredericksburg
    {"unit_id": 4, "event_id": 6, "strength": 60000, "casualties": 13000, "role": "attacking"},  # ANV at Chancellorsville
    {"unit_id": 4, "event_id": 7, "strength": 75000, "casualties": 23000, "role": "attacking"},  # ANV at Gettysburg
    {"unit_id": 4, "event_id": 10, "strength": 28000, "casualties": 500, "role": "surrendering"},  # ANV at Appomattox
    {"unit_id": 10, "event_id": 7, "strength": 386, "casualties": 130, "role": "defending"},  # 20th Maine at Gettysburg
]


class MockMilitaryUnitRepository(BaseMilitaryUnitRepository):
    """Mock repository with hardcoded Civil War military unit data."""

    async def get_by_id(self, id: int) -> Optional[MilitaryUnit]:
        """Get a unit by ID."""
        return next((unit for unit in MOCK_UNITS if unit.id == id), None)

    async def get_all(self, limit: int = 50, offset: int = 0, **filters) -> list[MilitaryUnit]:
        """Get all units with optional filtering."""
        filtered = MOCK_UNITS.copy()

        # Apply filters
        if filters.get("type"):
            filtered = [u for u in filtered if u.type.value == filters["type"]]
        if filters.get("side"):
            filtered = [u for u in filtered if u.side.value == filters["side"]]
        if filters.get("name"):
            name_filter = filters["name"].lower()
            filtered = [u for u in filtered if name_filter in u.name.lower()]
        if filters.get("parent_id"):
            filtered = [u for u in filtered if u.parent_id == filters["parent_id"]]

        # Sort by name
        filtered.sort(key=lambda u: u.name)

        return filtered[offset : offset + limit]

    async def count(self, **filters) -> int:
        """Count units with optional filtering."""
        return len(await self.get_all(limit=10000, **filters))

    async def get_subunits(self, parent_id: int) -> list[MilitaryUnit]:
        """Get subunits of a unit."""
        return [u for u in MOCK_UNITS if u.parent_id == parent_id]

    async def get_by_event(self, event_id: int) -> list[MilitaryUnit]:
        """Get units that participated in an event."""
        result = []
        for participation in MOCK_UNIT_EVENTS:
            if participation["event_id"] == event_id:
                unit = await self.get_by_id(participation["unit_id"])
                if unit:
                    result.append(unit)
        return result

    async def get_unit_event_participation(self, unit_id: int) -> list[dict]:
        """Get events a unit participated in."""
        return [p for p in MOCK_UNIT_EVENTS if p["unit_id"] == unit_id]
