#!/bin/bash
#
# Setup a new git worktree with proper configuration
#
# Usage:
#   ./scripts/setup-worktree.sh <branch-name> [port-offset]
#
# Examples:
#   ./scripts/setup-worktree.sh feature-maps 1      # frontend:5174, backend:8001
#   ./scripts/setup-worktree.sh bugfix-timeline 2   # frontend:5175, backend:8002
#
# This will create a worktree at ../civilwar-<branch-name>/

set -e

BRANCH=$1
OFFSET=${2:-1}

if [ -z "$BRANCH" ]; then
    echo "Usage: $0 <branch-name> [port-offset]"
    echo ""
    echo "Examples:"
    echo "  $0 feature-maps 1"
    echo "  $0 bugfix-timeline 2"
    exit 1
fi

# Get the directory where the main repo lives
MAIN_REPO="$(cd "$(dirname "$0")/.." && pwd)"
WORKTREE_PATH="$(dirname "$MAIN_REPO")/civilwar-${BRANCH}"

FRONTEND_PORT=$((5173 + OFFSET))
BACKEND_PORT=$((8000 + OFFSET))

echo "Setting up worktree for branch: $BRANCH"
echo "  Location: $WORKTREE_PATH"
echo "  Frontend port: $FRONTEND_PORT"
echo "  Backend port: $BACKEND_PORT"
echo ""

# Create the worktree
echo "Creating git worktree..."
git worktree add "$WORKTREE_PATH" -b "$BRANCH" 2>/dev/null || \
git worktree add "$WORKTREE_PATH" "$BRANCH"

# Copy and configure frontend .env
echo "Configuring frontend/.env..."
if [ -f "$MAIN_REPO/frontend/.env" ]; then
    cp "$MAIN_REPO/frontend/.env" "$WORKTREE_PATH/frontend/.env"
else
    touch "$WORKTREE_PATH/frontend/.env"
fi

# Remove any existing VITE_PORT and add new one
grep -v "^VITE_PORT=" "$WORKTREE_PATH/frontend/.env" > "$WORKTREE_PATH/frontend/.env.tmp" || true
mv "$WORKTREE_PATH/frontend/.env.tmp" "$WORKTREE_PATH/frontend/.env"
echo "VITE_PORT=$FRONTEND_PORT" >> "$WORKTREE_PATH/frontend/.env"

# Remove VITE_API_URL - when using mock API (default), we need relative URLs for MSW to work
# Only uncomment VITE_API_URL if you want to use the real backend
grep -v "^VITE_API_URL=" "$WORKTREE_PATH/frontend/.env" > "$WORKTREE_PATH/frontend/.env.tmp" || true
mv "$WORKTREE_PATH/frontend/.env.tmp" "$WORKTREE_PATH/frontend/.env"
echo "# VITE_API_URL=http://localhost:$BACKEND_PORT  # Uncomment to use real backend instead of mocks" >> "$WORKTREE_PATH/frontend/.env"

# Copy and configure backend .env
echo "Configuring backend/.env..."
if [ -f "$MAIN_REPO/backend/.env" ]; then
    cp "$MAIN_REPO/backend/.env" "$WORKTREE_PATH/backend/.env"
else
    touch "$WORKTREE_PATH/backend/.env"
fi

# Remove any existing PORT and add new one
grep -v "^PORT=" "$WORKTREE_PATH/backend/.env" > "$WORKTREE_PATH/backend/.env.tmp" || true
mv "$WORKTREE_PATH/backend/.env.tmp" "$WORKTREE_PATH/backend/.env"
echo "PORT=$BACKEND_PORT" >> "$WORKTREE_PATH/backend/.env"

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd "$WORKTREE_PATH/frontend"
npm install

# Setup backend virtual environment
echo "Setting up backend virtual environment..."
cd "$WORKTREE_PATH/backend"
python3 -m venv venv
source venv/bin/activate
pip install --index-url https://pypi.org/simple/ -r requirements.txt
deactivate

echo ""
echo "✓ Worktree setup complete!"
echo ""
echo "To start working:"
echo "  cd $WORKTREE_PATH"
echo ""
echo "To run frontend:"
echo "  cd frontend && npm run dev"
echo ""
echo "To run backend:"
echo "  cd backend && source venv/bin/activate && python -m api.main"
echo ""
echo "Ports:"
echo "  Frontend: http://localhost:$FRONTEND_PORT"
echo "  Backend:  http://localhost:$BACKEND_PORT"
