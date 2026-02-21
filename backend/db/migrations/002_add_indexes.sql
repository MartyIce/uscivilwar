-- Civil War Interactive Map - Database Indexes
-- Migration 002: Add all indexes for query performance
-- Run after 001_initial_schema.sql

-- ============================================
-- Spatial Indexes (PostGIS GIST)
-- ============================================

-- Location coordinates for bounding box and proximity queries
CREATE INDEX idx_locations_coordinates ON locations USING GIST(coordinates);

-- Territory boundaries for date-based spatial queries
CREATE INDEX idx_boundaries_geometry ON territory_boundaries USING GIST(geometry);

-- ============================================
-- Locations Indexes
-- ============================================

-- Filter locations by type (battlefield, fort, city, etc.)
CREATE INDEX idx_locations_type ON locations(type);

-- Text search on location names
CREATE INDEX idx_locations_name ON locations(name);

-- Filter by state
CREATE INDEX idx_locations_state ON locations(state);

-- External ID lookup for data import matching
CREATE INDEX idx_locations_external_id ON locations(external_id) WHERE external_id IS NOT NULL;

-- ============================================
-- People Indexes
-- ============================================

-- Filter people by side (Union, Confederate)
CREATE INDEX idx_people_side ON people(side);

-- Search people by name
CREATE INDEX idx_people_name ON people(name);

-- Full-text search on people names
CREATE INDEX idx_people_name_trgm ON people USING gin(name gin_trgm_ops);

-- Wikidata ID lookup for data linking
CREATE INDEX idx_people_wikidata_id ON people(wikidata_id) WHERE wikidata_id IS NOT NULL;

-- External ID lookup
CREATE INDEX idx_people_external_id ON people(external_id) WHERE external_id IS NOT NULL;

-- ============================================
-- Events Indexes
-- ============================================

-- Date range queries (timeline view)
CREATE INDEX idx_events_date_start ON events(date_start);
CREATE INDEX idx_events_date_end ON events(date_end);

-- Combined date range for efficient range queries
CREATE INDEX idx_events_date_range ON events(date_start, date_end);

-- Filter events by type (battle, siege, treaty, etc.)
CREATE INDEX idx_events_type ON events(type);

-- Lookup events by location
CREATE INDEX idx_events_location ON events(location_id);

-- Filter by theater (Eastern, Western, Trans-Mississippi)
CREATE INDEX idx_events_theater ON events(theater) WHERE theater IS NOT NULL;

-- Filter by campaign
CREATE INDEX idx_events_campaign ON events(campaign) WHERE campaign IS NOT NULL;

-- Filter by result (Union victory, Confederate victory)
CREATE INDEX idx_events_result ON events(result) WHERE result IS NOT NULL;

-- Filter by significance level
CREATE INDEX idx_events_significance ON events(significance) WHERE significance IS NOT NULL;

-- CWSAC ID lookup
CREATE INDEX idx_events_cwsac_id ON events(cwsac_id) WHERE cwsac_id IS NOT NULL;

-- External ID lookup
CREATE INDEX idx_events_external_id ON events(external_id) WHERE external_id IS NOT NULL;

-- ============================================
-- Event Casualties Indexes
-- ============================================

-- Lookup casualties by event
CREATE INDEX idx_event_casualties_event ON event_casualties(event_id);

-- Filter casualties by side
CREATE INDEX idx_event_casualties_side ON event_casualties(side);

-- ============================================
-- Person-Event Roles Indexes
-- ============================================

-- Find all events for a person
CREATE INDEX idx_person_event_person ON person_event_roles(person_id);

-- Find all people in an event
CREATE INDEX idx_person_event_event ON person_event_roles(event_id);

-- Filter by role type
CREATE INDEX idx_person_event_role ON person_event_roles(role);

-- Combined index for specific person-role queries
CREATE INDEX idx_person_event_person_role ON person_event_roles(person_id, role);

-- ============================================
-- Military Units Indexes
-- ============================================

-- Filter units by side
CREATE INDEX idx_units_side ON military_units(side);

