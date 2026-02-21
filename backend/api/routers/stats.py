"""Statistics router with aggregate data endpoints."""

from datetime import date
from typing import Optional
from fastapi import APIRouter, Query

from ..dependencies import EventRepoDep

router = APIRouter()


@router.get("/casualties")
async def get_casualty_stats(
    event_repo: EventRepoDep,
):
    """Get aggregate casualty statistics for the Civil War."""
    stats = await event_repo.get_casualties_aggregate()

    # Calculate totals
    union = stats["union"]
    confederate = stats["confederate"]

    total_union_casualties = (
        (union["killed"] or 0)
        + (union["wounded"] or 0)
        + (union["captured"] or 0)
        + (union["missing"] or 0)
    )
    total_confederate_casualties = (
        (confederate["killed"] or 0)
        + (confederate["wounded"] or 0)
        + (confederate["captured"] or 0)
        + (confederate["missing"] or 0)
    )

    return {
        "union": {
            **union,
            "total_casualties": total_union_casualties,
        },
        "confederate": {
            **confederate,
            "total_casualties": total_confederate_casualties,
        },
        "combined": {
            "killed": (union["killed"] or 0) + (confederate["killed"] or 0),
            "wounded": (union["wounded"] or 0) + (confederate["wounded"] or 0),
            "captured": (union["captured"] or 0) + (confederate["captured"] or 0),
            "missing": (union["missing"] or 0) + (confederate["missing"] or 0),
            "total_casualties": total_union_casualties + total_confederate_casualties,
            "total_engaged": (union["total_engaged"] or 0) + (confederate["total_engaged"] or 0),
        },
        "total_battles": stats["total_battles"],
    }


@router.get("/timeline")
async def get_timeline_stats(
    event_repo: EventRepoDep,
    date_from: Optional[date] = Query(None, description="Start date (default: 1861-01-01)"),
    date_to: Optional[date] = Query(None, description="End date (default: 1865-12-31)"),
    granularity: str = Query("month", description="Grouping: day, week, month, year"),
):
    """Get event counts over time for the Civil War."""
    if date_from is None:
        date_from = date(1861, 1, 1)
    if date_to is None:
        date_to = date(1865, 12, 31)

    events = await event_repo.get_timeline(date_from=date_from, date_to=date_to)

    # Group events by period
    counts = {}
    for event in events:
        if granularity == "day":
            key = event.date_start.isoformat()
        elif granularity == "week":
            # ISO week number
            iso_cal = event.date_start.isocalendar()
            key = f"{iso_cal[0]}-W{iso_cal[1]:02d}"
        elif granularity == "year":
            key = str(event.date_start.year)
        else:  # month
            key = f"{event.date_start.year}-{event.date_start.month:02d}"

        if key not in counts:
            counts[key] = {"battles": 0, "other": 0, "total": 0}

        if event.type.value == "battle":
            counts[key]["battles"] += 1
        else:
            counts[key]["other"] += 1
        counts[key]["total"] += 1

    # Convert to sorted list
    timeline = [{"period": k, **v} for k, v in sorted(counts.items())]

    return {
        "date_range": {
            "start": date_from.isoformat(),
            "end": date_to.isoformat(),
        },
        "granularity": granularity,
        "timeline": timeline,
        "totals": {
            "battles": sum(t["battles"] for t in timeline),
            "other": sum(t["other"] for t in timeline),
            "total": sum(t["total"] for t in timeline),
        },
    }
