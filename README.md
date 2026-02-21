# US Civil War Interactive Map

An interactive web application for exploring the American Civil War through maps, timelines, and battle details.

## Quick Start

### Option 1: Mock Data (No Setup Required)

```bash
./scripts/start-mock.sh
```
Open http://localhost:5173 - works immediately with mock data.

### Option 2: Full Stack with Real Database

```bash
# One-time setup (requires PostgreSQL with PostGIS)
./scripts/setup.sh

# Start both frontend and backend
./scripts/start.sh
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api/v1/docs

---

## Manual Setup

### Frontend Only (with Mocks)

```bash
cd frontend
npm install
npm run dev
```

### Backend API

```bash
pip install -r backend/requirements.txt
uvicorn backend.api.main:app --reload
```

### Database (PostgreSQL + PostGIS)

```bash
# Install PostgreSQL with PostGIS (macOS)
brew install postgresql@15 postgis
brew services start postgresql@15

# Run migrations and seed data
cd backend/db/scripts
./reset_db.sh
./seed_mock_data.sh
```

### Data Import Scripts (Optional)

```bash
cd data-import
pip install -r requirements.txt
python run_all.py
```

## Project Structure

```
civilwar/
├── frontend/          # React + Leaflet + TypeScript
├── backend/
│   ├── api/           # FastAPI REST API
│   └── db/            # PostgreSQL schema & migrations
├── data-import/       # Data scraping scripts
└── IMPLEMENTATION_PLAN.md
```

## Configuration

### Frontend
- Uses MSW (Mock Service Worker) by default
- To connect to real API, disable MSW in `src/main.tsx`

### Backend
- Set `USE_MOCK_DATA=false` in environment to use database
- Default: `USE_MOCK_DATA=true` (uses in-memory mock data)

## Features

- Interactive map with Civil War battle locations
- Timeline slider (1861-1865) with play/pause animation
- Click battles to view details, casualties, commanders
- Filter by event type, date range, theater
- State boundary overlays (Union/Confederate/Border)
