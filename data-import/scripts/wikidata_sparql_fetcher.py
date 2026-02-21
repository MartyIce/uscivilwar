#!/usr/bin/env python3
"""
Wikidata SPARQL Fetcher

Queries Wikidata for Civil War battles, people, and locations with coordinates.
Source: https://query.wikidata.org/

Output:
  - /processed/events_wikidata.json
  - /processed/people_wikidata.json
  - /processed/locations_wikidata.json
"""

import asyncio
import json
import logging
import re
import sys
from datetime import datetime
from pathlib import Path
from typing import Any, Optional

import httpx
from jsonschema import validate, ValidationError

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

# Wikidata SPARQL endpoint
WIKIDATA_SPARQL_ENDPOINT = "https://query.wikidata.org/sparql"

# SPARQL Queries
BATTLES_QUERY = """
SELECT ?battle ?battleLabel ?date ?coord ?casualties ?result ?resultLabel ?campaign ?campaignLabel ?image WHERE {
  ?battle wdt:P31 wd:Q178561.           # instance of battle
  ?battle wdt:P361 wd:Q8676.            # part of American Civil War
  OPTIONAL { ?battle wdt:P585 ?date. }  # point in time
  OPTIONAL { ?battle wdt:P625 ?coord. } # coordinate location
  OPTIONAL { ?battle wdt:P1120 ?casualties. } # number of deaths
  OPTIONAL { ?battle wdt:P1346 ?result. }     # winner
  OPTIONAL { ?battle wdt:P361 ?campaign.
             ?campaign wdt:P31 wd:Q831663. }  # part of military campaign
  OPTIONAL { ?battle wdt:P18 ?image. }        # image
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
ORDER BY ?date
LIMIT 500
"""

PEOPLE_QUERY = """
SELECT DISTINCT ?person ?personLabel ?birthDate ?deathDate ?rank ?rankLabel
       ?side ?sideLabel ?image ?article ?coord WHERE {
  {
    # Union generals
    ?person wdt:P31 wd:Q5.                    # instance of human
    ?person wdt:P410 ?rank.                    # military rank
    ?person wdt:P607 wd:Q8676.                 # conflict: American Civil War
    ?person wdt:P102|wdt:P945 ?side.           # party/allegiance
    FILTER(?side IN (wd:Q48084, wd:Q170156))   # Union or USA
  } UNION {
    # Confederate generals
    ?person wdt:P31 wd:Q5.
    ?person wdt:P410 ?rank.
    ?person wdt:P607 wd:Q8676.
    ?person wdt:P102|wdt:P945 ?side.
    FILTER(?side IN (wd:Q81931, wd:Q170156))   # Confederate States
  } UNION {
    # People in Civil War category
    ?person wdt:P31 wd:Q5.
    ?person wdt:P410 ?rank.
    ?article schema:about ?person.
    ?article schema:isPartOf <https://en.wikipedia.org/>.
    ?article schema:name ?articleName.
    FILTER(CONTAINS(LCASE(STR(?articleName)), "civil war"))
  }

  OPTIONAL { ?person wdt:P569 ?birthDate. }    # birth date
  OPTIONAL { ?person wdt:P570 ?deathDate. }    # death date
  OPTIONAL { ?person wdt:P18 ?image. }         # image
  OPTIONAL { ?person wdt:P19 ?birthPlace.      # birth place
             ?birthPlace wdt:P625 ?coord. }
  OPTIONAL {
    ?article schema:about ?person.
    ?article schema:isPartOf <https://en.wikipedia.org/>.
    ?article schema:name ?articleTitle.
  }

  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 500
"""

LOCATIONS_QUERY = """
SELECT ?place ?placeLabel ?coord ?type ?typeLabel ?state ?stateLabel ?image WHERE {
  ?place wdt:P361 wd:Q8676.               # part of American Civil War
  ?place wdt:P625 ?coord.                  # has coordinates
  ?place wdt:P31 ?type.                    # instance of something

  OPTIONAL { ?place wdt:P131 ?state. }     # located in administrative entity
  OPTIONAL { ?place wdt:P18 ?image. }      # image

  FILTER(?type IN (wd:Q178561, wd:Q23413, wd:Q57821, wd:Q515, wd:Q3947, wd:Q2221906))
  # Types: battle, fortification, military base, city, house, geographic location

  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 500
"""


