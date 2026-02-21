#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  US Civil War Map - Simple Setup${NC}"
echo -e "${BLUE}  (No PostGIS required)${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Database setup
export PGHOST=${PGHOST:-localhost}
export PGPORT=${PGPORT:-5432}
export PGUSER=${PGUSER:-$(whoami)}
export PGDATABASE=${PGDATABASE:-civilwar}

echo -e "${YELLOW}Setting up database...${NC}"
echo "  Database: $PGDATABASE @ $PGHOST:$PGPORT"

# Check if PostgreSQL is running
if ! pg_isready -h $PGHOST -p $PGPORT &> /dev/null; then
    echo -e "${RED}PostgreSQL is not running. Start it with:${NC}"
    echo "  brew services start postgresql@14"
    exit 1
fi

# Drop and recreate database
echo "  Dropping existing database..."
dropdb -h $PGHOST -p $PGPORT --if-exists $PGDATABASE 2>/dev/null || true
echo "  Creating database..."
createdb -h $PGHOST -p $PGPORT $PGDATABASE
echo -e "  ${GREEN}✓${NC} Database created"

# Run simple schema
echo "  Running schema..."
psql -h $PGHOST -p $PGPORT -d $PGDATABASE -f "$PROJECT_ROOT/backend/db/migrations/001_initial_schema_simple.sql" > /dev/null
echo -e "  ${GREEN}✓${NC} Schema created"

# Seed with sample data
echo "  Seeding locations..."
psql -h $PGHOST -p $PGPORT -d $PGDATABASE << 'EOF' > /dev/null
INSERT INTO locations (id, name, type, latitude, longitude, state, description) VALUES
(1, 'Fort Sumter', 'fort', 32.7522, -79.8745, 'South Carolina', 'Site of first shots of Civil War'),
(2, 'Gettysburg', 'battlefield', 39.8309, -77.2311, 'Pennsylvania', 'Turning point of the war'),
(3, 'Antietam', 'battlefield', 39.4747, -77.7442, 'Maryland', 'Bloodiest single day in American history'),
(4, 'Appomattox Court House', 'landmark', 37.3765, -78.7969, 'Virginia', 'Site of Lee''s surrender'),
(5, 'Vicksburg', 'battlefield', 32.3526, -90.8779, 'Mississippi', 'Key to control of Mississippi River'),
(6, 'Bull Run', 'battlefield', 38.8128, -77.5214, 'Virginia', 'First major battle of the war'),
(7, 'Shiloh', 'battlefield', 35.1492, -88.3389, 'Tennessee', 'Major battle in Western Theater'),
(8, 'Fredericksburg', 'battlefield', 38.3032, -77.4605, 'Virginia', 'Confederate defensive victory'),
(9, 'Chancellorsville', 'battlefield', 38.3118, -77.6469, 'Virginia', 'Lee''s greatest victory'),
(10, 'Richmond', 'capital', 37.5407, -77.4360, 'Virginia', 'Capital of the Confederacy');
SELECT setval('locations_id_seq', 10);
EOF
echo -e "  ${GREEN}✓${NC} Locations seeded"

