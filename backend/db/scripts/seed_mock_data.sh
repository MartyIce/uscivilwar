#!/bin/bash
# seed_mock_data.sh - Populate the Civil War database with mock data
# Usage: ./seed_mock_data.sh [database_name] [username]
#
# Environment variables (optional):
#   PGHOST - PostgreSQL host (default: localhost)
#   PGPORT - PostgreSQL port (default: 5432)
#   PGUSER - PostgreSQL user (default: postgres)
#   PGDATABASE - Database name (default: civilwar)

set -e

# Configuration
DB_NAME="${1:-${PGDATABASE:-civilwar}}"
DB_USER="${2:-${PGUSER:-postgres}}"
DB_HOST="${PGHOST:-localhost}"
DB_PORT="${PGPORT:-5432}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SEEDS_DIR="${SCRIPT_DIR}/../seeds"

echo -e "${YELLOW}==================================================${NC}"
echo -e "${YELLOW}  Civil War Database Seeding Script${NC}"
echo -e "${YELLOW}==================================================${NC}"
echo ""
echo "Configuration:"
echo "  Host:     ${DB_HOST}:${DB_PORT}"
echo "  Database: ${DB_NAME}"
echo "  User:     ${DB_USER}"
echo ""

# Check if database exists
if ! psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -lqt | cut -d \| -f 1 | grep -qw "${DB_NAME}"; then
    echo -e "${RED}Error: Database '${DB_NAME}' does not exist.${NC}"
    echo "Run ./reset_db.sh first to create the database and schema."
    exit 1
fi

# Define seed files in order of dependencies
# (locations and people must come before events, units before unit_event_participation)
SEED_FILES=(
    "mock_locations.sql"
    "mock_people.sql"
    "mock_events.sql"      # Depends on locations; includes event_casualties and person_event_roles
    "mock_units.sql"       # Includes unit_event_participation
    "mock_boundaries.sql"  # Includes data_sources
)

echo -e "${YELLOW}Seeding database with mock data...${NC}"
echo ""

# Clear existing data (in reverse dependency order)
echo -e "${BLUE}Clearing existing data...${NC}"
psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" -q <<EOF
-- Disable triggers temporarily for faster deletion
SET session_replication_role = 'replica';

-- Clear tables in reverse dependency order
TRUNCATE TABLE unit_event_participation CASCADE;
TRUNCATE TABLE person_event_roles CASCADE;
TRUNCATE TABLE event_casualties CASCADE;
TRUNCATE TABLE military_units CASCADE;
TRUNCATE TABLE events CASCADE;
TRUNCATE TABLE people CASCADE;
TRUNCATE TABLE locations CASCADE;
TRUNCATE TABLE territory_boundaries CASCADE;
TRUNCATE TABLE data_sources CASCADE;

-- Re-enable triggers
SET session_replication_role = 'origin';
EOF

echo ""
echo -e "${YELLOW}Running seed files...${NC}"

# Run each seed file
for seed_file in "${SEED_FILES[@]}"; do
    seed_path="${SEEDS_DIR}/${seed_file}"
    if [ -f "$seed_path" ]; then
        echo -e "  ${GREEN}+${NC} Loading: ${seed_file}"
        psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" -f "$seed_path" -q 2>&1 | grep -v "^SET$" | grep -v "^INSERT" | grep -v "^setval$" || true
    else
        echo -e "  ${RED}!${NC} Missing: ${seed_file}"
    fi
done

# Refresh materialized views if they exist
echo ""
echo -e "${YELLOW}Refreshing materialized views...${NC}"
psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" -q <<EOF
-- Refresh the timeline view if it exists
DO \$\$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_matviews WHERE matviewname = 'mv_timeline_events') THEN
        REFRESH MATERIALIZED VIEW mv_timeline_events;
        RAISE NOTICE 'Refreshed mv_timeline_events';
    END IF;
END
\$\$;
EOF

# Display summary
echo ""
echo -e "${YELLOW}Verifying data...${NC}"
echo ""

psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" -t <<EOF
SELECT '  Locations:      ' || COUNT(*) FROM locations
UNION ALL
SELECT '  People:         ' || COUNT(*) FROM people
UNION ALL
SELECT '  Events:         ' || COUNT(*) FROM events
UNION ALL
SELECT '  Event Casualties: ' || COUNT(*) FROM event_casualties
UNION ALL
SELECT '  Person-Event Roles: ' || COUNT(*) FROM person_event_roles
UNION ALL
SELECT '  Military Units: ' || COUNT(*) FROM military_units
UNION ALL
SELECT '  Unit Participation: ' || COUNT(*) FROM unit_event_participation
UNION ALL
SELECT '  Territory Boundaries: ' || COUNT(*) FROM territory_boundaries
UNION ALL
SELECT '  Data Sources:   ' || COUNT(*) FROM data_sources;
EOF

echo ""
echo -e "${GREEN}==================================================${NC}"
echo -e "${GREEN}  Mock data seeded successfully!${NC}"
echo -e "${GREEN}==================================================${NC}"
echo ""
echo "Sample queries to verify:"
echo ""
echo "  -- Get all battles with casualties"
echo "  SELECT e.name, e.date_start, e.result,"
echo "         uc.killed as union_killed, cc.killed as conf_killed"
echo "  FROM events e"
echo "  LEFT JOIN event_casualties uc ON e.id = uc.event_id AND uc.side = 'union'"
echo "  LEFT JOIN event_casualties cc ON e.id = cc.event_id AND cc.side = 'confederate'"
echo "  WHERE e.type = 'battle'"
echo "  ORDER BY e.date_start;"
echo ""
echo "  -- Get commanders at Gettysburg"
echo "  SELECT p.name, p.side, per.role, per.unit_commanded"
echo "  FROM person_event_roles per"
echo "  JOIN people p ON per.person_id = p.id"
echo "  JOIN events e ON per.event_id = e.id"
echo "  WHERE e.name LIKE '%Gettysburg%';"
echo ""
