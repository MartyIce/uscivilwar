#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  US Civil War Map - Setup Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "  ${GREEN}✓${NC} $1 found"
        return 0
    else
        echo -e "  ${RED}✗${NC} $1 not found"
        return 1
    fi
}

MISSING=0
check_command "psql" || MISSING=1
check_command "python3" || MISSING=1
check_command "pip3" || MISSING=1
check_command "node" || MISSING=1
check_command "npm" || MISSING=1

if [ $MISSING -eq 1 ]; then
    echo ""
    echo -e "${RED}Missing prerequisites. Please install:${NC}"
    echo "  - PostgreSQL 15+ with PostGIS: brew install postgresql@15 postgis"
    echo "  - Python 3.11+: brew install python@3.11"
    echo "  - Node.js 18+: brew install node"
    exit 1
fi

echo ""

# Database setup
echo -e "${YELLOW}Setting up database...${NC}"

export PGHOST=${PGHOST:-localhost}
export PGPORT=${PGPORT:-5432}
export PGUSER=${PGUSER:-$(whoami)}
export PGDATABASE=${PGDATABASE:-civilwar}

echo "  Database: $PGDATABASE @ $PGHOST:$PGPORT (user: $PGUSER)"

# Check if PostgreSQL is running
if ! pg_isready -h $PGHOST -p $PGPORT &> /dev/null; then
    echo -e "${RED}PostgreSQL is not running. Start it with:${NC}"
    echo "  brew services start postgresql@15"
    exit 1
fi

# Create database if not exists
if psql -h $PGHOST -p $PGPORT -lqt | cut -d \| -f 1 | grep -qw $PGDATABASE; then
    echo -e "  ${GREEN}✓${NC} Database '$PGDATABASE' exists"
else
    echo "  Creating database '$PGDATABASE'..."
    createdb -h $PGHOST -p $PGPORT $PGDATABASE
    echo -e "  ${GREEN}✓${NC} Database created"
fi

# Enable PostGIS
echo "  Enabling PostGIS extension..."
psql -h $PGHOST -p $PGPORT -d $PGDATABASE -c "CREATE EXTENSION IF NOT EXISTS postgis;" &> /dev/null
psql -h $PGHOST -p $PGPORT -d $PGDATABASE -c "CREATE EXTENSION IF NOT EXISTS pg_trgm;" &> /dev/null
echo -e "  ${GREEN}✓${NC} PostGIS enabled"

# Run migrations
echo "  Running migrations..."
psql -h $PGHOST -p $PGPORT -d $PGDATABASE -f "$PROJECT_ROOT/backend/db/migrations/001_initial_schema.sql" &> /dev/null
psql -h $PGHOST -p $PGPORT -d $PGDATABASE -f "$PROJECT_ROOT/backend/db/migrations/002_add_indexes.sql" &> /dev/null 2>&1 || true
echo -e "  ${GREEN}✓${NC} Migrations complete"

# Seed data
echo "  Seeding data..."
psql -h $PGHOST -p $PGPORT -d $PGDATABASE -f "$PROJECT_ROOT/backend/db/seeds/mock_locations.sql" &> /dev/null
psql -h $PGHOST -p $PGPORT -d $PGDATABASE -f "$PROJECT_ROOT/backend/db/seeds/mock_people.sql" &> /dev/null
psql -h $PGHOST -p $PGPORT -d $PGDATABASE -f "$PROJECT_ROOT/backend/db/seeds/mock_events.sql" &> /dev/null
psql -h $PGHOST -p $PGPORT -d $PGDATABASE -f "$PROJECT_ROOT/backend/db/seeds/mock_units.sql" &> /dev/null
psql -h $PGHOST -p $PGPORT -d $PGDATABASE -f "$PROJECT_ROOT/backend/db/seeds/mock_boundaries.sql" &> /dev/null
echo -e "  ${GREEN}✓${NC} Data seeded"

echo ""

# Python dependencies
echo -e "${YELLOW}Installing Python dependencies...${NC}"
pip3 install -q -r "$PROJECT_ROOT/backend/requirements.txt"
echo -e "  ${GREEN}✓${NC} Backend dependencies installed"

# Node dependencies
echo -e "${YELLOW}Installing Node dependencies...${NC}"
cd "$PROJECT_ROOT/frontend"
npm install --silent
echo -e "  ${GREEN}✓${NC} Frontend dependencies installed"

echo ""

# Create .env file for backend
echo -e "${YELLOW}Creating configuration...${NC}"
cat > "$PROJECT_ROOT/backend/.env" << EOF
USE_MOCK_DATA=false
DATABASE_URL=postgresql://$PGUSER@$PGHOST:$PGPORT/$PGDATABASE
PGHOST=$PGHOST
PGPORT=$PGPORT
PGUSER=$PGUSER
PGDATABASE=$PGDATABASE
EOF
echo -e "  ${GREEN}✓${NC} Backend .env created"

# Update frontend to disable MSW in production mode
cat > "$PROJECT_ROOT/frontend/.env" << EOF
VITE_USE_MOCK_API=false
VITE_API_URL=http://localhost:8000
EOF
echo -e "  ${GREEN}✓${NC} Frontend .env created"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Setup complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "To start the application, run:"
echo -e "  ${BLUE}cd $PROJECT_ROOT && ./scripts/start.sh${NC}"
echo ""
echo -e "Or start services individually:"
echo -e "  Backend:  ${BLUE}cd $PROJECT_ROOT && uvicorn backend.api.main:app --reload${NC}"
echo -e "  Frontend: ${BLUE}cd $PROJECT_ROOT/frontend && npm run dev${NC}"
echo ""
