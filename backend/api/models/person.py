"""Person domain model."""

from dataclasses import dataclass
from datetime import date
from enum import Enum
from typing import Optional


class Side(str, Enum):
    """Civil War sides/affiliations."""
    UNION = "union"
    CONFEDERATE = "confederate"
    NEUTRAL = "neutral"
    BORDER = "border"


@dataclass
class Person:
    """A historical person from the Civil War era."""
    id: int
    name: str
    birth_date: Optional[date] = None
    death_date: Optional[date] = None
    side: Optional[Side] = None
    rank: Optional[str] = None
    highest_rank: Optional[str] = None
    biography: Optional[str] = None
    image_url: Optional[str] = None
    wikipedia_url: Optional[str] = None
    wikidata_id: Optional[str] = None
    external_id: Optional[str] = None
