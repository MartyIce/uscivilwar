#!/usr/bin/env python3
"""
ACW Battle Data Importer

Downloads and processes battle data from jrnold/acw_battle_data GitHub repository.
Source: https://github.com/jrnold/acw_battle_data

Output: /processed/events_acw.json
"""

import asyncio
import json
import logging
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Any, Optional

import httpx
from jsonschema import validate, ValidationError
from pydantic import BaseModel, Field, field_validator

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Paths
BASE_DIR = Path(__file__).parent.parent
RAW_DIR = BASE_DIR / "raw"
PROCESSED_DIR = BASE_DIR / "processed"
SCHEMAS_DIR = BASE_DIR / "schemas"

# Data sources
ACW_GITHUB_BASE = "https://raw.githubusercontent.com/jrnold/acw_battle_data/master/rawdata"
BATTLES_URL = f"{ACW_GITHUB_BASE}/cwsac/battles.json"
FORCES_URL = f"{ACW_GITHUB_BASE}/cwsac/forces.json"
COMMANDERS_URL = f"{ACW_GITHUB_BASE}/cwsac/commanders.json"

# Alternative: FigShare releases
FIGSHARE_URL = "https://ndownloader.figshare.com/files/3862193"


class CasualtyStats(BaseModel):
    """Casualty statistics for one side."""
    killed: Optional[int] = None
    wounded: Optional[int] = None
    captured: Optional[int] = None
    missing: Optional[int] = None
    total: Optional[int] = None


class ForceStats(BaseModel):
    """Force statistics for one side."""
    strength: Optional[int] = None
    units: Optional[list[str]] = None


class Location(BaseModel):
    """Location information."""
    name: str
    lat: Optional[float] = None
    lng: Optional[float] = None
    state: Optional[str] = None
    county: Optional[str] = None


class Event(BaseModel):
    """Event model matching the schema."""
    id: str
    source_id: Optional[str] = None
    source: str = "acw_battle_data"
    name: str
    alternate_names: list[str] = Field(default_factory=list)
    type: str = "battle"
    date_start: str
    date_end: Optional[str] = None
    description: Optional[str] = None
    location: Optional[Location] = None
    theater: Optional[str] = None
    campaign: Optional[str] = None
    casualties: Optional[dict[str, CasualtyStats]] = None
    forces: Optional[dict[str, ForceStats]] = None
    commanders: Optional[dict[str, list[str]]] = None
    result: Optional[str] = None
    significance: Optional[int] = None
    cwsac_id: Optional[str] = None
    wikipedia_url: Optional[str] = None
    wikidata_id: Optional[str] = None
    image_url: Optional[str] = None

    @field_validator('date_start', 'date_end', mode='before')
    @classmethod
    def validate_date(cls, v):
        if v is None:
            return None
        if isinstance(v, str):
            return v
        return v

    def model_dump_json_compatible(self) -> dict:
        """Convert to JSON-compatible dict."""
        data = self.model_dump(exclude_none=False)
        # Convert nested models
        if data.get('location'):
            data['location'] = {k: v for k, v in data['location'].items() if v is not None}
        if data.get('casualties'):
            data['casualties'] = {
                side: {k: v for k, v in stats.items() if v is not None}
                for side, stats in data['casualties'].items()
            }
        if data.get('forces'):
            data['forces'] = {
                side: {k: v for k, v in stats.items() if v is not None}
                for side, stats in data['forces'].items()
            }
        return data


async def fetch_json(client: httpx.AsyncClient, url: str) -> Optional[dict]:
    """Fetch JSON data from URL."""
    try:
        logger.info(f"Fetching: {url}")
        response = await client.get(url, timeout=30.0)
        response.raise_for_status()
        return response.json()
    except httpx.HTTPError as e:
        logger.error(f"HTTP error fetching {url}: {e}")
        return None
    except json.JSONDecodeError as e:
        logger.error(f"JSON decode error for {url}: {e}")
        return None


