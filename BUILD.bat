@echo off
REM Complete Build Script for Windows
REM This script installs dependencies, sets up database, and prepares the application

setlocal enabledelayedexpansion
color 0A

echo.
echo ================================================================================
echo   Invoice and Quotation Management System - Complete Build
echo ================================================================================
echo.
echo This script will:
echo   1. Install all dependencies
echo   2. Set up environment configuration
echo   3. Initialize the SQLite database
echo   4. Seed default data (companies, admin user)
echo   5. Run type checking
echo   6. Create build artifacts
echo.
pause

REM Check if Node.js is installed
echo [1/6] Checking Node.js installation...
node -v >nul 2>&1
if errorlevel 1 (
  echo.
  echo ERROR: Node.js is not installed!
  echo Please install Node.js from https://nodejs.org/
  echo.
  pause
  exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo   ✓ Found !NODE_VERSION!
echo.

REM Install dependencies
echo [2/6] Installing npm dependencies...
echo   This may take a few minutes on first install...
call npm install
if errorlevel 1 (
  echo.
  echo ERROR: Failed to install dependencies
  echo.
  pause
  exit /b 1
)
echo   ✓ Dependencies installed
echo.

REM Set up environment
echo [3/6] Setting up environment configuration...
if not exist .env.local (
  copy .env.example .env.local >nul
  echo   ✓ Created .env.local
) else (
  echo   ✓ .env.local already exists
)
echo.

REM Initialize database
echo [4/6] Initializing database schema...
call npx prisma db push --skip-generate
if errorlevel 1 (
  echo.
  echo ERROR: Failed to initialize database
  echo.
  pause
  exit /b 1
)
echo   ✓ Database schema created
echo.

REM Seed database
echo [5/6] Seeding database with initial data...
call npx ts-node prisma/seed.ts
if errorlevel 1 (
  echo.
  echo ERROR: Failed to seed database
  echo.
  pause
  exit /b 1
)
echo   ✓ Database seeded
echo.

REM Type check
echo [6/6] Running TypeScript type check...
call npm run type-check
if errorlevel 1 (
  echo.
  echo WARNING: Type check warnings detected
  echo Application may still run, but please review issues
  echo.
) else (
  echo   ✓ Type check passed
)
echo.

echo ================================================================================
echo   ✅ BUILD COMPLETE!
echo ================================================================================
echo.
echo Next steps:
echo.
echo   1. Start development server:
echo      npm run dev
echo.
echo   2. Open in browser:
echo      http://localhost:3000
echo.
echo   3. Login with default credentials:
echo      Username: admin
echo      Password: admin123
echo.
echo ⚠️  IMPORTANT: Change the default password immediately after first login!
echo.
echo Available commands:
echo   npm run dev              - Start development server
echo   npm run build            - Build for production
echo   npm start                - Run production build
echo   npm test                 - Run unit tests
echo   npx prisma studio      - Open database GUI
echo.
echo Documentation:
echo   - README.md              - Complete overview
echo   - QUICK_START.md         - 5-minute guide
echo   - docs/implementation-plan.md - Architecture
echo.
echo ================================================================================
echo.
pause
