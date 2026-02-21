#!/bin/bash

# Start frontend only with MSW mocks (no backend needed)

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Starting frontend with mock data..."
echo "Open http://localhost:5173"
echo ""

cd "$PROJECT_ROOT/frontend"
VITE_USE_MOCK_API=true npm run dev
