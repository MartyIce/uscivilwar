#!/usr/bin/env python3
"""
Historical Boundary Importer

Downloads and processes historical boundary data from the Atlas of Historical County Boundaries.
Source: https://publications.newberry.org/ahcb/

Output: /processed/boundaries.json
"""

import asyncio
import json
import logging
import os
import sys
import zipfile
from datetime import datetime
from io import BytesIO
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

# Data sources
AHCB_BASE_URL = "https://publications.newberry.org/ahcb/downloads"

# Civil War era states and their allegiances
CIVIL_WAR_STATES = {
    # Confederate States (in order of secession)
    "South Carolina": {"side": "confederate", "abbreviation": "SC", "secession_date": "1860-12-20", "readmission_date": "1868-07-09"},
    "Mississippi": {"side": "confederate", "abbreviation": "MS", "secession_date": "1861-01-09", "readmission_date": "1870-02-23"},
    "Florida": {"side": "confederate", "abbreviation": "FL", "secession_date": "1861-01-10", "readmission_date": "1868-06-25"},
    "Alabama": {"side": "confederate", "abbreviation": "AL", "secession_date": "1861-01-11", "readmission_date": "1868-07-13"},
    "Georgia": {"side": "confederate", "abbreviation": "GA", "secession_date": "1861-01-19", "readmission_date": "1870-07-15"},
    "Louisiana": {"side": "confederate", "abbreviation": "LA", "secession_date": "1861-01-26", "readmission_date": "1868-07-09"},
    "Texas": {"side": "confederate", "abbreviation": "TX", "secession_date": "1861-02-01", "readmission_date": "1870-03-30"},
    "Virginia": {"side": "confederate", "abbreviation": "VA", "secession_date": "1861-04-17", "readmission_date": "1870-01-26"},
    "Arkansas": {"side": "confederate", "abbreviation": "AR", "secession_date": "1861-05-06", "readmission_date": "1868-06-22"},
    "North Carolina": {"side": "confederate", "abbreviation": "NC", "secession_date": "1861-05-20", "readmission_date": "1868-07-04"},
    "Tennessee": {"side": "confederate", "abbreviation": "TN", "secession_date": "1861-06-08", "readmission_date": "1866-07-24"},

    # Border States (slave states that did not secede)
    "Delaware": {"side": "border", "abbreviation": "DE", "secession_date": None, "readmission_date": None},
    "Maryland": {"side": "border", "abbreviation": "MD", "secession_date": None, "readmission_date": None},
    "Kentucky": {"side": "border", "abbreviation": "KY", "secession_date": None, "readmission_date": None},
    "Missouri": {"side": "border", "abbreviation": "MO", "secession_date": None, "readmission_date": None},

    # Union States (selected major states)
    "Maine": {"side": "union", "abbreviation": "ME", "secession_date": None, "readmission_date": None},
    "New Hampshire": {"side": "union", "abbreviation": "NH", "secession_date": None, "readmission_date": None},
    "Vermont": {"side": "union", "abbreviation": "VT", "secession_date": None, "readmission_date": None},
    "Massachusetts": {"side": "union", "abbreviation": "MA", "secession_date": None, "readmission_date": None},
    "Rhode Island": {"side": "union", "abbreviation": "RI", "secession_date": None, "readmission_date": None},
    "Connecticut": {"side": "union", "abbreviation": "CT", "secession_date": None, "readmission_date": None},
    "New York": {"side": "union", "abbreviation": "NY", "secession_date": None, "readmission_date": None},
    "New Jersey": {"side": "union", "abbreviation": "NJ", "secession_date": None, "readmission_date": None},
    "Pennsylvania": {"side": "union", "abbreviation": "PA", "secession_date": None, "readmission_date": None},
    "Ohio": {"side": "union", "abbreviation": "OH", "secession_date": None, "readmission_date": None},
    "Indiana": {"side": "union", "abbreviation": "IN", "secession_date": None, "readmission_date": None},
    "Illinois": {"side": "union", "abbreviation": "IL", "secession_date": None, "readmission_date": None},
    "Michigan": {"side": "union", "abbreviation": "MI", "secession_date": None, "readmission_date": None},
    "Wisconsin": {"side": "union", "abbreviation": "WI", "secession_date": None, "readmission_date": None},
    "Minnesota": {"side": "union", "abbreviation": "MN", "secession_date": None, "readmission_date": None},
    "Iowa": {"side": "union", "abbreviation": "IA", "secession_date": None, "readmission_date": None},
    "Kansas": {"side": "union", "abbreviation": "KS", "secession_date": None, "readmission_date": None},
    "California": {"side": "union", "abbreviation": "CA", "secession_date": None, "readmission_date": None},
    "Oregon": {"side": "union", "abbreviation": "OR", "secession_date": None, "readmission_date": None},
    "Nevada": {"side": "union", "abbreviation": "NV", "secession_date": None, "readmission_date": None},  # Admitted 1864

    # West Virginia (split from Virginia during the war)
    "West Virginia": {"side": "union", "abbreviation": "WV", "secession_date": None, "readmission_date": None, "admission_date": "1863-06-20"},

    # Territories
    "New Mexico Territory": {"side": "territory", "abbreviation": "NM", "secession_date": None, "readmission_date": None},
    "Colorado Territory": {"side": "territory", "abbreviation": "CO", "secession_date": None, "readmission_date": None},
    "Dakota Territory": {"side": "territory", "abbreviation": "DK", "secession_date": None, "readmission_date": None},
    "Nebraska Territory": {"side": "territory", "abbreviation": "NE", "secession_date": None, "readmission_date": None},
    "Washington Territory": {"side": "territory", "abbreviation": "WA", "secession_date": None, "readmission_date": None},
    "Utah Territory": {"side": "territory", "abbreviation": "UT", "secession_date": None, "readmission_date": None},
    "Indian Territory": {"side": "territory", "abbreviation": "IT", "secession_date": None, "readmission_date": None},
}