echo "  Seeding people..."
psql -h $PGHOST -p $PGPORT -d $PGDATABASE << 'EOF' > /dev/null
INSERT INTO people (id, name, birth_date, death_date, side, rank, highest_rank, biography, wikipedia_url) VALUES
(1, 'Ulysses S. Grant', '1822-04-27', '1885-07-23', 'union', 'Brigadier General', 'General of the Army', 'Commanding General of the Union Army and 18th President', 'https://en.wikipedia.org/wiki/Ulysses_S._Grant'),
(2, 'Robert E. Lee', '1807-01-19', '1870-10-12', 'confederate', 'Colonel', 'General', 'Commanding General of the Confederate Army', 'https://en.wikipedia.org/wiki/Robert_E._Lee'),
(3, 'William Tecumseh Sherman', '1820-02-08', '1891-02-14', 'union', 'Colonel', 'General of the Army', 'Led the March to the Sea', 'https://en.wikipedia.org/wiki/William_Tecumseh_Sherman'),
(4, 'Thomas J. "Stonewall" Jackson', '1824-01-21', '1863-05-10', 'confederate', 'Major', 'Lieutenant General', 'Lee''s most trusted commander', 'https://en.wikipedia.org/wiki/Stonewall_Jackson'),
(5, 'George Meade', '1815-12-31', '1872-11-06', 'union', 'Brigadier General', 'Major General', 'Victor at Gettysburg', 'https://en.wikipedia.org/wiki/George_Meade'),
(6, 'James Longstreet', '1821-01-08', '1904-01-02', 'confederate', 'Major', 'Lieutenant General', 'Lee''s "Old War Horse"', 'https://en.wikipedia.org/wiki/James_Longstreet'),
(7, 'Abraham Lincoln', '1809-02-12', '1865-04-15', 'union', NULL, 'President', '16th President of the United States', 'https://en.wikipedia.org/wiki/Abraham_Lincoln'),
(8, 'Jefferson Davis', '1808-06-03', '1889-12-06', 'confederate', NULL, 'President', 'President of the Confederate States', 'https://en.wikipedia.org/wiki/Jefferson_Davis');
SELECT setval('people_id_seq', 8);
EOF
echo -e "  ${GREEN}✓${NC} People seeded"

echo "  Seeding events..."
psql -h $PGHOST -p $PGPORT -d $PGDATABASE << 'EOF' > /dev/null
INSERT INTO events (id, name, type, date_start, date_end, location_id, result, significance, theater, description) VALUES
(1, 'Battle of Fort Sumter', 'battle', '1861-04-12', '1861-04-13', 1, 'Confederate victory', 5, 'Eastern', 'First shots of the Civil War'),
(2, 'First Battle of Bull Run', 'battle', '1861-07-21', '1861-07-21', 6, 'Confederate victory', 4, 'Eastern', 'First major battle of the war'),
(3, 'Battle of Shiloh', 'battle', '1862-04-06', '1862-04-07', 7, 'Union victory', 4, 'Western', 'Major battle in Tennessee'),
(4, 'Battle of Antietam', 'battle', '1862-09-17', '1862-09-17', 3, 'Union victory', 5, 'Eastern', 'Bloodiest single day battle'),
(5, 'Battle of Fredericksburg', 'battle', '1862-12-11', '1862-12-15', 8, 'Confederate victory', 3, 'Eastern', 'Union assault against fortified positions'),
(6, 'Battle of Chancellorsville', 'battle', '1863-04-30', '1863-05-06', 9, 'Confederate victory', 4, 'Eastern', 'Lee''s greatest victory'),
(7, 'Battle of Gettysburg', 'battle', '1863-07-01', '1863-07-03', 2, 'Union victory', 5, 'Eastern', 'Turning point of the war'),
(8, 'Siege of Vicksburg', 'siege', '1863-05-18', '1863-07-04', 5, 'Union victory', 5, 'Western', 'Union gains control of Mississippi'),
(9, 'Appomattox Campaign', 'battle', '1865-04-09', '1865-04-09', 4, 'Union victory', 5, 'Eastern', 'Lee surrenders to Grant');
SELECT setval('events_id_seq', 9);

INSERT INTO event_casualties (event_id, side, killed, wounded, captured, total_engaged) VALUES
(1, 'union', 2, 0, 0, 85),
(1, 'confederate', 0, 4, 0, 500),
(4, 'union', 2108, 9540, 753, 75000),
(4, 'confederate', 1546, 7752, 1018, 52000),
(7, 'union', 3155, 14529, 5365, 83289),
(7, 'confederate', 4708, 12693, 5830, 75000);

INSERT INTO person_event_roles (person_id, event_id, role, unit_commanded) VALUES
(1, 8, 'commander', 'Army of the Tennessee'),
(2, 7, 'commander', 'Army of Northern Virginia'),
(5, 7, 'commander', 'Army of the Potomac'),
(4, 6, 'commander', 'II Corps'),
(6, 7, 'subordinate', 'I Corps');
EOF
echo -e "  ${GREEN}✓${NC} Events seeded"

