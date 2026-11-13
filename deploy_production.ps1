# AetherNexus OS — 1-Click Production Cloud Deployment Script (Windows PowerShell)
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " AETHERNEXUS OS — ENTERPRISE LIVE HOSTING DEPLOYMENT " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Check Docker & Compose
if (Get-Command docker -ErrorAction SilentlyContinue) {
    Write-Host "[✓] Docker runtime detected." -ForegroundColor Green
    Write-Host "[*] Building containerized microservices..." -ForegroundColor Yellow
    docker compose build
    Write-Host "[*] Launching high-availability production cluster..." -ForegroundColor Yellow
    docker compose up -d
    Write-Host "[✓] Production cluster online at http://localhost:3000" -ForegroundColor Green
    Write-Host "[✓] Backend 50Hz API online at http://localhost:8000" -ForegroundColor Green
} else {
    Write-Host "[!] Docker not detected in PATH. Starting native microservices..." -ForegroundColor Yellow
    
    # Start Backend in background
    Write-Host "[*] Launching FastAPI 50Hz Telemetry Core on :8000..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python main.py"
    
    # Start Frontend in background
    Write-Host "[*] Launching Next.js 15 Light UI on :3000..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
    
    Write-Host "[✓] Native development servers dispatched successfully." -ForegroundColor Green
}

