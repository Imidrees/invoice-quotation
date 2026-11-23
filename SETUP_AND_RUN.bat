@echo off
REM Complete automated setup and run script for Windows PowerShell

setlocal enabledelayedexpansion
color 0A

echo.
echo ================================================================================
echo   INVOICE & QUOTATION MANAGEMENT SYSTEM - COMPLETE SETUP & RUN
echo ================================================================================
echo.

REM Navigate to project
cd /d "C:\Users\Admin\Desktop\QUOTATION"

REM Verify we're in the right directory
if not exist package.json (
  echo ERROR: package.json not found!
  echo Current directory: %cd%
  pause
  exit /b 1
)

echo Current directory: %cd%
echo.

REM Step 1: Create .env.local if it doesn't exist
echo [1/5] Setting up environment...
if not exist .env.local (
  copy .env.example .env.local >nul
  echo   Created .env.local
) else (
  echo   .env.local already exists
)
echo.

REM Step 2: Install dependencies
echo [2/5] Installing npm dependencies...
call npm install
if errorlevel 1 (
  echo ERROR: npm install failed
  pause
  exit /b 1
)
echo   OK - Dependencies installed
echo.

REM Step 3: Initialize database
echo [3/5] Initializing database...
call npx prisma db push --skip-generate
if errorlevel 1 (
  echo ERROR: Database initialization failed
  pause
  exit /b 1
)
echo   OK - Database ready
echo.

REM Step 4: Seed database
echo [4/5] Seeding database with initial data...
call npx ts-node prisma/seed.ts
if errorlevel 1 (
  echo ERROR: Database seeding failed
  pause
  exit /b 1
)
echo   OK - Database seeded
echo.

REM Step 5: Start dev server
echo [5/5] Starting development server...
echo.
echo ================================================================================
echo   STARTING APPLICATION...
echo ================================================================================
echo.
echo   The browser will open automatically in 5 seconds.
echo.
echo   If it doesn't open, visit: http://localhost:3000
echo.
echo   Login credentials:
echo     Username: admin
echo     Password: admin123
echo.
echo   To stop the server: Press CTRL+C
echo.
echo ================================================================================
echo.

timeout /t 3 /nobreak

REM Open browser
start http://localhost:3000

REM Start dev server
call npm run dev