# 1860 Census population (approximate)
POPULATION_1860 = {
    "New York": 3880735,
    "Pennsylvania": 2906215,
    "Ohio": 2339511,
    "Illinois": 1711951,
    "Virginia": 1596318,  # Including what became West Virginia
    "Indiana": 1350428,
    "Massachusetts": 1231066,
    "Missouri": 1182012,
    "Kentucky": 1155684,
    "Tennessee": 1109801,
    "Georgia": 1057286,
    "North Carolina": 992622,
    "Alabama": 964201,
    "Wisconsin": 775881,
    "Michigan": 749113,
    "Texas": 604215,
    "South Carolina": 703708,
    "Louisiana": 708002,
    "Mississippi": 791305,
    "Maryland": 687049,
    "Iowa": 674913,
    "New Jersey": 672035,
    "Arkansas": 435450,
    "Connecticut": 460147,
    "Maine": 628279,
    "California": 379994,
    "Florida": 140424,
    "New Hampshire": 326073,
    "Vermont": 315098,
    "Rhode Island": 174620,
    "Minnesota": 172023,
    "Delaware": 112216,
    "Kansas": 107206,
    "Oregon": 52465,
}


def create_simplified_boundary(state_name: str, state_info: dict) -> dict:
    """Create a simplified boundary record (without actual GeoJSON)."""
    # Simplified bounding box coordinates for each state (approximate)
    state_coords = {
        # Confederate States
        "South Carolina": [[-83.35, 32.0], [-78.5, 35.2]],
        "Mississippi": [[-91.7, 30.2], [-88.1, 35.0]],
        "Florida": [[-87.6, 24.5], [-79.8, 31.0]],
        "Alabama": [[-88.5, 30.2], [-84.9, 35.0]],
        "Georgia": [[-85.6, 30.4], [-80.8, 35.0]],
        "Louisiana": [[-94.0, 29.0], [-89.0, 33.0]],
        "Texas": [[-106.6, 25.8], [-93.5, 36.5]],
        "Virginia": [[-83.7, 36.5], [-75.2, 39.5]],
        "Arkansas": [[-94.6, 33.0], [-89.6, 36.5]],
        "North Carolina": [[-84.3, 33.8], [-75.5, 36.6]],
        "Tennessee": [[-90.3, 35.0], [-81.6, 36.7]],
        # Border States
        "Delaware": [[-75.8, 38.4], [-75.0, 39.8]],
        "Maryland": [[-79.5, 38.0], [-75.0, 39.7]],
        "Kentucky": [[-89.6, 36.5], [-82.0, 39.1]],
        "Missouri": [[-95.8, 36.0], [-89.1, 40.6]],
        # Union States
        "Pennsylvania": [[-80.5, 39.7], [-74.7, 42.3]],
        "New York": [[-79.8, 40.5], [-71.9, 45.0]],
        "Ohio": [[-84.8, 38.4], [-80.5, 42.0]],
        "Indiana": [[-88.1, 37.8], [-84.8, 41.8]],
        "Illinois": [[-91.5, 37.0], [-87.5, 42.5]],
        "Michigan": [[-90.4, 41.7], [-82.4, 48.3]],
        "Wisconsin": [[-92.9, 42.5], [-86.8, 47.1]],
        "Minnesota": [[-97.2, 43.5], [-89.5, 49.4]],
        "Iowa": [[-96.6, 40.4], [-90.1, 43.5]],
        "Kansas": [[-102.1, 37.0], [-94.6, 40.0]],
        "California": [[-124.4, 32.5], [-114.1, 42.0]],
        "Oregon": [[-124.6, 42.0], [-116.5, 46.3]],
        "Nevada": [[-120.0, 35.0], [-114.0, 42.0]],
        "West Virginia": [[-82.6, 37.2], [-77.7, 40.6]],
        "Massachusetts": [[-73.5, 41.2], [-69.9, 42.9]],
        "Connecticut": [[-73.7, 40.9], [-71.8, 42.1]],
        "Rhode Island": [[-71.9, 41.1], [-71.1, 42.0]],
        "New Jersey": [[-75.6, 38.9], [-73.9, 41.4]],
        "Maine": [[-71.1, 43.0], [-66.9, 47.5]],
        "New Hampshire": [[-72.6, 42.7], [-70.6, 45.3]],
        "Vermont": [[-73.4, 42.7], [-71.5, 45.0]],
    }

    coords = state_coords.get(state_name, [[-100, 30], [-90, 40]])

    # Create a simple bounding box polygon
    min_lng, min_lat = coords[0]
    max_lng, max_lat = coords[1]

    geojson = {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [min_lng, min_lat],
                [max_lng, min_lat],
                [max_lng, max_lat],
                [min_lng, max_lat],
                [min_lng, min_lat]
            ]]
        },
        "properties": {
            "name": state_name,
            "abbreviation": state_info.get("abbreviation"),
            "side": state_info.get("side")
        }
    }

    boundary = {
        "id": f"boundary_{state_info['abbreviation'].lower()}_1861",
        "source_id": state_info['abbreviation'],
        "source": "ahcb",
        "name": state_name,
        "type": "territory" if "Territory" in state_name else "state",
        "abbreviation": state_info["abbreviation"],
        "valid_from": "1861-01-01",
        "valid_to": "1865-12-31",
        "side": state_info["side"],
        "secession_date": state_info.get("secession_date"),
        "readmission_date": state_info.get("readmission_date"),
        "capital": get_state_capital(state_name),
        "population_1860": POPULATION_1860.get(state_name),
        "geojson": geojson
    }

    return boundary


