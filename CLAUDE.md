# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Frontend (in `frontend/`)
```bash
npm run dev      # Start Vite dev server (default port 5173, or VITE_PORT)
npm run build    # TypeScript check + production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

### Backend (in `backend/`)
```bash
uvicorn backend.api.main:app --reload  # Start FastAPI server on port 8000
```

### Quick Start
```bash
./scripts/start-mock.sh  # Frontend with mock data (no backend needed)
./scripts/start.sh       # Full stack (requires PostgreSQL + PostGIS)
```

### Database Setup (requires PostgreSQL 15+ with PostGIS)
```bash
cd backend/db/scripts
./reset_db.sh
./seed_mock_data.sh
```

### Worktrees
**Always use the setup script** to create worktrees (sets up independent ports, installs deps):
```bash
./scripts/setup-worktree.sh <branch-name> <port-offset>
# Example: ./scripts/setup-worktree.sh my-feature 5  → frontend:5178, backend:8005
```
Do NOT use `git worktree add` directly.

## Architecture

### Stack Overview
- **Frontend**: React 19 + TypeScript + Vite + TanStack Query + Leaflet + Tailwind CSS
- **Backend**: FastAPI + SQLAlchemy 2.0 + PostgreSQL/PostGIS
- **Mocking**: MSW (frontend) and in-memory repositories (backend) enable independent development

### Frontend Structure (`frontend/src/`)
```
components/
├── BattleDeep/       # Deep battle exploration (hour-by-hour timeline, unit positions)
├── DetailPanel/      # Event and person detail views
├── Map/              # Leaflet map, markers, boundary layers
├── Timeline/         # Timeline slider with play/pause
├── Filters/          # Event type and date filtering
└── CommanderTracker/ # Army movement visualization

hooks/
├── useDeepLink.ts    # URL param ↔ UI state sync
├── useBattleDeep.ts  # Battle navigation (registry-based, currently Gettysburg)
├── useEvents.ts      # Events API with TanStack Query
├── usePeople.ts      # People API with TanStack Query
└── useBoundaries.ts  # State boundaries API

mocks/                # MSW handlers + mock data (events, people, boundaries)
```

### Key Patterns

**Deep Linking**: `useDeepLink` syncs URL params with selection state
- URL format: `?event=battle-slug&person=person-name`
- Slug conversion: `eventNameToSlug()` in `utils/slugs.ts` ("Battle of Gettysburg" → "gettysburg")

**State Management**: App.tsx orchestrates selection state (`selectedEventId`, `selectedPersonName`, `deepBattleId`) with TanStack Query for server state (5-min cache).

**Battle Deep Dive**: `useBattleDeep` provides hour-by-hour battle exploration with hierarchical military units (Corps→Division→Brigade→Regiment), unit positions, and landmarks. Currently implemented for Gettysburg only.

### Backend API (`/api/v1/`)
```
/events, /events/:id, /events/:id/participants, /events/timeline
/people, /people/:id, /people/:id/events
/locations, /locations/:id, /locations/bounds
/boundaries
/units, /units/:id
/stats/casualties, /stats/timeline
```

API docs at http://localhost:8000/api/v1/docs when backend is running.

### Data Flow
1. MSW intercepts API calls when `VITE_USE_MOCK_API=true` (default)
2. Backend uses mock repositories when `USE_MOCK_DATA=true` (default)
3. Real data: disable MSW in `main.tsx`, set `USE_MOCK_DATA=false` for backend

## Environment Variables

### Frontend
- `VITE_PORT` - Dev server port (default: 5173)
- `VITE_API_URL` - Backend URL (default: http://localhost:8000)
- `VITE_USE_MOCK_API` - Use MSW mocking (default: true)

### Backend
- `USE_MOCK_DATA` - Use in-memory mock data (default: true)
- `DATABASE_URL` - PostgreSQL connection string (when not mocking)
