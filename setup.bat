@echo off
REM Invoice & Quotation Management System - Setup Script for Windows
REM Run this script to set up the project for local development

setlocal enabledelayedexpansion

echo.
echo 📋 Setting up Invoice and Quotation Management System...
echo.

REM Check Node.js version
echo ✓ Checking Node.js version...
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo   Node.js %NODE_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if errorlevel 1 (
  echo ✗ Failed to install dependencies
  exit /b 1
)
echo   ✓ Dependencies installed
echo.

REM Set up environment
echo ⚙️  Setting up environment...
if not exist .env.local (
  copy .env.example .env.local
  echo   ✓ Created .env.local
) else (
  echo   ✓ .env.local already exists
)
echo.

REM Initialize database
echo 🗄️  Initializing database...
call npx prisma db push --skip-generate
if errorlevel 1 (
  echo ✗ Failed to initialize database
  exit /b 1
)
echo   ✓ Database schema created
echo.

REM Seed database
echo 🌱 Seeding database with initial data...
call npx ts-node prisma/seed.ts
if errorlevel 1 (
  echo ✗ Failed to seed database
  exit /b 1
)
echo   ✓ Database seeded
echo.

REM Build TypeScript
echo 📝 Building TypeScript...
call npm run type-check
if errorlevel 1 (
  echo ✗ Type check failed
  exit /b 1
)
echo   ✓ Type check passed
echo.

echo ✅ Setup complete!
echo.
echo 🚀 To start development:
echo    npm run dev
echo.
echo 📍 Then open: http://localhost:3000
echo.
echo 🔑 Default credentials:
echo    Username: admin
echo    Password: admin123
echo.
echo ⚠️  Change credentials immediately after first login!
echo.

pause
