# US Civil War Interactive Map - Implementation Plan

## Executive Summary

This document provides a comprehensive implementation plan for an interactive US Civil War web application featuring an explorable map, timeline, battle/event details, and military statistics. The plan is structured for parallel development across four independent layers, each with clear interfaces and mock capabilities.

---

## 1. Data Sources and Import Strategy

### Primary Data Sources

| Source | URL | Data Type | Format | License |
|--------|-----|-----------|--------|---------|
| **ACW Battle Data** | [https://github.com/jrnold/acw_battle_data](https://github.com/jrnold/acw_battle_data) | Battles, casualties, forces, commanders | CSV/JSON | CC BY 4.0 |
| **ACW Battle Data (FigShare)** | [https://figshare.com/articles/dataset/acw_battle_data/1515995](https://figshare.com/articles/dataset/acw_battle_data/1515995) | Same as above, versioned releases | ZIP | CC BY 4.0 |
| **NPS API** | [https://developer.nps.gov/api/v1/](https://www.nps.gov/subjects/developer/api-documentation.htm) | Park sites, Civil War locations | JSON | Public |
| **Atlas of Historical County Boundaries** | [https://publications.newberry.org/ahcb/](https://publications.newberry.org/ahcb/downloads/united_states.html) | State/county boundaries 1790-present | Shapefile/GeoJSON | Public Domain |
| **Wikidata SPARQL** | [https://query.wikidata.org/](https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service) | People, battles, locations with coordinates | JSON | CC0 |
| **Wikipedia Lists** | [Union Generals](https://en.wikipedia.org/wiki/List_of_American_Civil_War_generals_(Union)), [Confederate Generals](https://en.wikipedia.org/wiki/List_of_American_Civil_War_generals_(Confederate)) | General officers | HTML tables | CC BY-SA |
| **OpenHistoricalMap** | [https://www.openhistoricalmap.org/](https://www.openhistoricalmap.org/) | Historical boundaries, fortifications | OSM format | ODbL |
| **Library of Congress Maps** | [https://www.loc.gov/maps/](https://www.loc.gov/maps/?dates=1860-1869) | Historical map images | TIFF/JPEG | Public Domain |

### Data Import Scripts Structure

```
/data-import/
  /scripts/
    acw_battle_importer.py      # Import from jrnold/acw_battle_data
    nps_api_fetcher.py          # Fetch from NPS API
    wikidata_sparql_fetcher.py  # Query Wikidata for people/locations
    wikipedia_scraper.py        # Scrape general lists from Wikipedia
    boundary_importer.py        # Import historical boundaries
  /raw/                         # Downloaded raw data
  /processed/                   # Normalized JSON ready for DB import
  /schemas/                     # JSON schemas for validation
```

### Example Wikidata SPARQL Query for Civil War Battles

```sparql
SELECT ?battle ?battleLabel ?date ?coord ?casualties WHERE {
  ?battle wdt:P31 wd:Q178561.           # instance of battle
  ?battle wdt:P361 wd:Q8676.            # part of American Civil War
  OPTIONAL { ?battle wdt:P585 ?date. }  # point in time
  OPTIONAL { ?battle wdt:P625 ?coord. } # coordinate location
  OPTIONAL { ?battle wdt:P1120 ?casualties. } # number of deaths
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
ORDER BY ?date
```

---

## 2. Technology Stack

### Backend
| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Language** | Python 3.11+ | Rich ecosystem for data processing, web APIs |
| **Web Framework** | FastAPI | Modern async support, automatic OpenAPI docs, type hints |
| **ORM** | SQLAlchemy 2.0 | Mature, flexible, excellent PostgreSQL support |
| **Database** | PostgreSQL 15+ with PostGIS | Spatial queries, GeoJSON support, robust |
| **Migrations** | Alembic | Standard for SQLAlchemy projects |
| **Validation** | Pydantic v2 | FastAPI integration, strict typing |

### Frontend
| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Framework** | React 18 with TypeScript | Type safety, large ecosystem |
| **Build Tool** | Vite | Fast HMR, modern bundling |
| **Mapping** | React-Leaflet + Leaflet | Open source, customizable, good docs |
| **State Management** | TanStack Query (React Query) | Server state caching, refetching |
| **UI Components** | Tailwind CSS + shadcn/ui | Rapid styling, accessible components |
| **Timeline** | vis-timeline or custom | Timeline visualization |

### Data Pipeline
| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Scripting** | Python | Consistency with backend |
| **HTTP Client** | httpx | Async support |
| **HTML Parsing** | BeautifulSoup4 | Wikipedia scraping |
| **Data Validation** | Pydantic | Schema validation |
| **Scheduling** | (optional) Celery or cron | Periodic data refresh |

---

## 3. Database Schema

### Entity Relationship Diagram (Conceptual)

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Person    │       │   Location  │       │    Event    │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │       │ id          │       │ id          │
│ name        │       │ name        │       │ name        │
│ birth_date  │       │ type        │       │ type        │
│ death_date  │       │ coordinates │       │ date_start  │
│ side        │       │ state       │       │ date_end    │
│ rank        │       │ description │       │ description │
│ biography   │       │ geojson     │       │ location_id │◄──┐
│ image_url   │       └─────────────┘       │ significance│   │
└─────────────┘              ▲              └─────────────┘   │
       │                     │                     │          │
       │                     │                     │          │
       ▼                     │                     ▼          │
┌─────────────────────┐      │         ┌─────────────────┐   │
│  PersonEventRole    │      │         │  EventCasualty  │   │
├─────────────────────┤      │         ├─────────────────┤   │
│ person_id           │      │         │ event_id        │   │
│ event_id            │      │         │ side            │   │
│ role                │      │         │ killed          │   │
└─────────────────────┘      │         │ wounded         │   │
                             │         │ captured        │   │
       ┌─────────────────────┘         │ missing         │   │
       │                               │ total_engaged   │   │
       ▼                               └─────────────────┘   │
┌─────────────┐                                              │
│MilitaryUnit │       ┌─────────────────────┐                │
├─────────────┤       │  UnitEventParticip  │                │
│ id          │       ├─────────────────────┤                │
│ name        │       │ unit_id             │                │
│ type        │       │ event_id            │────────────────┘
│ side        │       │ strength            │
│ parent_id   │◄──┐   │ role                │
│ formed_date │   │   └─────────────────────┘
│ disbanded   │   │
└─────────────┘   │
       │          │
       └──────────┘ (self-referential for hierarchy)

┌───────────────────┐
│ TerritoryBoundary │
├───────────────────┤
│ id                │
│ name              │
│ type              │ (state, territory, county)
│ valid_from        │
│ valid_to          │
│ geojson           │ (polygon geometry)
│ side              │ (union, confederate, border, territory)
└───────────────────┘
```

### SQL Schema Definition

```sql
-- Enum types
CREATE TYPE side_enum AS ENUM ('union', 'confederate', 'neutral', 'border');
CREATE TYPE event_type_enum AS ENUM ('battle', 'siege', 'raid', 'skirmish', 'treaty', 'election', 'proclamation', 'surrender');
CREATE TYPE location_type_enum AS ENUM ('city', 'battlefield', 'fort', 'river', 'landmark', 'capital');
CREATE TYPE unit_type_enum AS ENUM ('army', 'corps', 'division', 'brigade', 'regiment', 'battalion', 'company', 'navy_fleet', 'navy_ship');
CREATE TYPE person_role_enum AS ENUM ('commander', 'subordinate', 'participant', 'casualty', 'signatory');

-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Locations table
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type location_type_enum NOT NULL,
    coordinates GEOGRAPHY(POINT, 4326),
    state VARCHAR(100),
    description TEXT,
    geojson JSONB,
    external_id VARCHAR(100),  -- for linking to source data
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_locations_coordinates ON locations USING GIST(coordinates);
CREATE INDEX idx_locations_type ON locations(type);

-- People table
CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    death_date DATE,
    side side_enum,
    rank VARCHAR(100),
    highest_rank VARCHAR(100),
    biography TEXT,
    image_url VARCHAR(500),
    wikipedia_url VARCHAR(500),
    wikidata_id VARCHAR(50),
    external_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_people_side ON people(side);
CREATE INDEX idx_people_name ON people(name);

-- Events table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type event_type_enum NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE,
    description TEXT,
    location_id INTEGER REFERENCES locations(id),
    campaign VARCHAR(255),
    theater VARCHAR(100),
    result VARCHAR(100),  -- 'Union victory', 'Confederate victory', 'Inconclusive'
    significance INTEGER CHECK (significance BETWEEN 1 AND 5),
    cwsac_id VARCHAR(50),  -- Civil War Sites Advisory Commission ID
    wikipedia_url VARCHAR(500),
    image_url VARCHAR(500),
    external_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_events_date ON events(date_start);
CREATE INDEX idx_events_type ON events(type);
CREATE INDEX idx_events_location ON events(location_id);

-- Event casualties (per side)
CREATE TABLE event_casualties (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    side side_enum NOT NULL,
    killed INTEGER,
    wounded INTEGER,
    captured INTEGER,
    missing INTEGER,
    total_engaged INTEGER,
    UNIQUE(event_id, side)
);

-- Person-Event relationship (who participated in what)
CREATE TABLE person_event_roles (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES people(id) ON DELETE CASCADE,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    role person_role_enum NOT NULL,
    unit_commanded VARCHAR(255),
    notes TEXT,
    UNIQUE(person_id, event_id, role)
);

CREATE INDEX idx_person_event_person ON person_event_roles(person_id);
CREATE INDEX idx_person_event_event ON person_event_roles(event_id);

-- Military units table
CREATE TABLE military_units (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type unit_type_enum NOT NULL,
    side side_enum NOT NULL,
    parent_id INTEGER REFERENCES military_units(id),
    formed_date DATE,
    disbanded_date DATE,
    description TEXT,
    peak_strength INTEGER,
    external_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_units_side ON military_units(side);
CREATE INDEX idx_units_type ON military_units(type);
CREATE INDEX idx_units_parent ON military_units(parent_id);

-- Unit participation in events
CREATE TABLE unit_event_participation (
    id SERIAL PRIMARY KEY,
    unit_id INTEGER REFERENCES military_units(id) ON DELETE CASCADE,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    strength INTEGER,
    casualties INTEGER,
    role VARCHAR(100),  -- 'attacking', 'defending', 'reserve', etc.
    UNIQUE(unit_id, event_id)
);

-- Territory boundaries over time
CREATE TABLE territory_boundaries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,  -- 'state', 'territory', 'county'
    valid_from DATE NOT NULL,
    valid_to DATE,
    side side_enum,
    geojson JSONB NOT NULL,
    geometry GEOGRAPHY(MULTIPOLYGON, 4326),
    source VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_boundaries_dates ON territory_boundaries(valid_from, valid_to);
CREATE INDEX idx_boundaries_geometry ON territory_boundaries USING GIST(geometry);

-- Source tracking for data provenance
CREATE TABLE data_sources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(500),
    last_imported TIMESTAMP,
    record_count INTEGER,
    notes TEXT
);
```

---

## 4. REST API Topology

### Base URL Structure
```
/api/v1/
```

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| **Locations** |||
| GET | `/locations` | List all locations with filtering |
| GET | `/locations/{id}` | Get location by ID |
| GET | `/locations/bounds` | Get locations within geographic bounds |
| **People** |||
| GET | `/people` | List people with filtering |
| GET | `/people/{id}` | Get person details with events |
| GET | `/people/{id}/events` | Get events for a person |
| **Events** |||
| GET | `/events` | List events with filtering |
| GET | `/events/{id}` | Get event details with casualties |
| GET | `/events/timeline` | Get events for timeline view |
| GET | `/events/{id}/participants` | Get people/units in event |
| **Military Units** |||
| GET | `/units` | List military units |
| GET | `/units/{id}` | Get unit details |
| GET | `/units/{id}/subunits` | Get unit hierarchy |
| GET | `/units/{id}/events` | Get events for unit |
| **Boundaries** |||
| GET | `/boundaries` | Get boundaries for a date |
| GET | `/boundaries/timeline` | Get boundary change dates |
| **Stats** |||
| GET | `/stats/casualties` | Aggregate casualty statistics |
| GET | `/stats/timeline` | Event counts by time period |

### Request/Response Contracts

#### GET /api/v1/events

**Query Parameters:**
```typescript
interface EventQueryParams {
  type?: 'battle' | 'siege' | 'raid' | 'skirmish' | 'treaty' | 'election' | 'proclamation' | 'surrender';
  date_from?: string;  // ISO date
  date_to?: string;    // ISO date
  side?: 'union' | 'confederate';
  theater?: string;
  campaign?: string;
  min_significance?: number;
  location_id?: number;
  limit?: number;      // default 50, max 200
  offset?: number;
  include_casualties?: boolean;
  include_location?: boolean;
}
```

**Response:**
```typescript
interface EventListResponse {
  data: Event[];
  meta: {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
  };
}

interface Event {
  id: number;
  name: string;
  type: EventType;
  date_start: string;
  date_end: string | null;
  description: string | null;
  campaign: string | null;
  theater: string | null;
  result: string | null;
  significance: number | null;
  cwsac_id: string | null;
  wikipedia_url: string | null;
  image_url: string | null;
  location?: Location;
  casualties?: {
    union: CasualtyStats;
    confederate: CasualtyStats;
  };
}

interface CasualtyStats {
  killed: number | null;
  wounded: number | null;
  captured: number | null;
  missing: number | null;
  total_engaged: number | null;
}

interface Location {
  id: number;
  name: string;
  type: LocationType;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  state: string | null;
}
```

#### GET /api/v1/events/timeline

**Query Parameters:**
```typescript
interface TimelineQueryParams {
  date_from?: string;  // default: '1861-01-01'
  date_to?: string;    // default: '1865-12-31'
  types?: string[];    // filter by event types
  granularity?: 'day' | 'week' | 'month';
}
```

**Response:**
```typescript
interface TimelineResponse {
  events: TimelineEvent[];
  date_range: {
    start: string;
    end: string;
  };
}

interface TimelineEvent {
  id: number;
  name: string;
  type: EventType;
  date: string;
  coordinates: { lat: number; lng: number } | null;
  significance: number;
  result: string | null;
}
```

#### GET /api/v1/boundaries

**Query Parameters:**
```typescript
interface BoundaryQueryParams {
  date: string;        // ISO date - required
  type?: 'state' | 'territory' | 'county';
  include_geojson?: boolean;  // default true
}
```

**Response:**
```typescript
interface BoundaryResponse {
  date: string;
  boundaries: Boundary[];
}

interface Boundary {
  id: number;
  name: string;
  type: string;
  side: Side | null;
  geojson?: GeoJSON.Feature;
}
```

#### GET /api/v1/people/{id}

**Response:**
```typescript
interface PersonDetailResponse {
  id: number;
  name: string;
  birth_date: string | null;
  death_date: string | null;
  side: Side | null;
  rank: string | null;
  highest_rank: string | null;
  biography: string | null;
  image_url: string | null;
  wikipedia_url: string | null;
  events: PersonEvent[];
  units_commanded: string[];
}

interface PersonEvent {
  event_id: number;
  event_name: string;
  date: string;
  role: PersonRole;
  unit_commanded: string | null;
}
```

### OpenAPI Specification Location
```
/api/v1/openapi.json
/api/v1/docs  (Swagger UI)
/api/v1/redoc (ReDoc)
```

---

## 5. Frontend Features and UX

### Core Features

#### 1. Interactive Map
- **Base Layer**: Modern map tiles with option for historical overlay
- **Zoom Range**: Continental US (zoom 4) to battlefield detail (zoom 15)
- **Marker Clustering**: Group nearby events at low zoom levels
- **Color Coding**:
  - Blue markers for Union victories
  - Gray markers for Confederate victories
  - Yellow for inconclusive/other
- **Marker Icons**: Different icons for battles, sieges, treaties, etc.
- **Click Interaction**: Click marker to open detail panel
- **Boundary Overlay**: State/territory boundaries that update with timeline

#### 2. Timeline Slider
- **Range**: January 1861 - December 1865
- **Granularity**: Day, week, or month selectable
- **Visual Events**: Tick marks showing event density
- **Playback**: Auto-play through war at configurable speed
- **Sync**: Map markers and boundaries update as timeline moves

#### 3. Event Detail Panel
- **Header**: Event name, date, type badge
- **Location**: Map snippet, state/region
- **Sides**: Commanders, forces engaged
- **Casualties**: Side-by-side comparison table
- **Description**: Historical context
- **Media**: External image links, Wikipedia link
- **Related**: Links to related events, campaigns

#### 4. Search and Filtering
- **Text Search**: Search events, people, locations
- **Type Filters**: Toggle event types on/off
- **Date Range**: Filter to specific period
- **Side Filter**: Show only Union/Confederate related
- **Theater Filter**: Eastern, Western, Trans-Mississippi, etc.

#### 5. Statistics Dashboard
- **Casualty Graphs**: Over time, by campaign
- **Engagement Counts**: Battles per month/year
- **Force Comparison**: Army sizes over time
- **Theater Breakdown**: Activity by region

### Wireframe Concepts

```
┌─────────────────────────────────────────────────────────────────────┐
│  US Civil War Interactive Map                    [Search...] [≡]   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────┐  ┌──────────────────────────┐ │
│  │                                 │  │  Battle of Gettysburg    │ │
│  │                                 │  │  July 1-3, 1863          │ │
│  │           MAP VIEW              │  │  ─────────────────────── │ │
│  │                                 │  │  Pennsylvania            │ │
│  │    [●] Gettysburg               │  │                          │ │
│  │         ⚔                       │  │  Union Victory           │ │
│  │                                 │  │                          │ │
│  │    [●]──[●]──[●]                │  │  Commanders:             │ │
│  │                                 │  │  Union: Meade            │ │
│  │                                 │  │  CSA: Lee                │ │
│  │                                 │  │                          │ │
│  │                                 │  │  Casualties:             │ │
│  │    ───── Union states           │  │  Union: 23,049           │ │
│  │    ───── Confederate states     │  │  CSA: 28,063             │ │
│  │                                 │  │                          │ │
│  └─────────────────────────────────┘  │  [More Details]          │ │
│                                       └──────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 1861 ─────●─────────●────●──────────────────────────── 1865 │   │
│  │      ▲    Jan       Apr  Jul                                │   │
│  │      │    Sumter    Shiloh                                  │   │
│  │   [◄] [▶] [⏸]                              [Day▼] [Filters] │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── SearchBar
│   └── MenuToggle
├── MainContent
│   ├── MapContainer
│   │   ├── LeafletMap
│   │   ├── BoundaryLayer
│   │   ├── EventMarkers
│   │   └── MapControls
│   └── DetailPanel
│       ├── EventDetail
│       ├── PersonDetail
│       └── LocationDetail
├── TimelineBar
│   ├── TimelineSlider
│   ├── PlaybackControls
│   └── TimelineFilters
├── FilterSidebar
│   ├── TypeFilters
│   ├── DateRangeFilter
│   └── TheaterFilter
└── StatsDashboard
    ├── CasualtyChart
    └── EngagementChart
```

---

## 6. Parallel Development Layer Structure

### Layer 1: Data Import/Scraping Scripts

**Directory:** `/data-import/`

**Dependencies:** None (standalone Python scripts)

**Output:** JSON files in `/data-import/processed/` directory

**Mock Interface:** Provides mock JSON files for other layers

```python
# /data-import/schemas/event.schema.json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "name", "type", "date_start"],
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" },
    "type": { "type": "string", "enum": ["battle", "siege", "raid", "skirmish", "treaty", "election", "proclamation", "surrender"] },
    "date_start": { "type": "string", "format": "date" },
    "date_end": { "type": ["string", "null"], "format": "date" },
    "description": { "type": ["string", "null"] },
    "location": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "lat": { "type": "number" },
        "lng": { "type": "number" },
        "state": { "type": "string" }
      }
    },
    "casualties": {
      "type": "object",
      "properties": {
        "union": { "$ref": "#/definitions/casualtyStats" },
        "confederate": { "$ref": "#/definitions/casualtyStats" }
      }
    },
    "commanders": {
      "type": "object",
      "properties": {
        "union": { "type": "array", "items": { "type": "string" } },
        "confederate": { "type": "array", "items": { "type": "string" } }
      }
    },
    "result": { "type": ["string", "null"] },
    "significance": { "type": "integer", "minimum": 1, "maximum": 5 }
  },
  "definitions": {
    "casualtyStats": {
      "type": "object",
      "properties": {
        "killed": { "type": ["integer", "null"] },
        "wounded": { "type": ["integer", "null"] },
        "captured": { "type": ["integer", "null"] },
        "missing": { "type": ["integer", "null"] },
        "total_engaged": { "type": ["integer", "null"] }
      }
    }
  }
}
```

**Testing:** Validate output JSON against schemas, check record counts

---

### Layer 2: Database Schema and Migrations

**Directory:** `/backend/db/`

**Dependencies:** PostgreSQL + PostGIS

**Mock Interface:** Provides SQL schema files, seed scripts with sample data

```
/backend/
  /db/
    /migrations/
      001_initial_schema.sql
      002_add_indexes.sql
    /seeds/
      mock_locations.sql
      mock_people.sql
      mock_events.sql
      mock_units.sql
      mock_boundaries.sql
    /scripts/
      reset_db.sh
      seed_mock_data.sh
      import_processed_data.py
```

**Sample Mock Data Script:**
```sql
-- /backend/db/seeds/mock_events.sql
INSERT INTO locations (id, name, type, coordinates, state) VALUES
  (1, 'Fort Sumter', 'fort', ST_GeogFromText('POINT(-79.8745 32.7522)'), 'South Carolina'),
  (2, 'Gettysburg', 'battlefield', ST_GeogFromText('POINT(-77.2311 39.8309)'), 'Pennsylvania'),
  (3, 'Appomattox Court House', 'landmark', ST_GeogFromText('POINT(-78.7969 37.3765)'), 'Virginia');

INSERT INTO events (id, name, type, date_start, date_end, location_id, result, significance) VALUES
  (1, 'Battle of Fort Sumter', 'battle', '1861-04-12', '1861-04-13', 1, 'Confederate victory', 5),
  (2, 'Battle of Gettysburg', 'battle', '1863-07-01', '1863-07-03', 2, 'Union victory', 5),
  (3, 'Surrender at Appomattox', 'surrender', '1865-04-09', NULL, 3, NULL, 5);

INSERT INTO event_casualties (event_id, side, killed, wounded, captured, total_engaged) VALUES
  (1, 'union', 2, 6, 0, 85),
  (1, 'confederate', 0, 4, 0, 500),
  (2, 'union', 3155, 14529, 5365, 83289),
  (2, 'confederate', 4708, 12693, 5830, 75000);
```

**Testing:** Run migrations, verify constraints, test spatial queries

---

### Layer 3: Backend REST API

**Directory:** `/backend/api/`

**Dependencies:** Layer 2 (database), but can mock with in-memory data

**Mock Interface:** Uses mock repository that returns static data

```python
# /backend/api/repositories/base.py
from abc import ABC, abstractmethod
from typing import Generic, TypeVar, List, Optional

T = TypeVar('T')

class BaseRepository(ABC, Generic[T]):
    @abstractmethod
    async def get_by_id(self, id: int) -> Optional[T]:
        pass

    @abstractmethod
    async def get_all(self, limit: int = 50, offset: int = 0, **filters) -> List[T]:
        pass

    @abstractmethod
    async def count(self, **filters) -> int:
        pass
```

```python
# /backend/api/repositories/mock/event_repository.py
from typing import List, Optional
from ..base import BaseRepository
from ...models.event import Event, EventType
from datetime import date

MOCK_EVENTS = [
    Event(
        id=1,
        name="Battle of Fort Sumter",
        type=EventType.BATTLE,
        date_start=date(1861, 4, 12),
        date_end=date(1861, 4, 13),
        description="First battle of the Civil War",
        result="Confederate victory",
        significance=5,
        location_id=1,
    ),
    Event(
        id=2,
        name="Battle of Gettysburg",
        type=EventType.BATTLE,
        date_start=date(1863, 7, 1),
        date_end=date(1863, 7, 3),
        description="Turning point of the war",
        result="Union victory",
        significance=5,
        location_id=2,
    ),
]

class MockEventRepository(BaseRepository[Event]):
    async def get_by_id(self, id: int) -> Optional[Event]:
        return next((e for e in MOCK_EVENTS if e.id == id), None)

    async def get_all(self, limit: int = 50, offset: int = 0, **filters) -> List[Event]:
        filtered = MOCK_EVENTS
        if 'type' in filters:
            filtered = [e for e in filtered if e.type == filters['type']]
        if 'date_from' in filters:
            filtered = [e for e in filtered if e.date_start >= filters['date_from']]
        if 'date_to' in filters:
            filtered = [e for e in filtered if e.date_start <= filters['date_to']]
        return filtered[offset:offset + limit]

    async def count(self, **filters) -> int:
        return len(await self.get_all(limit=10000, **filters))
```

```python
# /backend/api/main.py
from fastapi import FastAPI, Depends
from .routers import events, people, locations, units, boundaries, stats
from .dependencies import get_event_repository
from .config import settings

app = FastAPI(
    title="Civil War API",
    version="1.0.0",
    description="REST API for US Civil War historical data"
)

# Use mock or real repository based on config
if settings.USE_MOCK_DATA:
    from .repositories.mock.event_repository import MockEventRepository
    app.dependency_overrides[get_event_repository] = lambda: MockEventRepository()

app.include_router(events.router, prefix="/api/v1/events", tags=["events"])
app.include_router(people.router, prefix="/api/v1/people", tags=["people"])
app.include_router(locations.router, prefix="/api/v1/locations", tags=["locations"])
app.include_router(units.router, prefix="/api/v1/units", tags=["units"])
app.include_router(boundaries.router, prefix="/api/v1/boundaries", tags=["boundaries"])
app.include_router(stats.router, prefix="/api/v1/stats", tags=["stats"])
```

**Testing:** Unit tests with mock repository, integration tests with test database

---

### Layer 4: Frontend UI

**Directory:** `/frontend/`

**Dependencies:** Layer 3 (API), but can mock with MSW (Mock Service Worker)

**Mock Interface:** MSW handlers return static JSON matching API contracts

```typescript
// /frontend/src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { mockEvents, mockPeople, mockLocations, mockBoundaries } from './data';

export const handlers = [
  // Events endpoints
  http.get('/api/v1/events', ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const type = url.searchParams.get('type');

    let events = [...mockEvents];
    if (type) {
      events = events.filter(e => e.type === type);
    }

    return HttpResponse.json({
      data: events.slice(offset, offset + limit),
      meta: {
        total: events.length,
        limit,
        offset,
        has_more: offset + limit < events.length
      }
    });
  }),

  http.get('/api/v1/events/:id', ({ params }) => {
    const event = mockEvents.find(e => e.id === parseInt(params.id as string));
    if (!event) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(event);
  }),

  http.get('/api/v1/events/timeline', () => {
    return HttpResponse.json({
      events: mockEvents.map(e => ({
        id: e.id,
        name: e.name,
        type: e.type,
        date: e.date_start,
        coordinates: e.location?.coordinates || null,
        significance: e.significance,
        result: e.result
      })),
      date_range: {
        start: '1861-01-01',
        end: '1865-12-31'
      }
    });
  }),

  http.get('/api/v1/boundaries', ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date') || '1863-01-01';
    return HttpResponse.json({
      date,
      boundaries: mockBoundaries
    });
  }),

  // People endpoints
  http.get('/api/v1/people', () => {
    return HttpResponse.json({
      data: mockPeople,
      meta: { total: mockPeople.length, limit: 50, offset: 0, has_more: false }
    });
  }),

  http.get('/api/v1/people/:id', ({ params }) => {
    const person = mockPeople.find(p => p.id === parseInt(params.id as string));
    if (!person) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(person);
  }),
];
```

```typescript
// /frontend/src/mocks/data/events.ts
import { Event } from '../../types';

export const mockEvents: Event[] = [
  {
    id: 1,
    name: "Battle of Fort Sumter",
    type: "battle",
    date_start: "1861-04-12",
    date_end: "1861-04-13",
    description: "The bombardment of Fort Sumter was the first military action of the American Civil War.",
    campaign: null,
    theater: "Eastern",
    result: "Confederate victory",
    significance: 5,
    cwsac_id: "SC001",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Fort_Sumter",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Fort_Sumter_storm_flag_1861.jpg/440px-Fort_Sumter_storm_flag_1861.jpg",
    location: {
      id: 1,
      name: "Fort Sumter",
      type: "fort",
      coordinates: { lat: 32.7522, lng: -79.8745 },
      state: "South Carolina"
    },
    casualties: {
      union: { killed: 2, wounded: 0, captured: 0, missing: 0, total_engaged: 85 },
      confederate: { killed: 0, wounded: 4, captured: 0, missing: 0, total_engaged: 500 }
    }
  },
  {
    id: 2,
    name: "Battle of Gettysburg",
    type: "battle",
    date_start: "1863-07-01",
    date_end: "1863-07-03",
    description: "Fought from July 1 to 3, 1863, in and around the town of Gettysburg, Pennsylvania. The battle was the turning point of the Civil War.",
    campaign: "Gettysburg Campaign",
    theater: "Eastern",
    result: "Union victory",
    significance: 5,
    cwsac_id: "PA002",
    wikipedia_url: "https://en.wikipedia.org/wiki/Battle_of_Gettysburg",
    image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Battle_of_Gettysburg%2C_by_Currier_and_Ives.png/440px-Battle_of_Gettysburg%2C_by_Currier_and_Ives.png",
    location: {
      id: 2,
      name: "Gettysburg",
      type: "battlefield",
      coordinates: { lat: 39.8309, lng: -77.2311 },
      state: "Pennsylvania"
    },
    casualties: {
      union: { killed: 3155, wounded: 14529, captured: 5365, missing: 0, total_engaged: 83289 },
      confederate: { killed: 4708, wounded: 12693, captured: 5830, missing: 0, total_engaged: 75000 }
    }
  }
];
```

```typescript
// /frontend/src/types/index.ts
export type Side = 'union' | 'confederate' | 'neutral' | 'border';
export type EventType = 'battle' | 'siege' | 'raid' | 'skirmish' | 'treaty' | 'election' | 'proclamation' | 'surrender';
export type LocationType = 'city' | 'battlefield' | 'fort' | 'river' | 'landmark' | 'capital';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  id: number;
  name: string;
  type: LocationType;
  coordinates: Coordinates | null;
  state: string | null;
}

export interface CasualtyStats {
  killed: number | null;
  wounded: number | null;
  captured: number | null;
  missing: number | null;
  total_engaged: number | null;
}

export interface Event {
  id: number;
  name: string;
  type: EventType;
  date_start: string;
  date_end: string | null;
  description: string | null;
  campaign: string | null;
  theater: string | null;
  result: string | null;
  significance: number | null;
  cwsac_id: string | null;
  wikipedia_url: string | null;
  image_url: string | null;
  location?: Location;
  casualties?: {
    union: CasualtyStats;
    confederate: CasualtyStats;
  };
}

export interface Person {
  id: number;
  name: string;
  birth_date: string | null;
  death_date: string | null;
  side: Side | null;
  rank: string | null;
  highest_rank: string | null;
  biography: string | null;
  image_url: string | null;
  wikipedia_url: string | null;
}

export interface Boundary {
  id: number;
  name: string;
  type: string;
  side: Side | null;
  geojson?: GeoJSON.Feature;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
  };
}
```

**Testing:** Component tests with MSW, E2E tests with Playwright

---

## 7. Development Phases and Integration

### Phase 1: Foundation (Week 1-2)
All layers work independently with mocks.

| Layer | Tasks | Deliverable |
|-------|-------|-------------|
| 1 | Set up scraping framework, download ACW data | Raw data files |
| 2 | Create PostgreSQL schema, seed scripts | Working local DB |
| 3 | FastAPI skeleton, mock repositories | API with mock data |
| 4 | React app with Leaflet, MSW handlers | UI with mocked API |

### Phase 2: Data Pipeline (Week 2-3)
| Layer | Tasks | Deliverable |
|-------|-------|-------------|
| 1 | Complete all importers, validate data | Processed JSON files |
| 2 | Write import scripts, test with real data | Populated database |

### Phase 3: Integration (Week 3-4)
| Layer | Tasks | Deliverable |
|-------|-------|-------------|
| 3 | Replace mocks with SQLAlchemy repos | Real data via API |
| 4 | Remove MSW, connect to real API | Working integration |

### Phase 4: Polish (Week 4-5)
| Area | Tasks |
|------|-------|
| All | Bug fixes, performance optimization |
| Frontend | Responsive design, accessibility |
| Backend | Caching, rate limiting |
| Data | Data quality cleanup, additional sources |

---

## 8. Directory Structure Summary

```
/civilwar/
├── README.md
├── docker-compose.yml
├── .env.example
│
├── /data-import/
│   ├── requirements.txt
│   ├── /scripts/
│   │   ├── acw_battle_importer.py
│   │   ├── nps_api_fetcher.py
│   │   ├── wikidata_sparql_fetcher.py
│   │   ├── wikipedia_scraper.py
│   │   └── boundary_importer.py
│   ├── /raw/
│   ├── /processed/
│   └── /schemas/
│       ├── event.schema.json
│       ├── person.schema.json
│       ├── location.schema.json
│       └── boundary.schema.json
│
├── /backend/
│   ├── requirements.txt
│   ├── alembic.ini
│   ├── /db/
│   │   ├── /migrations/
│   │   └── /seeds/
│   ├── /api/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   ├── /models/
│   │   │   ├── event.py
│   │   │   ├── person.py
│   │   │   ├── location.py
│   │   │   └── ...
│   │   ├── /schemas/
│   │   │   ├── event.py
│   │   │   ├── person.py
│   │   │   └── ...
│   │   ├── /repositories/
│   │   │   ├── base.py
│   │   │   ├── event_repository.py
│   │   │   ├── /mock/
│   │   │   │   └── event_repository.py
│   │   │   └── /sqlalchemy/
│   │   │       └── event_repository.py
│   │   └── /routers/
│   │       ├── events.py
│   │       ├── people.py
│   │       └── ...
│   └── /tests/
│
└── /frontend/
    ├── package.json
    ├── vite.config.ts
    ├── /src/
    │   ├── App.tsx
    │   ├── main.tsx
    │   ├── /types/
    │   │   └── index.ts
    │   ├── /components/
    │   │   ├── /Map/
    │   │   ├── /Timeline/
    │   │   ├── /DetailPanel/
    │   │   └── /Filters/
    │   ├── /hooks/
    │   │   ├── useEvents.ts
    │   │   ├── useBoundaries.ts
    │   │   └── ...
    │   ├── /api/
    │   │   └── client.ts
    │   └── /mocks/
    │       ├── handlers.ts
    │       ├── browser.ts
    │       └── /data/
    │           ├── events.ts
    │           ├── people.ts
    │           └── boundaries.ts
    └── /tests/
