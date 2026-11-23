#!/usr/bin/env pwsh

# PowerShell Script to Setup and Run the Application

Write-Host ""
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host "   INVOICE & QUOTATION MANAGEMENT SYSTEM - COMPLETE SETUP & RUN" -ForegroundColor Cyan
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to project
$projectPath = "C:\Users\Admin\Desktop\QUOTATION"
Set-Location $projectPath
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Check if package.json exists
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: package.json not found!" -ForegroundColor Red
    pause
    exit 1
}

# Step 1: Create .env.local if it doesn't exist
Write-Host "[1/5] Setting up environment..." -ForegroundColor Yellow
if (-not (Test-Path ".env.local")) {
    Copy-Item ".env.example" ".env.local"
    Write-Host "   Created .env.local" -ForegroundColor Green
} else {
    Write-Host "   .env.local already exists" -ForegroundColor Green
}
Write-Host ""

# Step 2: Install dependencies
Write-Host "[2/5] Installing npm dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: npm install failed" -ForegroundColor Red
    pause
    exit 1
}
Write-Host "   OK - Dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 3: Initialize database
Write-Host "[3/5] Initializing database..." -ForegroundColor Yellow
npx prisma db push --skip-generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Database initialization failed" -ForegroundColor Red
    pause
    exit 1
}
Write-Host "   OK - Database ready" -ForegroundColor Green
Write-Host ""

# Step 4: Seed database
Write-Host "[4/5] Seeding database with initial data..." -ForegroundColor Yellow
npx ts-node prisma/seed.ts
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Database seeding failed" -ForegroundColor Red
    pause
    exit 1
}
Write-Host "   OK - Database seeded" -ForegroundColor Green
Write-Host ""

# Step 5: Start dev server
Write-Host "[5/5] Starting development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host "   STARTING APPLICATION..." -ForegroundColor Cyan
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "   The browser will open automatically in 3 seconds." -ForegroundColor Green
Write-Host ""
Write-Host "   If it doesn't open, visit: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "   Login credentials:" -ForegroundColor Green
Write-Host "     Username: admin" -ForegroundColor Green
Write-Host "     Password: admin123" -ForegroundColor Green
Write-Host ""
Write-Host "   To stop the server: Press CTRL+C" -ForegroundColor Green
Write-Host ""
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host ""

Start-Sleep -Seconds 3

# Open browser
Start-Process "http://localhost:3000"

# Start dev server
npm run dev