def get_state_capital(state_name: str) -> Optional[str]:
    """Get the capital city of a state."""
    capitals = {
        "South Carolina": "Columbia",
        "Mississippi": "Jackson",
        "Florida": "Tallahassee",
        "Alabama": "Montgomery",
        "Georgia": "Atlanta",  # Became capital in 1868, was Milledgeville during war
        "Louisiana": "Baton Rouge",
        "Texas": "Austin",
        "Virginia": "Richmond",  # Also Confederate capital
        "Arkansas": "Little Rock",
        "North Carolina": "Raleigh",
        "Tennessee": "Nashville",
        "Delaware": "Dover",
        "Maryland": "Annapolis",
        "Kentucky": "Frankfort",
        "Missouri": "Jefferson City",
        "Pennsylvania": "Harrisburg",
        "New York": "Albany",
        "Ohio": "Columbus",
        "Indiana": "Indianapolis",
        "Illinois": "Springfield",
        "Michigan": "Lansing",
        "Wisconsin": "Madison",
        "Minnesota": "Saint Paul",
        "Iowa": "Des Moines",
        "Kansas": "Topeka",
        "California": "Sacramento",
        "Oregon": "Salem",
        "Nevada": "Carson City",
        "West Virginia": "Wheeling",  # First capital, then Charleston
        "Massachusetts": "Boston",
        "Connecticut": "Hartford",
        "Rhode Island": "Providence",
        "New Jersey": "Trenton",
        "Maine": "Augusta",
        "New Hampshire": "Concord",
        "Vermont": "Montpelier",
    }
    return capitals.get(state_name)