```

---

## 9. Key Interface Contracts Summary

### Layer 1 -> Layer 2: Processed JSON Files

```json
// /data-import/processed/events.json
[
  {
    "source_id": "cwsac_SC001",
    "name": "Battle of Fort Sumter",
    "type": "battle",
    "date_start": "1861-04-12",
    "date_end": "1861-04-13",
    "location": {
      "name": "Fort Sumter",
      "lat": 32.7522,
      "lng": -79.8745,
      "state": "South Carolina"
    },
    "casualties": { "..." : "..." },
    "commanders": { "..." : "..." }
  }
]
```

### Layer 2 -> Layer 3: SQLAlchemy Models

```python
# Pydantic schemas match SQLAlchemy models
class EventCreate(BaseModel):
    name: str
    type: EventType
    date_start: date
    date_end: Optional[date]
    location_id: Optional[int]
    ...
```

### Layer 3 -> Layer 4: REST API JSON

```typescript
// TypeScript interfaces match API responses
interface Event {
  id: number;
  name: string;
  type: EventType;
  ...
}
```

---

## 10. Data Source References

- [American Civil War Battle Data (GitHub)](https://github.com/jrnold/acw_battle_data) - Primary battle data source
- [ACW Battle Data (FigShare)](https://figshare.com/articles/dataset/acw_battle_data/1515995) - Versioned releases
- [NPS Developer API](https://www.nps.gov/subjects/developer/api-documentation.htm) - National Park Service data
- [Atlas of Historical County Boundaries](https://publications.newberry.org/ahcb/downloads/united_states.html) - Boundary shapefiles
- [Wikidata SPARQL](https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service) - Structured data queries
- [Wikipedia Civil War Generals (Union)](https://en.wikipedia.org/wiki/List_of_American_Civil_War_generals_(Union)) - Personnel data
- [Wikipedia Civil War Generals (Confederate)](https://en.wikipedia.org/wiki/List_of_American_Civil_War_generals_(Confederate)) - Personnel data
- [OpenHistoricalMap](https://www.openhistoricalmap.org/) - Historical geographic data
- [Historical US Boundaries](https://lincolnmullen.com/projects/us-boundaries/) - Interactive boundary visualization
- [ArcGIS Civil War Battlefields](https://www.arcgis.com/home/item.html?id=2ae55c58466b4964bdc495d9b6776928) - GIS data

---

## 11. Critical Files for Implementation

Based on this plan, the following files will be most critical for implementation:

| File | Purpose |
|------|---------|
| `/backend/api/models/event.py` | Core domain model defining Event entity and relationships |
| `/backend/api/repositories/base.py` | Repository interface enabling mock/real data swapping |
| `/frontend/src/types/index.ts` | TypeScript types mirroring API contracts |
| `/data-import/schemas/event.schema.json` | JSON schema for validated data import |
| `/frontend/src/mocks/handlers.ts` | MSW mock handlers for frontend independence |

---

## 12. Agent Task Assignments

For parallel development, assign agents to these independent workstreams:

### Agent 1: Data Import Layer
- Build scraping/import scripts
- Download and process raw data
- Output: `/data-import/processed/*.json`

### Agent 2: Database Layer
- Create PostgreSQL schema with PostGIS
- Write migration scripts
- Create seed data scripts
- Output: Working database with mock data

### Agent 3: Backend API Layer
- Build FastAPI application
- Implement mock repositories first
- Define all endpoints with OpenAPI
- Output: Running API at `localhost:8000`

### Agent 4: Frontend UI Layer
- Build React + Leaflet application
- Implement MSW mocks first
- Build all UI components
- Output: Running UI at `localhost:5173`

Each agent can work independently using the mock interfaces defined above, then integrate when ready.
