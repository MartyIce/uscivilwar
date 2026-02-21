#!/usr/bin/env python3
"""
NPS API Fetcher

Fetches Civil War related sites from the National Park Service API.
Source: https://www.nps.gov/subjects/developer/api-documentation.htm

Requires NPS_API_KEY environment variable.
Get a free API key at: https://www.nps.gov/subjects/developer/get-started.htm

Output: /processed/locations_nps.json
"""

import asyncio
import json
import logging
import os
import sys
from pathlib import Path
from typing import Any, Optional

import httpx
from dotenv import load_dotenv
from jsonschema import validate, ValidationError
from pydantic import BaseModel, Field

# Load environment variables
load_dotenv()

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

# API Configuration
NPS_API_BASE = "https://developer.nps.gov/api/v1"
NPS_API_KEY = os.getenv("NPS_API_KEY", "")

# Civil War related topics and activities
CIVIL_WAR_TOPICS = [
    "Civil War",
    "American Civil War",
    "Civil War Battlefields",
]

# Civil War parks and related unit codes
CIVIL_WAR_PARKS = [
    "anti",  # Antietam National Battlefield
    "apco",  # Appomattox Court House NHP
    "arpo",  # Arkansas Post National Memorial
    "brcr",  # Brices Cross Roads NBS
    "cebe",  # Cedar Creek and Belle Grove NHP
    "chch",  # Chickamauga & Chattanooga NMP
    "clba",  # Clara Barton NHS
    "fopu",  # Fort Pulaski National Monument
    "fosu",  # Fort Sumter and Fort Moultrie NHP
    "fowa",  # Fort Washington Park
    "frsp",  # Fredericksburg & Spotsylvania NMP
    "gett",  # Gettysburg NMP
    "glec",  # General Grant National Memorial
    "gree",  # Greenbelt Park
    "hafe",  # Harpers Ferry NHP
    "kemo",  # Kennesaw Mountain NBP
    "mana",  # Manassas NBP
    "mono",  # Monocacy National Battlefield
    "nace",  # National Capital Parks-East
    "pete",  # Petersburg National Battlefield
    "rich",  # Richmond NBP
    "shil",  # Shiloh NMP
    "stri",  # Stones River National Battlefield
    "tupe",  # Tupelo National Battlefield
    "vick",  # Vicksburg NMP
    "wicr",  # Wilson's Creek National Battlefield
]


class Coordinates(BaseModel):
    """Coordinate model."""
    lat: float
    lng: float


class Location(BaseModel):
    """Location model matching the schema."""
    id: str
    source_id: Optional[str] = None
    source: str = "nps"
    name: str
    alternate_names: list[str] = Field(default_factory=list)
    type: str = "battlefield"
    coordinates: Optional[Coordinates] = None
    state: Optional[str] = None
    county: Optional[str] = None
    description: Optional[str] = None
    historical_significance: Optional[str] = None
    current_status: Optional[str] = None
    nps_unit_code: Optional[str] = None
    website_url: Optional[str] = None
    wikipedia_url: Optional[str] = None
    wikidata_id: Optional[str] = None
    image_url: Optional[str] = None
    geojson: Optional[dict] = None

    def model_dump_json_compatible(self) -> dict:
        """Convert to JSON-compatible dict."""
        data = self.model_dump(exclude_none=False)
        if data.get('coordinates'):
            data['coordinates'] = {k: v for k, v in data['coordinates'].items() if v is not None}
        return data


async def fetch_parks(client: httpx.AsyncClient, api_key: str) -> list[dict]:
    """Fetch parks from NPS API."""
    parks = []

    # Fetch by park codes
    for park_code in CIVIL_WAR_PARKS:
        try:
            url = f"{NPS_API_BASE}/parks"
            params = {
                "parkCode": park_code,
                "api_key": api_key,
            }

            response = await client.get(url, params=params, timeout=30.0)
            response.raise_for_status()
            data = response.json()

            if data.get('data'):
                parks.extend(data['data'])
                logger.info(f"Fetched park: {park_code}")

            # Rate limiting
            await asyncio.sleep(0.1)

        except httpx.HTTPError as e:
            logger.warning(f"Error fetching park {park_code}: {e}")
            continue

    # Also search by topic
    try:
        url = f"{NPS_API_BASE}/parks"
        params = {
            "q": "Civil War",
            "limit": 100,
            "api_key": api_key,
        }

        response = await client.get(url, params=params, timeout=30.0)
        response.raise_for_status()
        data = response.json()

        if data.get('data'):
            # Add parks not already in list
            existing_codes = {p.get('parkCode') for p in parks}
            for park in data['data']:
                if park.get('parkCode') not in existing_codes:
                    parks.append(park)
                    logger.info(f"Found additional park: {park.get('parkCode')}")

    except httpx.HTTPError as e:
        logger.warning(f"Error searching parks: {e}")

    return parks


