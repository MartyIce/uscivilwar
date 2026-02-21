-- Civil War Database Schema (Simple - No PostGIS Required)
-- This version stores coordinates as separate lat/lng columns

-- Enum types
CREATE TYPE side_enum AS ENUM ('union', 'confederate', 'neutral', 'border');
CREATE TYPE event_type_enum AS ENUM ('battle', 'siege', 'raid', 'skirmish', 'treaty', 'election', 'proclamation', 'surrender');
CREATE TYPE location_type_enum AS ENUM ('city', 'battlefield', 'fort', 'river', 'landmark', 'capital');
CREATE TYPE unit_type_enum AS ENUM ('army', 'corps', 'division', 'brigade', 'regiment', 'battalion', 'company', 'navy_fleet', 'navy_ship');
CREATE TYPE person_role_enum AS ENUM ('commander', 'subordinate', 'participant', 'casualty', 'signatory');

-- Locations table (simplified without PostGIS)
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type location_type_enum NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    state VARCHAR(100),
    description TEXT,
    geojson JSONB,
    external_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_locations_type ON locations(type);
CREATE INDEX idx_locations_coords ON locations(latitude, longitude);

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
    result VARCHAR(100),
    significance INTEGER CHECK (significance BETWEEN 1 AND 5),
    cwsac_id VARCHAR(50),
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

-- Person-Event relationship
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
    role VARCHAR(100),
    UNIQUE(unit_id, event_id)
);

-- Territory boundaries (GeoJSON stored as JSONB)
CREATE TABLE territory_boundaries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    valid_from DATE NOT NULL,
    valid_to DATE,
    side side_enum,
    geojson JSONB NOT NULL,
    source VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_boundaries_dates ON territory_boundaries(valid_from, valid_to);

-- Source tracking
CREATE TABLE data_sources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(500),
    last_imported TIMESTAMP,
    record_count INTEGER,
    notes TEXT
);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_people_updated_at BEFORE UPDATE ON people FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_military_units_updated_at BEFORE UPDATE ON military_units FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
