#!/usr/bin/env python3
"""
Wikipedia Scraper

Scrapes Civil War general lists from Wikipedia.
Sources:
  - https://en.wikipedia.org/wiki/List_of_American_Civil_War_generals_(Union)
  - https://en.wikipedia.org/wiki/List_of_American_Civil_War_generals_(Confederate)

Output: /processed/people_wikipedia.json
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
from bs4 import BeautifulSoup
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

# Wikipedia URLs
UNION_GENERALS_URL = "https://en.wikipedia.org/wiki/List_of_American_Civil_War_generals_(Union)"
CONFEDERATE_GENERALS_URL = "https://en.wikipedia.org/wiki/List_of_American_Civil_War_generals_(Confederate)"

# Wikipedia API for additional data
WIKIPEDIA_API_BASE = "https://en.wikipedia.org/w/api.php"


async def fetch_html(client: httpx.AsyncClient, url: str) -> Optional[str]:
    """Fetch HTML content from URL."""
    try:
        logger.info(f"Fetching: {url}")
        headers = {
            "User-Agent": "CivilWarMapBot/1.0 (educational project; contact@example.com)"
        }
        response = await client.get(url, headers=headers, timeout=30.0, follow_redirects=True)
        response.raise_for_status()
        return response.text
    except httpx.HTTPError as e:
        logger.error(f"HTTP error fetching {url}: {e}")
        return None


def parse_date(date_str: str) -> Optional[str]:
    """Parse date string from Wikipedia to ISO format."""
    if not date_str:
        return None

    # Clean up the string
    date_str = re.sub(r'\[.*?\]', '', date_str)  # Remove citations
    date_str = date_str.strip()

    # Common date formats
    formats = [
        "%B %d, %Y",     # January 1, 1820
        "%d %B %Y",      # 1 January 1820
        "%B %Y",         # January 1820
        "%Y",            # 1820
    ]

    for fmt in formats:
        try:
            dt = datetime.strptime(date_str, fmt)
            return dt.strftime("%Y-%m-%d") if "%d" in fmt else dt.strftime("%Y-%m-01")
        except ValueError:
            continue

    # Try to extract year
    year_match = re.search(r'\b(18\d{2}|19\d{2})\b', date_str)
    if year_match:
        return f"{year_match.group(1)}-01-01"

    return None


def extract_generals_from_table(soup: BeautifulSoup, side: str) -> list[dict]:
    """Extract generals from Wikipedia table."""
    generals = []

    # Find all tables with class 'wikitable'
    tables = soup.find_all('table', class_='wikitable')

    for table in tables:
        rows = table.find_all('tr')

        # Skip header row
        for row in rows[1:]:
            cells = row.find_all(['td', 'th'])
            if len(cells) < 2:
                continue

            try:
                # Extract name from first cell
                name_cell = cells[0]
                name_link = name_cell.find('a')
                if name_link:
                    name = name_link.get_text(strip=True)
                    wikipedia_url = f"https://en.wikipedia.org{name_link.get('href', '')}"
                else:
                    name = name_cell.get_text(strip=True)
                    wikipedia_url = None

                if not name or name.startswith('['):
                    continue

                # Clean up name
                name = re.sub(r'\[.*?\]', '', name).strip()

                # Try to extract rank and dates from other cells
                rank = None
                birth_date = None
                death_date = None

                # Look for dates in cells
                for cell in cells[1:]:
                    text = cell.get_text(strip=True)

                    # Check for rank keywords
                    if any(r in text.lower() for r in ['brigadier', 'major general', 'lieutenant general', 'general']):
                        rank = text

                    # Check for date patterns
                    date_matches = re.findall(r'\b(18\d{2})\b', text)
                    if len(date_matches) >= 2:
                        birth_date = f"{date_matches[0]}-01-01"
                        death_date = f"{date_matches[1]}-01-01"
                    elif len(date_matches) == 1:
                        # Could be birth or death, try to determine
                        if birth_date is None:
                            birth_date = f"{date_matches[0]}-01-01"

                # Determine rank if not found
                if not rank:
                    for cell in cells:
                        text = cell.get_text(strip=True).lower()
                        if 'major general' in text or 'maj. gen.' in text:
                            rank = "Major General"
                            break
                        elif 'brigadier general' in text or 'brig. gen.' in text:
                            rank = "Brigadier General"
                            break
                        elif 'lieutenant general' in text or 'lt. gen.' in text:
                            rank = "Lieutenant General"
                            break
                        elif 'general' in text:
                            rank = "General"

                # Create person entry
                person_id = re.sub(r'[^a-zA-Z0-9]', '_', name.lower())
                person = {
                    "id": f"wiki_{side}_{person_id}",
                    "source_id": person_id,
                    "source": "wikipedia",
                    "name": name,
                    "first_name": name.split()[0] if ' ' in name else None,
                    "last_name": name.split()[-1] if ' ' in name else None,
                    "alternate_names": [],
                    "birth_date": birth_date,
                    "birth_place": None,
                    "death_date": death_date,
                    "death_place": None,
                    "side": side,
                    "rank": rank or "Brigadier General",
                    "highest_rank": rank or "Brigadier General",
                    "rank_date": None,
                    "branch": "army",
                    "role": "general",
                    "biography": None,
                    "commands": [],
                    "battles": [],
                    "image_url": None,
                    "wikipedia_url": wikipedia_url,
                    "wikidata_id": None,
                    "west_point_class": None
                }

                generals.append(person)

            except Exception as e:
                logger.warning(f"Error parsing row: {e}")
                continue

    return generals


def extract_generals_from_lists(soup: BeautifulSoup, side: str) -> list[dict]:
    """Extract generals from unordered lists (alternative parsing)."""
    generals = []

    # Find content div
    content = soup.find('div', {'id': 'mw-content-text'})
    if not content:
        return generals

    # Find all list items
    list_items = content.find_all('li')

    for item in list_items:
        link = item.find('a')
        if not link:
            continue

        name = link.get_text(strip=True)
        href = link.get('href', '')

        # Skip navigation links and non-person links
        if not href.startswith('/wiki/') or ':' in href:
            continue

        # Skip if name looks like a category
        if any(skip in name.lower() for skip in ['list of', 'category', 'see also', 'references']):
            continue

        # Clean up name
        name = re.sub(r'\[.*?\]', '', name).strip()

        if not name or len(name) < 3:
            continue

        wikipedia_url = f"https://en.wikipedia.org{href}"

        # Try to extract dates from surrounding text
        text = item.get_text(strip=True)
        date_matches = re.findall(r'\b(18\d{2})\b', text)

        birth_date = None
        death_date = None
        if len(date_matches) >= 2:
            birth_date = f"{date_matches[0]}-01-01"
            death_date = f"{date_matches[1]}-01-01"

        person_id = re.sub(r'[^a-zA-Z0-9]', '_', name.lower())
        person = {
            "id": f"wiki_{side}_{person_id}",
            "source_id": person_id,
            "source": "wikipedia",
            "name": name,
            "first_name": name.split()[0] if ' ' in name else None,
            "last_name": name.split()[-1] if ' ' in name else None,
            "alternate_names": [],
            "birth_date": birth_date,
            "birth_place": None,
            "death_date": death_date,
            "death_place": None,
            "side": side,
            "rank": "Brigadier General",
            "highest_rank": "Brigadier General",
            "rank_date": None,
            "branch": "army",
            "role": "general",
            "biography": None,
            "commands": [],
            "battles": [],
            "image_url": None,
            "wikipedia_url": wikipedia_url,
            "wikidata_id": None,
            "west_point_class": None
        }

        generals.append(person)

    return generals


async def scrape_generals(client: httpx.AsyncClient, url: str, side: str) -> list[dict]:
    """Scrape general list from Wikipedia."""
    html = await fetch_html(client, url)
    if not html:
        return []

    soup = BeautifulSoup(html, 'lxml')

    # Try table parsing first
    generals = extract_generals_from_table(soup, side)

    # If no results, try list parsing
    if not generals:
        generals = extract_generals_from_lists(soup, side)

    # Deduplicate by name
    seen_names = set()
    unique_generals = []
    for general in generals:
        if general['name'] not in seen_names:
            seen_names.add(general['name'])
            unique_generals.append(general)

    logger.info(f"Scraped {len(unique_generals)} {side} generals from Wikipedia")
    return unique_generals


def validate_people(people: list[dict]) -> tuple[list[dict], list[dict]]:
    """Validate people against JSON schema."""
    schema_path = SCHEMAS_DIR / "person.schema.json"
    with open(schema_path) as f:
        schema = json.load(f)

    valid_people = []
    invalid_people = []

    for person in people:
        try:
            validate(instance=person, schema=schema)
            valid_people.append(person)
        except ValidationError as e:
            logger.warning(f"Validation error for {person.get('name')}: {e.message}")
            invalid_people.append({'person': person, 'error': str(e.message)})

    return valid_people, invalid_people


def save_output(people: list[dict], filename: str = "people_wikipedia.json"):
    """Save processed people to JSON file."""
    output_path = PROCESSED_DIR / filename
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    with open(output_path, 'w') as f:
        json.dump(people, f, indent=2, default=str)

    logger.info(f"Saved {len(people)} people to {output_path}")
    return output_path


async def main():
    """Main entry point."""
    logger.info("Starting Wikipedia scraper...")

    # Ensure directories exist
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    all_generals = []

    try:
        async with httpx.AsyncClient() as client:
            # Scrape Union generals
            union_generals = await scrape_generals(client, UNION_GENERALS_URL, "union")
            all_generals.extend(union_generals)

            # Rate limiting
            await asyncio.sleep(1)

            # Scrape Confederate generals
            confederate_generals = await scrape_generals(client, CONFEDERATE_GENERALS_URL, "confederate")
            all_generals.extend(confederate_generals)

    except Exception as e:
        logger.error(f"Error during scraping: {e}")
        logger.info("Generating sample data instead...")
        all_generals = generate_sample_data()

    if not all_generals:
        logger.warning("No generals scraped, generating sample data...")
        all_generals = generate_sample_data()

    # Validate
    valid_people, invalid_people = validate_people(all_generals)
    logger.info(f"Valid: {len(valid_people)}, Invalid: {len(invalid_people)}")

    # Save
    output_path = save_output(valid_people)

    logger.info(f"Wikipedia scraper complete. Output: {output_path}")
    return valid_people


def generate_sample_data() -> list[dict]:
    """Generate sample data for testing."""
    sample_generals = [
        # Union Generals
        {
            "id": "wiki_union_ulysses_s_grant",
            "source_id": "ulysses_s_grant",
            "source": "wikipedia",
            "name": "Ulysses S. Grant",
            "first_name": "Ulysses",
            "last_name": "Grant",
            "alternate_names": ["Hiram Ulysses Grant"],
            "birth_date": "1822-04-27",
            "birth_place": "Point Pleasant, Ohio",
            "death_date": "1885-07-23",
            "death_place": "Mount McGregor, New York",
            "side": "union",
            "rank": "Lieutenant General",
            "highest_rank": "General of the Army",
            "branch": "army",
            "role": "general",
            "biography": "18th President of the United States and Commanding General of the Union Army during the Civil War.",
            "commands": [{"unit": "Army of the Potomac", "start_date": "1864-03-09"}],
            "battles": ["Vicksburg", "Shiloh", "Chattanooga", "Wilderness", "Appomattox"],
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Ulysses_Grant_1870-1880.jpg/440px-Ulysses_Grant_1870-1880.jpg",
            "wikipedia_url": "https://en.wikipedia.org/wiki/Ulysses_S._Grant",
            "wikidata_id": "Q23",
            "west_point_class": 1843
        },
        {
            "id": "wiki_union_william_t_sherman",
            "source_id": "william_t_sherman",
            "source": "wikipedia",
            "name": "William Tecumseh Sherman",
            "first_name": "William",
            "last_name": "Sherman",
            "alternate_names": ["Cump"],
            "birth_date": "1820-02-08",
            "birth_place": "Lancaster, Ohio",
            "death_date": "1891-02-14",
            "death_place": "New York City, New York",
            "side": "union",
            "rank": "Major General",
            "highest_rank": "General of the Army",
            "branch": "army",
            "role": "general",
            "biography": "Famous for his March to the Sea and scorched earth tactics.",
            "commands": [{"unit": "Military Division of the Mississippi"}],
            "battles": ["Shiloh", "Vicksburg", "Atlanta", "March to the Sea"],
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/William_T._Sherman_by_Mathew_Brady.jpg/440px-William_T._Sherman_by_Mathew_Brady.jpg",
            "wikipedia_url": "https://en.wikipedia.org/wiki/William_Tecumseh_Sherman",
            "wikidata_id": "Q188628",
            "west_point_class": 1840
        },
        {
            "id": "wiki_union_george_meade",
            "source_id": "george_meade",
            "source": "wikipedia",
            "name": "George G. Meade",
            "first_name": "George",
            "last_name": "Meade",
            "alternate_names": ["George Gordon Meade"],
            "birth_date": "1815-12-31",
            "birth_place": "Cadiz, Spain",
            "death_date": "1872-11-06",
            "death_place": "Philadelphia, Pennsylvania",
            "side": "union",
            "rank": "Major General",
            "highest_rank": "Major General",
            "branch": "army",
            "role": "general",
            "biography": "Commander of the Army of the Potomac at Gettysburg.",
            "commands": [{"unit": "Army of the Potomac", "start_date": "1863-06-28"}],
            "battles": ["Gettysburg", "Wilderness", "Petersburg"],
            "wikipedia_url": "https://en.wikipedia.org/wiki/George_Meade",
            "west_point_class": 1835
        },
        {
            "id": "wiki_union_philip_sheridan",
            "source_id": "philip_sheridan",
            "source": "wikipedia",
            "name": "Philip Sheridan",
            "first_name": "Philip",
            "last_name": "Sheridan",
            "alternate_names": ["Little Phil"],
            "birth_date": "1831-03-06",
            "birth_place": "Albany, New York",
            "death_date": "1888-08-05",
            "death_place": "Nonquitt, Massachusetts",
            "side": "union",
            "rank": "Major General",
            "highest_rank": "General of the Army",
            "branch": "army",
            "role": "general",
            "biography": "Commander of the Army of the Shenandoah and cavalry commander.",
            "battles": ["Shenandoah Valley", "Five Forks", "Appomattox"],
            "wikipedia_url": "https://en.wikipedia.org/wiki/Philip_Sheridan",
            "west_point_class": 1853
        },
        {
            "id": "wiki_union_george_mcclellan",
            "source_id": "george_mcclellan",
            "source": "wikipedia",
            "name": "George B. McClellan",
            "first_name": "George",
            "last_name": "McClellan",
            "alternate_names": ["Little Mac", "Young Napoleon"],
            "birth_date": "1826-12-03",
            "birth_place": "Philadelphia, Pennsylvania",
            "death_date": "1885-10-29",
            "death_place": "Orange, New Jersey",
            "side": "union",
            "rank": "Major General",
            "highest_rank": "Major General",
            "branch": "army",
            "role": "general",
            "biography": "First commander of the Army of the Potomac. Later ran for President against Lincoln.",
            "battles": ["Antietam", "Peninsula Campaign", "Seven Days"],
            "wikipedia_url": "https://en.wikipedia.org/wiki/George_B._McClellan",
            "west_point_class": 1846
        },
        # Confederate Generals
        {
            "id": "wiki_confederate_robert_e_lee",
            "source_id": "robert_e_lee",
            "source": "wikipedia",
            "name": "Robert E. Lee",
            "first_name": "Robert",
            "last_name": "Lee",
            "alternate_names": ["Marse Robert", "Bobby Lee"],
            "birth_date": "1807-01-19",
            "birth_place": "Stratford Hall, Virginia",
            "death_date": "1870-10-12",
            "death_place": "Lexington, Virginia",
            "side": "confederate",
            "rank": "General",
            "highest_rank": "General",
            "branch": "army",
            "role": "general",
            "biography": "Commander of the Army of Northern Virginia and later all Confederate armies.",
            "commands": [{"unit": "Army of Northern Virginia", "start_date": "1862-06-01"}],
            "battles": ["Antietam", "Fredericksburg", "Chancellorsville", "Gettysburg", "Appomattox"],
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Robert_E_Lee.jpg/440px-Robert_E_Lee.jpg",
            "wikipedia_url": "https://en.wikipedia.org/wiki/Robert_E._Lee",
            "wikidata_id": "Q165557",
            "west_point_class": 1829
        },
        {
            "id": "wiki_confederate_stonewall_jackson",
            "source_id": "stonewall_jackson",
            "source": "wikipedia",
            "name": "Thomas J. \"Stonewall\" Jackson",
            "first_name": "Thomas",
            "last_name": "Jackson",
            "alternate_names": ["Stonewall Jackson", "Old Jack"],
            "birth_date": "1824-01-21",
            "birth_place": "Clarksburg, Virginia",
            "death_date": "1863-05-10",
            "death_place": "Guinea Station, Virginia",
            "side": "confederate",
            "rank": "Lieutenant General",
            "highest_rank": "Lieutenant General",
            "branch": "army",
            "role": "general",
            "biography": "One of the most capable Confederate commanders. Mortally wounded by friendly fire at Chancellorsville.",
            "battles": ["First Bull Run", "Shenandoah Valley", "Seven Days", "Chancellorsville"],
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Stonewall_Jackson_by_Routzahn%2C_1862.jpg/440px-Stonewall_Jackson_by_Routzahn%2C_1862.jpg",
            "wikipedia_url": "https://en.wikipedia.org/wiki/Stonewall_Jackson",
            "west_point_class": 1846
        },
        {
            "id": "wiki_confederate_james_longstreet",
            "source_id": "james_longstreet",
            "source": "wikipedia",
            "name": "James Longstreet",
            "first_name": "James",
            "last_name": "Longstreet",
            "alternate_names": ["Old Pete"],
            "birth_date": "1821-01-08",
            "birth_place": "Edgefield District, South Carolina",
            "death_date": "1904-01-02",
            "death_place": "Gainesville, Georgia",
            "side": "confederate",
            "rank": "Lieutenant General",
            "highest_rank": "Lieutenant General",
            "branch": "army",
            "role": "general",
            "biography": "Lee's 'Old War Horse' and commander of the First Corps.",
            "battles": ["Seven Days", "Second Bull Run", "Antietam", "Gettysburg", "Chickamauga"],
            "wikipedia_url": "https://en.wikipedia.org/wiki/James_Longstreet",
            "west_point_class": 1842
        },
        {
            "id": "wiki_confederate_jeb_stuart",
            "source_id": "jeb_stuart",
            "source": "wikipedia",
            "name": "J.E.B. Stuart",
            "first_name": "James",
            "last_name": "Stuart",
            "alternate_names": ["Jeb Stuart", "James Ewell Brown Stuart"],
            "birth_date": "1833-02-06",
            "birth_place": "Patrick County, Virginia",
            "death_date": "1864-05-12",
            "death_place": "Richmond, Virginia",
            "side": "confederate",
            "rank": "Major General",
            "highest_rank": "Major General",
            "branch": "army",
            "role": "general",
            "biography": "Famous cavalry commander known for his bold raids.",
            "battles": ["First Bull Run", "Peninsula Campaign", "Antietam", "Gettysburg", "Yellow Tavern"],
            "wikipedia_url": "https://en.wikipedia.org/wiki/J._E._B._Stuart",
            "west_point_class": 1854
        },
        {
            "id": "wiki_confederate_braxton_bragg",
            "source_id": "braxton_bragg",
            "source": "wikipedia",
            "name": "Braxton Bragg",
            "first_name": "Braxton",
            "last_name": "Bragg",
            "alternate_names": [],
            "birth_date": "1817-03-22",
            "birth_place": "Warrenton, North Carolina",
            "death_date": "1876-09-27",
            "death_place": "Galveston, Texas",
            "side": "confederate",
            "rank": "General",
            "highest_rank": "General",
            "branch": "army",
            "role": "general",
            "biography": "Commander of the Army of Tennessee.",
            "battles": ["Shiloh", "Perryville", "Stones River", "Chickamauga", "Chattanooga"],
            "wikipedia_url": "https://en.wikipedia.org/wiki/Braxton_Bragg",
            "west_point_class": 1837
        },
    ]

    return sample_generals


if __name__ == "__main__":
    asyncio.run(main())