def map_park_type(designation: Optional[str]) -> str:
    """Map NPS designation to location type."""
    if not designation:
        return "landmark"

    designation_lower = designation.lower()

    if "battlefield" in designation_lower:
        return "battlefield"
    elif "fort" in designation_lower:
        return "fort"
    elif "memorial" in designation_lower:
        return "landmark"
    elif "cemetery" in designation_lower:
        return "cemetery"
    elif "historic" in designation_lower:
        return "landmark"
    else:
        return "landmark"


def process_parks(parks: list[dict]) -> list[dict]:
    """Process NPS park data into location objects."""
    locations = []

    for park in parks:
        park_code = park.get('parkCode', '')

        # Parse coordinates
        coordinates = None
        lat_str = park.get('latitude')
        lng_str = park.get('longitude')

        if lat_str and lng_str:
            try:
                coordinates = Coordinates(
                    lat=float(lat_str),
                    lng=float(lng_str)
                )
            except (ValueError, TypeError):
                pass

        # Parse states
        states = park.get('states', '')
        state = states.split(',')[0] if states else None

        # Get image URL
        image_url = None
        images = park.get('images', [])
        if images:
            image_url = images[0].get('url')

        # Determine historical significance
        topics = park.get('topics', [])
        topic_names = [t.get('name', '') for t in topics]
        civil_war_related = any('civil war' in t.lower() for t in topic_names)

        historical_significance = None
        if civil_war_related:
            historical_significance = "Civil War site. " + park.get('description', '')[:200] if park.get('description') else "Civil War site"

        location = Location(
            id=f"nps_{park_code}",
            source_id=park_code,
            source="nps",
            name=park.get('fullName') or park.get('name', 'Unknown'),
            alternate_names=[park.get('name')] if park.get('name') != park.get('fullName') else [],
            type=map_park_type(park.get('designation')),
            coordinates=coordinates,
            state=state,
            description=park.get('description'),
            historical_significance=historical_significance,
            current_status="National Park Service site",
            nps_unit_code=park_code,
            website_url=park.get('url'),
            image_url=image_url,
        )

        locations.append(location.model_dump_json_compatible())

    logger.info(f"Processed {len(locations)} locations")
    return locations


def validate_locations(locations: list[dict]) -> tuple[list[dict], list[dict]]:
    """Validate locations against JSON schema."""
    schema_path = SCHEMAS_DIR / "location.schema.json"
    with open(schema_path) as f:
        schema = json.load(f)

    valid_locations = []
    invalid_locations = []

    for location in locations:
        try:
            validate(instance=location, schema=schema)
            valid_locations.append(location)
        except ValidationError as e:
            logger.warning(f"Validation error for location {location.get('id')}: {e.message}")
            invalid_locations.append({'location': location, 'error': str(e.message)})

    return valid_locations, invalid_locations


def save_output(locations: list[dict], filename: str = "locations_nps.json"):
    """Save processed locations to JSON file."""
    output_path = PROCESSED_DIR / filename
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    with open(output_path, 'w') as f:
        json.dump(locations, f, indent=2, default=str)

    logger.info(f"Saved {len(locations)} locations to {output_path}")
    return output_path