def parse_date(date_str: Optional[str]) -> Optional[str]:
    """Parse date string to ISO format."""
    if not date_str:
        return None
    try:
        # Try various date formats
        for fmt in ["%Y-%m-%d", "%Y-%m", "%Y"]:
            try:
                dt = datetime.strptime(date_str[:len(fmt.replace('%', '').replace('-', '')) + 2], fmt)
                return dt.strftime("%Y-%m-%d") if fmt == "%Y-%m-%d" else date_str
            except ValueError:
                continue
        return date_str
    except Exception:
        return date_str


def map_result(result_code: Optional[str]) -> Optional[str]:
    """Map result codes to human-readable strings."""
    result_map = {
        'U': 'Union victory',
        'C': 'Confederate victory',
        'I': 'Inconclusive',
        'D': 'Draw',
        'Union': 'Union victory',
        'Confederate': 'Confederate victory',
        'Inconclusive': 'Inconclusive',
    }
    return result_map.get(result_code, result_code) if result_code else None


def map_significance(cwsac_class: Optional[str]) -> Optional[int]:
    """Map CWSAC classification to significance rating (1-5)."""
    sig_map = {
        'A': 5,  # Decisive influence on campaign
        'B': 4,  # Major influence on campaign
        'C': 3,  # Significant influence
        'D': 2,  # Limited influence
    }
    return sig_map.get(cwsac_class, None) if cwsac_class else None


async def download_and_process() -> list[dict]:
    """Download and process ACW battle data."""
    events = []

    async with httpx.AsyncClient() as client:
        # Fetch battles data
        battles_data = await fetch_json(client, BATTLES_URL)

        if not battles_data:
            logger.warning("Could not fetch battles data from GitHub, trying FigShare...")
            # Fallback logic could be added here
            return events

        # Fetch supplementary data
        forces_data = await fetch_json(client, FORCES_URL)
        commanders_data = await fetch_json(client, COMMANDERS_URL)

        # Index supplementary data by battle ID
        forces_by_battle = {}
        if forces_data:
            for force in forces_data:
                battle_id = force.get('cwsac_id') or force.get('battle_id')
                if battle_id:
                    if battle_id not in forces_by_battle:
                        forces_by_battle[battle_id] = {'union': {}, 'confederate': {}}
                    belligerent = force.get('belligerent', '').lower()
                    if 'union' in belligerent or belligerent == 'us':
                        forces_by_battle[battle_id]['union'] = {
                            'strength': force.get('strength_mean') or force.get('strength'),
                            'casualties_total': force.get('casualties'),
                            'killed': force.get('killed'),
                            'wounded': force.get('wounded'),
                            'captured': force.get('captured') or force.get('missing_captured'),
                        }
                    elif 'confed' in belligerent or belligerent == 'cs':
                        forces_by_battle[battle_id]['confederate'] = {
                            'strength': force.get('strength_mean') or force.get('strength'),
                            'casualties_total': force.get('casualties'),
                            'killed': force.get('killed'),
                            'wounded': force.get('wounded'),
                            'captured': force.get('captured') or force.get('missing_captured'),
                        }

        commanders_by_battle = {}
        if commanders_data:
            for cmd in commanders_data:
                battle_id = cmd.get('cwsac_id') or cmd.get('battle_id')
                if battle_id:
                    if battle_id not in commanders_by_battle:
                        commanders_by_battle[battle_id] = {'union': [], 'confederate': []}
                    belligerent = cmd.get('belligerent', '').lower()
                    name = cmd.get('commander') or cmd.get('name')
                    if name:
                        if 'union' in belligerent or belligerent == 'us':
                            commanders_by_battle[battle_id]['union'].append(name)
                        elif 'confed' in belligerent or belligerent == 'cs':
                            commanders_by_battle[battle_id]['confederate'].append(name)

        # Process battles
        for battle in battles_data:
            battle_id = battle.get('cwsac_id') or battle.get('id')
            if not battle_id:
                continue

            # Build location
            location = None
            if battle.get('lat') and battle.get('lng'):
                location = Location(
                    name=battle.get('battle_name') or battle.get('name', 'Unknown'),
                    lat=float(battle.get('lat')),
                    lng=float(battle.get('lng')),
                    state=battle.get('state'),
                    county=battle.get('county')
                )
            elif battle.get('location'):
                location = Location(
                    name=battle.get('location'),
                    state=battle.get('state')
                )

            # Build casualties from forces data
            casualties = None
            forces = None
            battle_forces = forces_by_battle.get(battle_id, {})
            if battle_forces:
                casualties = {}
                forces = {}
                for side in ['union', 'confederate']:
                    side_data = battle_forces.get(side, {})
                    if side_data:
                        casualties[side] = CasualtyStats(
                            killed=side_data.get('killed'),
                            wounded=side_data.get('wounded'),
                            captured=side_data.get('captured'),
                            total=side_data.get('casualties_total')
                        )
                        forces[side] = ForceStats(
                            strength=side_data.get('strength')
                        )

            # Get commanders
            commanders = commanders_by_battle.get(battle_id)

            # Build event
            event = Event(
                id=f"acw_{battle_id}",
                source_id=battle_id,
                source="acw_battle_data",
                name=battle.get('battle_name') or battle.get('name', 'Unknown Battle'),
                alternate_names=battle.get('alternate_names', []),
                type=battle.get('battle_type', 'battle').lower() if battle.get('battle_type') else 'battle',
                date_start=parse_date(battle.get('start_date') or battle.get('date')),
                date_end=parse_date(battle.get('end_date')),
                description=battle.get('description') or battle.get('summary'),
                location=location,
                theater=battle.get('theater'),
                campaign=battle.get('campaign'),
                casualties=casualties,
                forces=forces,
                commanders=commanders,
                result=map_result(battle.get('result')),
                significance=map_significance(battle.get('cwsac_class') or battle.get('significance')),
                cwsac_id=battle_id if battle_id.startswith(('VA', 'PA', 'MD', 'TN', 'GA', 'SC', 'NC', 'AL', 'MS', 'LA', 'TX', 'AR', 'MO', 'KY', 'WV', 'FL', 'OK', 'KS', 'NM', 'AZ', 'CO', 'ND', 'MN', 'NE', 'IN', 'OH', 'VT', 'DC')) else None,
                wikipedia_url=battle.get('wikipedia_url'),
            )

            events.append(event.model_dump_json_compatible())

        logger.info(f"Processed {len(events)} battles")

    return events