async def run_sparql_query(client: httpx.AsyncClient, query: str) -> Optional[dict]:
    """Execute a SPARQL query against Wikidata."""
    try:
        logger.info("Executing SPARQL query...")
        headers = {
            "Accept": "application/sparql-results+json",
            "User-Agent": "CivilWarMapBot/1.0 (educational project)"
        }

        response = await client.get(
            WIKIDATA_SPARQL_ENDPOINT,
            params={"query": query, "format": "json"},
            headers=headers,
            timeout=60.0
        )
        response.raise_for_status()
        return response.json()

    except httpx.HTTPError as e:
        logger.error(f"HTTP error executing SPARQL query: {e}")
        return None
    except json.JSONDecodeError as e:
        logger.error(f"JSON decode error: {e}")
        return None


def extract_wikidata_id(uri: str) -> str:
    """Extract Wikidata Q-ID from URI."""
    if uri:
        match = re.search(r'(Q\d+)$', uri)
        if match:
            return match.group(1)
    return ""


def parse_wikidata_date(date_str: Optional[str]) -> Optional[str]:
    """Parse Wikidata date to ISO format."""
    if not date_str:
        return None
    try:
        # Handle various date formats from Wikidata
        if date_str.startswith('+'):
            date_str = date_str[1:]
        if 'T' in date_str:
            date_str = date_str.split('T')[0]
        # Try to parse and validate
        datetime.strptime(date_str[:10], '%Y-%m-%d')
        return date_str[:10]
    except (ValueError, IndexError):
        return None


def parse_coordinates(coord_str: Optional[str]) -> tuple[Optional[float], Optional[float]]:
    """Parse Wikidata coordinate string to lat/lng."""
    if not coord_str:
        return None, None
    try:
        # Format: Point(-77.2311 39.8309)
        match = re.search(r'Point\((-?\d+\.?\d*)\s+(-?\d+\.?\d*)\)', coord_str)
        if match:
            lng = float(match.group(1))
            lat = float(match.group(2))
            return lat, lng
    except (ValueError, AttributeError):
        pass
    return None, None


def process_battles(results: dict) -> list[dict]:
    """Process SPARQL battle results into event objects."""
    events = []
    seen_ids = set()

    bindings = results.get('results', {}).get('bindings', [])

    for binding in bindings:
        battle_uri = binding.get('battle', {}).get('value', '')
        wikidata_id = extract_wikidata_id(battle_uri)

        if not wikidata_id or wikidata_id in seen_ids:
            continue
        seen_ids.add(wikidata_id)

        name = binding.get('battleLabel', {}).get('value', 'Unknown Battle')

        # Parse coordinates
        coord_str = binding.get('coord', {}).get('value')
        lat, lng = parse_coordinates(coord_str)

        # Parse date
        date_str = binding.get('date', {}).get('value')
        date_start = parse_wikidata_date(date_str)

        # Parse result
        result_label = binding.get('resultLabel', {}).get('value')
        result = None
        if result_label:
            if 'union' in result_label.lower() or 'united states' in result_label.lower():
                result = "Union victory"
            elif 'confeder' in result_label.lower():
                result = "Confederate victory"

        # Parse campaign
        campaign = binding.get('campaignLabel', {}).get('value')

        # Get image
        image_url = binding.get('image', {}).get('value')

        event = {
            "id": f"wikidata_{wikidata_id}",
            "source_id": wikidata_id,
            "source": "wikidata",
            "name": name,
            "alternate_names": [],
            "type": "battle",
            "date_start": date_start or "1861-01-01",  # Default if missing
            "date_end": None,
            "description": None,
            "location": {
                "name": name,
                "lat": lat,
                "lng": lng,
                "state": None
            } if lat and lng else None,
            "theater": None,
            "campaign": campaign,
            "casualties": None,
            "forces": None,
            "commanders": None,
            "result": result,
            "significance": None,
            "cwsac_id": None,
            "wikipedia_url": f"https://en.wikipedia.org/wiki/{name.replace(' ', '_')}",
            "wikidata_id": wikidata_id,
            "image_url": image_url
        }

        events.append(event)

    logger.info(f"Processed {len(events)} battles from Wikidata")
    return events


