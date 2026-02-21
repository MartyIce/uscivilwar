-- Civil War Interactive Map - Initial Database Schema
-- Migration 001: Create all tables and relationships
-- PostgreSQL 15+ with PostGIS extension

-- ============================================
-- Enable PostGIS Extension
-- ============================================
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================
-- Enum Types
-- ============================================

-- Side classification for factions in the war
CREATE TYPE side_enum AS ENUM ('union', 'confederate', 'neutral', 'border');

-- Types of events that occurred during the war
CREATE TYPE event_type_enum AS ENUM (
    'battle',
    'siege',
    'raid',
    'skirmish',
    'treaty',
    'election',
    'proclamation',
    'surrender'
);

-- Types of geographic locations
CREATE TYPE location_type_enum AS ENUM (
    'city',
    'battlefield',
    'fort',
    'river',
    'landmark',
    'capital'
);

-- Military unit organizational types
CREATE TYPE unit_type_enum AS ENUM (
    'army',
    'corps',
    'division',
    'brigade',
    'regiment',
    'battalion',
    'company',
    'navy_fleet',
    'navy_ship'
);

-- Roles a person can have in an event
CREATE TYPE person_role_enum AS ENUM (
    'commander',
    'subordinate',
    'participant',
    'casualty',
    'signatory'
);

-- ============================================
-- Core Tables
-- ============================================

-- Locations: Geographic points and areas of interest
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type location_type_enum NOT NULL,
    coordinates GEOGRAPHY(POINT, 4326),
    state VARCHAR(100),
    description TEXT,
    geojson JSONB,
    external_id VARCHAR(100),  -- For linking to source data
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

COMMENT ON TABLE locations IS 'Geographic locations including battlefields, forts, cities, and landmarks';
COMMENT ON COLUMN locations.coordinates IS 'PostGIS geography point (lon, lat) in WGS84';
COMMENT ON COLUMN locations.geojson IS 'Optional detailed geometry for the location';
COMMENT ON COLUMN locations.external_id IS 'Reference ID from external data sources';

-- People: Historical figures involved in the war
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

COMMENT ON TABLE people IS 'Historical figures including commanders, officers, and notable participants';
COMMENT ON COLUMN people.rank IS 'Rank at time of most notable action';
COMMENT ON COLUMN people.highest_rank IS 'Highest rank achieved during the war';

-- Events: Battles, sieges, treaties, and other historical events
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type event_type_enum NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE,
    description TEXT,
    location_id INTEGER REFERENCES locations(id),
    campaign VARCHAR(255),
    theater VARCHAR(100),  -- Eastern, Western, Trans-Mississippi, etc.
    result VARCHAR(100),   -- 'Union victory', 'Confederate victory', 'Inconclusive'
    significance INTEGER CHECK (significance BETWEEN 1 AND 5),
    cwsac_id VARCHAR(50),  -- Civil War Sites Advisory Commission ID
    wikipedia_url VARCHAR(500),
    image_url VARCHAR(500),
    external_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

COMMENT ON TABLE events IS 'Historical events including battles, sieges, and political events';
COMMENT ON COLUMN events.significance IS 'Historical significance rating from 1 (minor) to 5 (pivotal)';
COMMENT ON COLUMN events.cwsac_id IS 'Civil War Sites Advisory Commission identifier';
COMMENT ON COLUMN events.theater IS 'Geographic theater of operations';

-- Event casualties: Casualty statistics per side for each event
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

COMMENT ON TABLE event_casualties IS 'Casualty statistics broken down by side for each event';

-- Person-Event relationship: Who participated in what event
CREATE TABLE person_event_roles (
    id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES people(id) ON DELETE CASCADE,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    role person_role_enum NOT NULL,
    unit_commanded VARCHAR(255),
    notes TEXT,
    UNIQUE(person_id, event_id, role)
);

COMMENT ON TABLE person_event_roles IS 'Junction table linking people to events with their roles';
COMMENT ON COLUMN person_event_roles.unit_commanded IS 'Name of unit commanded during this event';

-- Military units: Army organization hierarchy
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

COMMENT ON TABLE military_units IS 'Military organizational units with hierarchical relationships';
COMMENT ON COLUMN military_units.parent_id IS 'Self-referential FK for unit hierarchy';
COMMENT ON COLUMN military_units.peak_strength IS 'Maximum strength achieved';

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

COMMENT ON TABLE unit_event_participation IS 'Junction table linking military units to events';
COMMENT ON COLUMN unit_event_participation.role IS 'Tactical role in the engagement';

-- Territory boundaries: State/territory boundaries over time
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

COMMENT ON TABLE territory_boundaries IS 'Historical political boundaries that changed over time';
COMMENT ON COLUMN territory_boundaries.valid_from IS 'Date when this boundary became effective';
COMMENT ON COLUMN territory_boundaries.valid_to IS 'Date when this boundary was superseded (NULL if current)';
COMMENT ON COLUMN territory_boundaries.side IS 'Political alignment (Union, Confederate, Border, etc.)';

-- Data sources: Tracking data provenance
CREATE TABLE data_sources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(500),
    last_imported TIMESTAMP,
    record_count INTEGER,
    notes TEXT
);

COMMENT ON TABLE data_sources IS 'Metadata about external data sources used to populate the database';

-- ============================================
-- Trigger for updated_at timestamps
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_locations_updated_at
    BEFORE UPDATE ON locations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_people_updated_at
    BEFORE UPDATE ON people
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_military_units_updated_at
    BEFORE UPDATE ON military_units
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
