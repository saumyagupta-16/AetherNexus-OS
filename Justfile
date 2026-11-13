# AetherNexus OS — Master Justfile Runner
# Usage:
#   just          - Starts both Backend (FastAPI on :8000) and Frontend (Next.js on :3000)
#   just dev      - Alias for starting both servers concurrently
#   just backend  - Runs Python FastAPI 50Hz Telemetry Core only
#   just frontend - Runs Next.js 16 App Router UI only
#   just build    - Builds Next.js production bundle
#   just install  - Installs all dependencies across Python and Node

set shell := ["powershell", "-c"]

# Default recipe: start both servers
default: dev

# Start both Backend & Frontend concurrently
dev:
    pnpm run dev

# Run FastAPI 50Hz Core on :8000
backend:
    cd backend; python main.py

# Run Next.js App Router on :3000
frontend:
    cd frontend; pnpm run dev

# Production Build
build:
    cd frontend; pnpm run build

# Start Production Server
start:
    cd frontend; pnpm run start

# Install all dependencies
install:
    pip install -r backend/requirements.txt
    pnpm install
    cd frontend; pnpm install