echo "  Seeding boundaries..."
psql -h $PGHOST -p $PGPORT -d $PGDATABASE << 'EOF' > /dev/null
INSERT INTO territory_boundaries (name, type, valid_from, valid_to, side, geojson) VALUES
('Virginia', 'state', '1861-04-17', '1865-04-09', 'confederate', '{"type":"Feature","properties":{"name":"Virginia"},"geometry":{"type":"Polygon","coordinates":[[[-83.67,36.6],[-75.24,36.55],[-75.87,37.55],[-76.3,39.2],[-79.5,39.2],[-80.5,39.2],[-83.67,36.6]]]}}'),
('Pennsylvania', 'state', '1861-01-01', '1865-12-31', 'union', '{"type":"Feature","properties":{"name":"Pennsylvania"},"geometry":{"type":"Polygon","coordinates":[[[-80.52,39.72],[-74.69,39.72],[-75.12,41.35],[-79.76,42.27],[-80.52,42.33],[-80.52,39.72]]]}}'),
('Maryland', 'state', '1861-01-01', '1865-12-31', 'border', '{"type":"Feature","properties":{"name":"Maryland"},"geometry":{"type":"Polygon","coordinates":[[[-79.48,39.2],[-75.05,38.45],[-75.95,37.95],[-76.24,38.36],[-77.04,38.71],[-77.72,39.32],[-79.48,39.72],[-79.48,39.2]]]}}'),
('South Carolina', 'state', '1860-12-20', '1865-04-09', 'confederate', '{"type":"Feature","properties":{"name":"South Carolina"},"geometry":{"type":"Polygon","coordinates":[[[-83.35,32.03],[-79.45,32.03],[-78.54,33.87],[-80.78,34.82],[-83.11,35.0],[-83.35,34.48],[-83.35,32.03]]]}}'),
('Tennessee', 'state', '1861-06-08', '1865-04-09', 'confederate', '{"type":"Feature","properties":{"name":"Tennessee"},"geometry":{"type":"Polygon","coordinates":[[[-90.31,35.0],[-81.68,35.0],[-81.68,36.61],[-83.67,36.61],[-88.07,36.68],[-90.31,35.0]]]}}');
EOF
echo -e "  ${GREEN}✓${NC} Boundaries seeded"

# Install Python dependencies
echo ""
echo -e "${YELLOW}Installing Python dependencies...${NC}"
pip3 install -q -r "$PROJECT_ROOT/backend/requirements.txt" 2>/dev/null || pip3 install -q fastapi uvicorn pydantic python-dotenv sqlalchemy
echo -e "  ${GREEN}✓${NC} Backend dependencies installed"

# Node dependencies
echo -e "${YELLOW}Installing Node dependencies...${NC}"
cd "$PROJECT_ROOT/frontend"
npm install --silent 2>/dev/null
echo -e "  ${GREEN}✓${NC} Frontend dependencies installed"

# Create .env files
echo ""
echo -e "${YELLOW}Creating configuration...${NC}"
cat > "$PROJECT_ROOT/backend/.env" << EOF
USE_MOCK_DATA=false
DATABASE_URL=postgresql://$PGUSER@$PGHOST:$PGPORT/$PGDATABASE
EOF
cat > "$PROJECT_ROOT/frontend/.env" << EOF
VITE_USE_MOCK_API=false
VITE_API_URL=http://localhost:8000
EOF
echo -e "  ${GREEN}✓${NC} Configuration created"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Setup complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Database has:"
psql -h $PGHOST -p $PGPORT -d $PGDATABASE -t -c "SELECT 'Locations: ' || COUNT(*) FROM locations;"
psql -h $PGHOST -p $PGPORT -d $PGDATABASE -t -c "SELECT 'People: ' || COUNT(*) FROM people;"
psql -h $PGHOST -p $PGPORT -d $PGDATABASE -t -c "SELECT 'Events: ' || COUNT(*) FROM events;"
echo ""
echo -e "To start: ${BLUE}./scripts/start.sh${NC}"
