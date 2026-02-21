#!/usr/bin/env python3
"""
Run All Import Scripts

Executes all data import scripts in sequence and generates a summary report.
This is the main entry point for populating the /processed directory with
Civil War data from all sources.

Usage:
    python run_all.py [--skip-api]

Options:
    --skip-api    Skip scripts that require API keys (NPS)
"""

import argparse
import asyncio
import json
import logging
import sys
from datetime import datetime
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Paths
BASE_DIR = Path(__file__).parent
PROCESSED_DIR = BASE_DIR / "processed"


async def run_acw_importer():
    """Run ACW battle data importer."""
    logger.info("=" * 60)
    logger.info("Running ACW Battle Data Importer...")
    logger.info("=" * 60)
    try:
        from scripts.acw_battle_importer import main
        result = await main()
        return {"name": "ACW Battle Data", "status": "success", "records": len(result)}
    except Exception as e:
        logger.error(f"ACW importer failed: {e}")
        return {"name": "ACW Battle Data", "status": "failed", "error": str(e)}


async def run_nps_fetcher():
    """Run NPS API fetcher."""
    logger.info("=" * 60)
    logger.info("Running NPS API Fetcher...")
    logger.info("=" * 60)
    try:
        from scripts.nps_api_fetcher import main
        result = await main()
        return {"name": "NPS API", "status": "success", "records": len(result)}
    except Exception as e:
        logger.error(f"NPS fetcher failed: {e}")
        return {"name": "NPS API", "status": "failed", "error": str(e)}


async def run_wikidata_fetcher():
    """Run Wikidata SPARQL fetcher."""
    logger.info("=" * 60)
    logger.info("Running Wikidata SPARQL Fetcher...")
    logger.info("=" * 60)
    try:
        from scripts.wikidata_sparql_fetcher import main
        await main()
        # Count output files
        events_count = 0
        people_count = 0
        locations_count = 0

        events_file = PROCESSED_DIR / "events_wikidata.json"
        if events_file.exists():
            with open(events_file) as f:
                events_count = len(json.load(f))

        people_file = PROCESSED_DIR / "people_wikidata.json"
        if people_file.exists():
            with open(people_file) as f:
                people_count = len(json.load(f))

        locations_file = PROCESSED_DIR / "locations_wikidata.json"
        if locations_file.exists():
            with open(locations_file) as f:
                locations_count = len(json.load(f))

        return {
            "name": "Wikidata SPARQL",
            "status": "success",
            "records": {
                "events": events_count,
                "people": people_count,
                "locations": locations_count
            }
        }
    except Exception as e:
        logger.error(f"Wikidata fetcher failed: {e}")
        return {"name": "Wikidata SPARQL", "status": "failed", "error": str(e)}


async def run_wikipedia_scraper():
    """Run Wikipedia scraper."""
    logger.info("=" * 60)
    logger.info("Running Wikipedia Scraper...")
    logger.info("=" * 60)
    try:
        from scripts.wikipedia_scraper import main
        result = await main()
        return {"name": "Wikipedia", "status": "success", "records": len(result)}
    except Exception as e:
        logger.error(f"Wikipedia scraper failed: {e}")
        return {"name": "Wikipedia", "status": "failed", "error": str(e)}


async def run_boundary_importer():
    """Run boundary importer."""
    logger.info("=" * 60)
    logger.info("Running Boundary Importer...")
    logger.info("=" * 60)
    try:
        from scripts.boundary_importer import main
        result = await main()
        return {"name": "Boundaries", "status": "success", "records": len(result)}
    except Exception as e:
        logger.error(f"Boundary importer failed: {e}")
        return {"name": "Boundaries", "status": "failed", "error": str(e)}


def generate_summary(results: list[dict]) -> dict:
    """Generate import summary."""
    summary = {
        "timestamp": datetime.now().isoformat(),
        "results": results,
        "total_successful": sum(1 for r in results if r["status"] == "success"),
        "total_failed": sum(1 for r in results if r["status"] == "failed"),
        "files_generated": []
    }

    # List generated files
    if PROCESSED_DIR.exists():
        for file in PROCESSED_DIR.glob("*.json"):
            if file.name != "import_summary.json":
                with open(file) as f:
                    try:
                        data = json.load(f)
                        count = len(data) if isinstance(data, list) else 1
                    except Exception:
                        count = 0

                summary["files_generated"].append({
                    "file": file.name,
                    "records": count
                })

    return summary


async def main(skip_api: bool = False):
    """Main entry point."""
    logger.info("Starting Civil War Data Import Pipeline")
    logger.info(f"Timestamp: {datetime.now().isoformat()}")
    logger.info(f"Skip API: {skip_api}")

    # Ensure processed directory exists
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    results = []

    # Run importers
    results.append(await run_acw_importer())

    if not skip_api:
        results.append(await run_nps_fetcher())
    else:
        logger.info("Skipping NPS API fetcher (--skip-api flag set)")
        results.append({"name": "NPS API", "status": "skipped"})

    results.append(await run_wikidata_fetcher())
    results.append(await run_wikipedia_scraper())
    results.append(await run_boundary_importer())

    # Generate summary
    summary = generate_summary(results)

    # Save summary
    summary_path = PROCESSED_DIR / "import_summary.json"
    with open(summary_path, 'w') as f:
        json.dump(summary, f, indent=2)

    # Print summary
    logger.info("=" * 60)
    logger.info("IMPORT SUMMARY")
    logger.info("=" * 60)
    logger.info(f"Successful: {summary['total_successful']}")
    logger.info(f"Failed: {summary['total_failed']}")
    logger.info("")
    logger.info("Files generated:")
    for file_info in summary["files_generated"]:
        logger.info(f"  - {file_info['file']}: {file_info['records']} records")

    logger.info("")
    logger.info(f"Summary saved to: {summary_path}")

    return summary


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run all Civil War data import scripts")
    parser.add_argument("--skip-api", action="store_true", help="Skip scripts requiring API keys")

    args = parser.parse_args()

    asyncio.run(main(skip_api=args.skip_api))