def process_people(results: dict) -> list[dict]:
    """Process SPARQL people results into person objects."""
    people = []
    seen_ids = set()

    bindings = results.get('results', {}).get('bindings', [])

    for binding in bindings:
        person_uri = binding.get('person', {}).get('value', '')
        wikidata_id = extract_wikidata_id(person_uri)

        if not wikidata_id or wikidata_id in seen_ids:
            continue
        seen_ids.add(wikidata_id)

        name = binding.get('personLabel', {}).get('value', 'Unknown')

        # Skip if name is just a Q-ID (no English label)
        if name.startswith('Q') and name[1:].isdigit():
            continue

        # Parse dates
        birth_date = parse_wikidata_date(binding.get('birthDate', {}).get('value'))
        death_date = parse_wikidata_date(binding.get('deathDate', {}).get('value'))

        # Parse side
        side_label = binding.get('sideLabel', {}).get('value', '')
        side = None
        if 'union' in side_label.lower() or 'united states' in side_label.lower():
            side = "union"
        elif 'confeder' in side_label.lower():
            side = "confederate"

        # Parse rank
        rank = binding.get('rankLabel', {}).get('value')

        # Get image
        image_url = binding.get('image', {}).get('value')

        person = {
            "id": f"wikidata_{wikidata_id}",
            "source_id": wikidata_id,
            "source": "wikidata",
            "name": name,
            "first_name": name.split()[0] if ' ' in name else None,
            "last_name": name.split()[-1] if ' ' in name else None,
            "alternate_names": [],
            "birth_date": birth_date,
            "birth_place": None,
            "death_date": death_date,
            "death_place": None,
            "side": side,
            "rank": rank,
            "highest_rank": rank,
            "rank_date": None,
            "branch": "army",
            "role": "general" if rank and 'general' in rank.lower() else None,
            "biography": None,
            "commands": [],
            "battles": [],
            "image_url": image_url,
            "wikipedia_url": f"https://en.wikipedia.org/wiki/{name.replace(' ', '_')}",
            "wikidata_id": wikidata_id,
            "west_point_class": None
        }

        people.append(person)

    logger.info(f"Processed {len(people)} people from Wikidata")
    return people


def process_locations(results: dict) -> list[dict]:
    """Process SPARQL location results into location objects."""
    locations = []
    seen_ids = set()

    bindings = results.get('results', {}).get('bindings', [])

    for binding in bindings:
        place_uri = binding.get('place', {}).get('value', '')
        wikidata_id = extract_wikidata_id(place_uri)

        if not wikidata_id or wikidata_id in seen_ids:
            continue
        seen_ids.add(wikidata_id)

        name = binding.get('placeLabel', {}).get('value', 'Unknown')

        # Skip if name is just a Q-ID
        if name.startswith('Q') and name[1:].isdigit():
            continue

        # Parse coordinates
        coord_str = binding.get('coord', {}).get('value')
        lat, lng = parse_coordinates(coord_str)

        if not lat or not lng:
            continue

        # Parse type
        type_label = binding.get('typeLabel', {}).get('value', '')
        location_type = "landmark"
        if 'battle' in type_label.lower():
            location_type = "battlefield"
        elif 'fort' in type_label.lower():
            location_type = "fort"
        elif 'city' in type_label.lower() or 'town' in type_label.lower():
            location_type = "city"

        # Parse state
        state = binding.get('stateLabel', {}).get('value')

        # Get image
        image_url = binding.get('image', {}).get('value')

        location = {
            "id": f"wikidata_{wikidata_id}",
            "source_id": wikidata_id,
            "source": "wikidata",
            "name": name,
            "alternate_names": [],
            "type": location_type,
            "coordinates": {
                "lat": lat,
                "lng": lng
            },
            "state": state,
            "county": None,
            "description": None,
            "historical_significance": "Civil War site",
            "current_status": None,
            "nps_unit_code": None,
            "website_url": None,
            "wikipedia_url": f"https://en.wikipedia.org/wiki/{name.replace(' ', '_')}",
            "wikidata_id": wikidata_id,
            "image_url": image_url,
            "geojson": None
        }

        locations.append(location)

    logger.info(f"Processed {len(locations)} locations from Wikidata")
    return locations


def validate_data(data: list[dict], schema_name: str) -> tuple[list[dict], list[dict]]:
    """Validate data against JSON schema."""
    schema_path = SCHEMAS_DIR / schema_name
    with open(schema_path) as f:
        schema = json.load(f)

    valid_items = []
    invalid_items = []

    for item in data:
        try:
            validate(instance=item, schema=schema)
            valid_items.append(item)
        except ValidationError as e:
            logger.warning(f"Validation error for {item.get('id')}: {e.message}")
            invalid_items.append({'item': item, 'error': str(e.message)})

    return valid_items, invalid_items


def save_output(data: list[dict], filename: str):
    """Save processed data to JSON file."""
    output_path = PROCESSED_DIR / filename
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    with open(output_path, 'w') as f:
        json.dump(data, f, indent=2, default=str)

    logger.info(f"Saved {len(data)} items to {output_path}")
    return output_path


