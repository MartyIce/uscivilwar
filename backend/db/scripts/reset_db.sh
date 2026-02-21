#!/bin/bash
# reset_db.sh - Drop and recreate the Civil War database
# Usage: ./reset_db.sh [database_name] [username]
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
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MIGRATIONS_DIR="${SCRIPT_DIR}/../migrations"

echo -e "${YELLOW}==================================================${NC}"
echo -e "${YELLOW}  Civil War Database Reset Script${NC}"
echo -e "${YELLOW}==================================================${NC}"
echo ""
echo "Configuration:"
echo "  Host:     ${DB_HOST}:${DB_PORT}"
echo "  Database: ${DB_NAME}"
echo "  User:     ${DB_USER}"
echo ""

# Confirm destructive action
read -p "This will DROP and recreate the database '${DB_NAME}'. Continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Aborted.${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 1: Terminating existing connections...${NC}"
psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d postgres -c "
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = '${DB_NAME}'
  AND pid <> pg_backend_pid();
" 2>/dev/null || true

echo -e "${YELLOW}Step 2: Dropping existing database...${NC}"
dropdb -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" --if-exists "${DB_NAME}" 2>/dev/null || {
    echo -e "${YELLOW}  Database '${DB_NAME}' does not exist, creating fresh...${NC}"
}

echo -e "${YELLOW}Step 3: Creating new database...${NC}"
createdb -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" "${DB_NAME}"

echo -e "${YELLOW}Step 4: Running migrations...${NC}"

# Run migrations in order
for migration in "${MIGRATIONS_DIR}"/*.sql; do
    if [ -f "$migration" ]; then
        migration_name=$(basename "$migration")
        echo -e "  Running: ${migration_name}"
        psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" -f "$migration" -q
    fi
done

echo ""
echo -e "${GREEN}==================================================${NC}"
echo -e "${GREEN}  Database '${DB_NAME}' reset successfully!${NC}"
echo -e "${GREEN}==================================================${NC}"
echo ""
echo "To seed mock data, run:"
echo "  ./seed_mock_data.sh"
echo ""
echo "To connect to the database:"
echo "  psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_NAME}"
