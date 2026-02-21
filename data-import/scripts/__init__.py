"""
US Civil War Interactive Map - Data Import Scripts

This package contains scripts for importing Civil War data from various sources:

- acw_battle_importer.py: Import battles from jrnold/acw_battle_data GitHub
- nps_api_fetcher.py: Fetch Civil War sites from National Park Service API
- wikidata_sparql_fetcher.py: Query Wikidata for battles, people, and locations
- wikipedia_scraper.py: Scrape general lists from Wikipedia
- boundary_importer.py: Import historical state/territory boundaries

Usage:
    python -m scripts.acw_battle_importer
    python -m scripts.nps_api_fetcher
    python -m scripts.wikidata_sparql_fetcher
    python -m scripts.wikipedia_scraper
    python -m scripts.boundary_importer

Environment Variables:
    NPS_API_KEY: Required for nps_api_fetcher.py
                 Get a free key at https://www.nps.gov/subjects/developer/get-started.htm
"""

__version__ = "1.0.0"