def validate_events(events: list[dict]) -> tuple[list[dict], list[dict]]:
    """Validate events against JSON schema."""
    schema_path = SCHEMAS_DIR / "event.schema.json"
    with open(schema_path) as f:
        schema = json.load(f)

    valid_events = []
    invalid_events = []

    for event in events:
        try:
            validate(instance=event, schema=schema)
            valid_events.append(event)
        except ValidationError as e:
            logger.warning(f"Validation error for event {event.get('id')}: {e.message}")
            invalid_events.append({'event': event, 'error': str(e.message)})

    return valid_events, invalid_events


def save_output(events: list[dict], filename: str = "events_acw.json"):
    """Save processed events to JSON file."""
    output_path = PROCESSED_DIR / filename
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    with open(output_path, 'w') as f:
        json.dump(events, f, indent=2, default=str)

    logger.info(f"Saved {len(events)} events to {output_path}")
    return output_path


async def main():
    """Main entry point."""
    logger.info("Starting ACW Battle Data import...")

    # Ensure directories exist
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    # Download and process
    events = await download_and_process()

    if not events:
        logger.error("No events were processed")
        sys.exit(1)

    # Validate
    valid_events, invalid_events = validate_events(events)
    logger.info(f"Valid events: {len(valid_events)}, Invalid events: {len(invalid_events)}")

    if invalid_events:
        # Save invalid events for debugging
        invalid_path = PROCESSED_DIR / "events_acw_invalid.json"
        with open(invalid_path, 'w') as f:
            json.dump(invalid_events, f, indent=2, default=str)
        logger.warning(f"Saved invalid events to {invalid_path}")

    # Save valid events
    output_path = save_output(valid_events)

    logger.info(f"ACW Battle Data import complete. Output: {output_path}")
    return valid_events


if __name__ == "__main__":
    asyncio.run(main())