async def main():
    """Main entry point."""
    logger.info("Starting NPS API fetch...")

    # Check API key
    if not NPS_API_KEY:
        logger.error("NPS_API_KEY environment variable not set.")
        logger.error("Get a free API key at: https://www.nps.gov/subjects/developer/get-started.htm")
        logger.info("Generating sample data instead...")

        # Generate sample data when no API key
        sample_locations = generate_sample_data()
        output_path = save_output(sample_locations, "locations_nps.json")
        logger.info(f"Sample data saved to {output_path}")
        return sample_locations

    # Ensure directories exist
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    async with httpx.AsyncClient() as client:
        # Fetch parks
        parks = await fetch_parks(client, NPS_API_KEY)

        if not parks:
            logger.error("No parks were fetched")
            sys.exit(1)

        # Save raw data
        raw_path = RAW_DIR / "nps_parks_raw.json"
        with open(raw_path, 'w') as f:
            json.dump(parks, f, indent=2)
        logger.info(f"Saved raw data to {raw_path}")

    # Process
    locations = process_parks(parks)

    # Validate
    valid_locations, invalid_locations = validate_locations(locations)
    logger.info(f"Valid locations: {len(valid_locations)}, Invalid: {len(invalid_locations)}")

    # Save
    output_path = save_output(valid_locations)

    logger.info(f"NPS API fetch complete. Output: {output_path}")
    return valid_locations