-- Filter units by type (army, corps, division, etc.)
CREATE INDEX idx_units_type ON military_units(type);

-- Navigate unit hierarchy
CREATE INDEX idx_units_parent ON military_units(parent_id);

-- Combined side and type filter
CREATE INDEX idx_units_side_type ON military_units(side, type);

-- Date range for unit existence
CREATE INDEX idx_units_formed_date ON military_units(formed_date) WHERE formed_date IS NOT NULL;
CREATE INDEX idx_units_disbanded_date ON military_units(disbanded_date) WHERE disbanded_date IS NOT NULL;

-- External ID lookup
CREATE INDEX idx_units_external_id ON military_units(external_id) WHERE external_id IS NOT NULL;

-- ============================================
-- Unit Event Participation Indexes
-- ============================================

-- Find all events for a unit
CREATE INDEX idx_unit_event_unit ON unit_event_participation(unit_id);

-- Find all units in an event
CREATE INDEX idx_unit_event_event ON unit_event_participation(event_id);

-- ============================================
-- Territory Boundaries Indexes
-- ============================================

-- Date range queries for historical boundaries
CREATE INDEX idx_boundaries_dates ON territory_boundaries(valid_from, valid_to);

-- Filter by boundary type (state, territory, county)
CREATE INDEX idx_boundaries_type ON territory_boundaries(type);

-- Filter by side alignment
CREATE INDEX idx_boundaries_side ON territory_boundaries(side) WHERE side IS NOT NULL;

-- Name lookup
CREATE INDEX idx_boundaries_name ON territory_boundaries(name);

-- ============================================
-- Data Sources Indexes
-- ============================================

-- Name lookup
CREATE INDEX idx_data_sources_name ON data_sources(name);

-- ============================================
-- Full-Text Search Extension (optional)
-- ============================================

-- Enable trigram extension for fuzzy text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Full-text search on event names and descriptions
CREATE INDEX idx_events_name_trgm ON events USING gin(name gin_trgm_ops);
CREATE INDEX idx_events_description_trgm ON events USING gin(description gin_trgm_ops) WHERE description IS NOT NULL;

-- Full-text search on location names
CREATE INDEX idx_locations_name_trgm ON locations USING gin(name gin_trgm_ops);

-- ============================================
-- Materialized View for Timeline Performance
-- ============================================

-- Materialized view for fast timeline queries
CREATE MATERIALIZED VIEW mv_timeline_events AS
SELECT
    e.id,
    e.name,
    e.type,
    e.date_start,
    e.date_end,
    e.result,
    e.significance,
    e.theater,
    l.name AS location_name,
    l.state AS location_state,
    ST_Y(l.coordinates::geometry) AS latitude,
    ST_X(l.coordinates::geometry) AS longitude,
    COALESCE(union_cas.killed, 0) + COALESCE(union_cas.wounded, 0) +
        COALESCE(union_cas.captured, 0) + COALESCE(union_cas.missing, 0) AS union_casualties,
    COALESCE(conf_cas.killed, 0) + COALESCE(conf_cas.wounded, 0) +
        COALESCE(conf_cas.captured, 0) + COALESCE(conf_cas.missing, 0) AS confederate_casualties
FROM events e
LEFT JOIN locations l ON e.location_id = l.id
LEFT JOIN event_casualties union_cas ON e.id = union_cas.event_id AND union_cas.side = 'union'
LEFT JOIN event_casualties conf_cas ON e.id = conf_cas.event_id AND conf_cas.side = 'confederate'
WHERE e.type IN ('battle', 'siege', 'raid', 'skirmish', 'surrender');

CREATE INDEX idx_mv_timeline_date ON mv_timeline_events(date_start);
CREATE INDEX idx_mv_timeline_type ON mv_timeline_events(type);
CREATE INDEX idx_mv_timeline_significance ON mv_timeline_events(significance);

-- Function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_timeline_view()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_timeline_events;
END;
$$ LANGUAGE plpgsql;

COMMENT ON MATERIALIZED VIEW mv_timeline_events IS 'Pre-computed view for timeline queries - refresh after data updates';