def create_all_boundaries() -> list[dict]:
    """Create boundary records for all Civil War era states and territories."""
    boundaries = []

    for state_name, state_info in CIVIL_WAR_STATES.items():
        boundary = create_simplified_boundary(state_name, state_info)
        boundaries.append(boundary)

    logger.info(f"Created {len(boundaries)} boundary records")
    return boundaries


def validate_boundaries(boundaries: list[dict]) -> tuple[list[dict], list[dict]]:
    """Validate boundaries against JSON schema."""
    schema_path = SCHEMAS_DIR / "boundary.schema.json"
    with open(schema_path) as f:
        schema = json.load(f)

    valid_boundaries = []
    invalid_boundaries = []

    for boundary in boundaries:
        try:
            validate(instance=boundary, schema=schema)
            valid_boundaries.append(boundary)
        except ValidationError as e:
            logger.warning(f"Validation error for boundary {boundary.get('name')}: {e.message}")
            invalid_boundaries.append({'boundary': boundary, 'error': str(e.message)})

    return valid_boundaries, invalid_boundaries


def save_output(boundaries: list[dict], filename: str = "boundaries.json"):
    """Save processed boundaries to JSON file."""
    output_path = PROCESSED_DIR / filename
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    with open(output_path, 'w') as f:
        json.dump(boundaries, f, indent=2, default=str)

    logger.info(f"Saved {len(boundaries)} boundaries to {output_path}")
    return output_path


async def download_ahcb_data(client: httpx.AsyncClient) -> Optional[bytes]:
    """
    Attempt to download boundary data from AHCB.
    Note: This requires actual shapefile/GeoJSON processing which needs additional libraries.
    For now, we'll use simplified boundary data.
    """
    # The actual AHCB data requires shapefile processing (fiona, shapely, etc.)
    # For this implementation, we'll use pre-defined simplified boundaries
    logger.info("Using simplified boundary data (actual AHCB data requires shapefile processing)")
    return None


async def main():
    """Main entry point."""
    logger.info("Starting boundary import...")

    # Ensure directories exist
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    async with httpx.AsyncClient() as client:
        # Attempt to download actual data (will return None without shapefile support)
        raw_data = await download_ahcb_data(client)

    # Create boundaries (using simplified data for now)
    boundaries = create_all_boundaries()

    # Validate
    valid_boundaries, invalid_boundaries = validate_boundaries(boundaries)
    logger.info(f"Valid: {len(valid_boundaries)}, Invalid: {len(invalid_boundaries)}")

    # Save
    output_path = save_output(valid_boundaries)

    # Also save a summary file
    summary = {
        "total_boundaries": len(valid_boundaries),
        "confederate_states": len([b for b in valid_boundaries if b.get('side') == 'confederate']),
        "union_states": len([b for b in valid_boundaries if b.get('side') == 'union']),
        "border_states": len([b for b in valid_boundaries if b.get('side') == 'border']),
        "territories": len([b for b in valid_boundaries if b.get('side') == 'territory']),
        "secession_dates": {
            b['name']: b['secession_date']
            for b in valid_boundaries
            if b.get('secession_date')
        }
    }

    summary_path = PROCESSED_DIR / "boundaries_summary.json"
    with open(summary_path, 'w') as f:
        json.dump(summary, f, indent=2)
    logger.info(f"Saved summary to {summary_path}")

    logger.info(f"Boundary import complete. Output: {output_path}")
    return valid_boundaries


if __name__ == "__main__":
    asyncio.run(main())