def generate_sample_data() -> list[dict]:
    """Generate sample NPS location data for testing."""
    sample_locations = [
        {
            "id": "nps_gett",
            "source_id": "gett",
            "source": "nps",
            "name": "Gettysburg National Military Park",
            "alternate_names": ["Gettysburg Battlefield"],
            "type": "battlefield",
            "coordinates": {"lat": 39.8309, "lng": -77.2311},
            "state": "PA",
            "description": "The Battle of Gettysburg was fought July 1-3, 1863, in and around the town of Gettysburg, Pennsylvania. It was the battle with the largest number of casualties in the American Civil War.",
            "historical_significance": "Turning point of the Civil War. Site of Lincoln's Gettysburg Address.",
            "current_status": "National Park Service site",
            "nps_unit_code": "gett",
            "website_url": "https://www.nps.gov/gett/index.htm",
            "image_url": "https://www.nps.gov/common/uploads/structured_data/3C8197D2-1DD8-B71B-0B47E04E1E0F1F00.jpg"
        },
        {
            "id": "nps_fosu",
            "source_id": "fosu",
            "source": "nps",
            "name": "Fort Sumter and Fort Moultrie National Historical Park",
            "alternate_names": ["Fort Sumter"],
            "type": "fort",
            "coordinates": {"lat": 32.7522, "lng": -79.8745},
            "state": "SC",
            "description": "Fort Sumter is a sea fort in Charleston, South Carolina, notable for two battles of the American Civil War. It was where the first shots of the Civil War were fired on April 12, 1861.",
            "historical_significance": "Site where the Civil War began. First battle of the Civil War.",
            "current_status": "National Park Service site",
            "nps_unit_code": "fosu",
            "website_url": "https://www.nps.gov/fosu/index.htm",
            "image_url": "https://www.nps.gov/common/uploads/structured_data/3C86A6C6-1DD8-B71B-0BBEA149E6D6E553.jpg"
        },
        {
            "id": "nps_anti",
            "source_id": "anti",
            "source": "nps",
            "name": "Antietam National Battlefield",
            "alternate_names": ["Battle of Sharpsburg", "Antietam"],
            "type": "battlefield",
            "coordinates": {"lat": 39.4747, "lng": -77.7439},
            "state": "MD",
            "description": "The Battle of Antietam, or Battle of Sharpsburg, fought on September 17, 1862, was the first major battle in the Civil War to take place on Union soil. It is the bloodiest single-day battle in American history.",
            "historical_significance": "Bloodiest single-day battle in American history. Led to the Emancipation Proclamation.",
            "current_status": "National Park Service site",
            "nps_unit_code": "anti",
            "website_url": "https://www.nps.gov/anti/index.htm",
            "image_url": "https://www.nps.gov/common/uploads/structured_data/C96D2EB9-9904-8B55-DB37B32D22FCF5FC.jpg"
        },
        {
            "id": "nps_vick",
            "source_id": "vick",
            "source": "nps",
            "name": "Vicksburg National Military Park",
            "alternate_names": ["Vicksburg Battlefield"],
            "type": "battlefield",
            "coordinates": {"lat": 32.3463, "lng": -90.8499},
            "state": "MS",
            "description": "The Siege of Vicksburg was a decisive Union victory during the American Civil War that divided the Confederacy and cemented the reputation of Union General Ulysses S. Grant.",
            "historical_significance": "Key Union victory that gave control of the Mississippi River.",
            "current_status": "National Park Service site",
            "nps_unit_code": "vick",
            "website_url": "https://www.nps.gov/vick/index.htm",
            "image_url": "https://www.nps.gov/common/uploads/structured_data/3C79D5F3-1DD8-B71B-0B8A30E4A7A1A3B9.jpg"
        },
        {
            "id": "nps_apco",
            "source_id": "apco",
            "source": "nps",
            "name": "Appomattox Court House National Historical Park",
            "alternate_names": ["Appomattox"],
            "type": "landmark",
            "coordinates": {"lat": 37.3765, "lng": -78.7969},
            "state": "VA",
            "description": "On April 9, 1865, the surrender of the Army of Northern Virginia in the McLean House in the village of Appomattox Court House, Virginia signaled the end of the nation's largest war.",
            "historical_significance": "Site of Lee's surrender to Grant, effectively ending the Civil War.",
            "current_status": "National Park Service site",
            "nps_unit_code": "apco",
            "website_url": "https://www.nps.gov/apco/index.htm",
            "image_url": "https://www.nps.gov/common/uploads/structured_data/3C85C0E2-1DD8-B71B-0B8A90CA53A9D5B8.jpg"
        },
        {
            "id": "nps_mana",
            "source_id": "mana",
            "source": "nps",
            "name": "Manassas National Battlefield Park",
            "alternate_names": ["Bull Run", "First Battle of Bull Run", "Second Battle of Bull Run"],
            "type": "battlefield",
            "coordinates": {"lat": 38.8123, "lng": -77.5214},
            "state": "VA",
            "description": "On July 21, 1861, two armies clashed for the first time on the fields overlooking Bull Run. Heavy fighting swept away any hope of a quick war.",
            "historical_significance": "Site of First and Second Battles of Bull Run.",
            "current_status": "National Park Service site",
            "nps_unit_code": "mana",
            "website_url": "https://www.nps.gov/mana/index.htm",
            "image_url": "https://www.nps.gov/common/uploads/structured_data/3C85E7A7-1DD8-B71B-0BAF0E3D9B2C4CF0.jpg"
        },
        {
            "id": "nps_shil",
            "source_id": "shil",
            "source": "nps",
            "name": "Shiloh National Military Park",
            "alternate_names": ["Battle of Shiloh", "Battle of Pittsburg Landing"],
            "type": "battlefield",
            "coordinates": {"lat": 35.1490, "lng": -88.3239},
            "state": "TN",
            "description": "The Battle of Shiloh, fought April 6-7, 1862, was a crucial victory for the Union Army.",
            "historical_significance": "Major Union victory in the Western Theater.",
            "current_status": "National Park Service site",
            "nps_unit_code": "shil",
            "website_url": "https://www.nps.gov/shil/index.htm",
            "image_url": "https://www.nps.gov/common/uploads/structured_data/3C842F08-1DD8-B71B-0BD9467C66FDE0B3.jpg"
        },
        {
            "id": "nps_chch",
            "source_id": "chch",
            "source": "nps",
            "name": "Chickamauga and Chattanooga National Military Park",
            "alternate_names": ["Chickamauga", "Chattanooga"],
            "type": "battlefield",
            "coordinates": {"lat": 34.9418, "lng": -85.2595},
            "state": "GA",
            "description": "America's first and largest military park, Chickamauga and Chattanooga National Military Park preserves the sites of two major Civil War battles.",
            "historical_significance": "Site of the Battle of Chickamauga, the second deadliest battle of the Civil War.",
            "current_status": "National Park Service site",
            "nps_unit_code": "chch",
            "website_url": "https://www.nps.gov/chch/index.htm",
            "image_url": "https://www.nps.gov/common/uploads/structured_data/3C7C0682-1DD8-B71B-0B3C61D279EF8C7D.jpg"
        },
    ]

    return sample_locations


if __name__ == "__main__":
    asyncio.run(main())