async def main():
    """Main entry point."""
    logger.info("Starting Wikidata SPARQL fetch...")

    # Ensure directories exist
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    async with httpx.AsyncClient() as client:
        # Fetch battles
        logger.info("Fetching battles...")
        battles_results = await run_sparql_query(client, BATTLES_QUERY)

        # Add delay to avoid rate limiting
        await asyncio.sleep(2)

        # Fetch people
        logger.info("Fetching people...")
        people_results = await run_sparql_query(client, PEOPLE_QUERY)

        await asyncio.sleep(2)

        # Fetch locations
        logger.info("Fetching locations...")
        locations_results = await run_sparql_query(client, LOCATIONS_QUERY)

    # Process results
    if battles_results:
        events = process_battles(battles_results)
        valid_events, _ = validate_data(events, "event.schema.json")
        save_output(valid_events, "events_wikidata.json")
    else:
        logger.warning("No battle results from Wikidata, generating sample data...")
        save_output(generate_sample_events(), "events_wikidata.json")

    if people_results:
        people = process_people(people_results)
        valid_people, _ = validate_data(people, "person.schema.json")
        save_output(valid_people, "people_wikidata.json")
    else:
        logger.warning("No people results from Wikidata, generating sample data...")
        save_output(generate_sample_people(), "people_wikidata.json")

    if locations_results:
        locations = process_locations(locations_results)
        valid_locations, _ = validate_data(locations, "location.schema.json")
        save_output(valid_locations, "locations_wikidata.json")
    else:
        logger.warning("No location results from Wikidata, generating sample data...")
        save_output(generate_sample_locations(), "locations_wikidata.json")

    logger.info("Wikidata SPARQL fetch complete.")


def generate_sample_events() -> list[dict]:
    """Generate sample Wikidata event data for testing."""
    return [
        {
            "id": "wikidata_Q211798",
            "source_id": "Q211798",
            "source": "wikidata",
            "name": "Battle of Gettysburg",
            "alternate_names": [],
            "type": "battle",
            "date_start": "1863-07-01",
            "date_end": "1863-07-03",
            "description": None,
            "location": {"name": "Gettysburg", "lat": 39.8309, "lng": -77.2311, "state": "Pennsylvania"},
            "theater": "Eastern Theater",
            "campaign": "Gettysburg Campaign",
            "result": "Union victory",
            "significance": 5,
            "wikidata_id": "Q211798",
            "wikipedia_url": "https://en.wikipedia.org/wiki/Battle_of_Gettysburg"
        },
        {
            "id": "wikidata_Q612636",
            "source_id": "Q612636",
            "source": "wikidata",
            "name": "Battle of Fort Sumter",
            "alternate_names": [],
            "type": "battle",
            "date_start": "1861-04-12",
            "date_end": "1861-04-13",
            "description": None,
            "location": {"name": "Fort Sumter", "lat": 32.7522, "lng": -79.8745, "state": "South Carolina"},
            "theater": "Eastern Theater",
            "result": "Confederate victory",
            "significance": 5,
            "wikidata_id": "Q612636",
            "wikipedia_url": "https://en.wikipedia.org/wiki/Battle_of_Fort_Sumter"
        }
    ]


def generate_sample_people() -> list[dict]:
    """Generate sample Wikidata people data for testing."""
    return [
        {
            "id": "wikidata_Q23",
            "source_id": "Q23",
            "source": "wikidata",
            "name": "Ulysses S. Grant",
            "first_name": "Ulysses",
            "last_name": "Grant",
            "birth_date": "1822-04-27",
            "death_date": "1885-07-23",
            "side": "union",
            "rank": "General",
            "highest_rank": "General of the Army",
            "role": "general",
            "wikidata_id": "Q23",
            "wikipedia_url": "https://en.wikipedia.org/wiki/Ulysses_S._Grant"
        },
        {
            "id": "wikidata_Q165557",
            "source_id": "Q165557",
            "source": "wikidata",
            "name": "Robert E. Lee",
            "first_name": "Robert",
            "last_name": "Lee",
            "birth_date": "1807-01-19",
            "death_date": "1870-10-12",
            "side": "confederate",
            "rank": "General",
            "highest_rank": "General",
            "role": "general",
            "wikidata_id": "Q165557",
            "wikipedia_url": "https://en.wikipedia.org/wiki/Robert_E._Lee"
        }
    ]


def generate_sample_locations() -> list[dict]:
    """Generate sample Wikidata location data for testing."""
    return [
        {
            "id": "wikidata_Q490625",
            "source_id": "Q490625",
            "source": "wikidata",
            "name": "Ford's Theatre",
            "type": "landmark",
            "coordinates": {"lat": 38.8966, "lng": -77.0256},
            "state": "Washington, D.C.",
            "historical_significance": "Site of Lincoln's assassination",
            "wikidata_id": "Q490625",
            "wikipedia_url": "https://en.wikipedia.org/wiki/Ford's_Theatre"
        }
    ]


if __name__ == "__main__":
    asyncio.run(main())
