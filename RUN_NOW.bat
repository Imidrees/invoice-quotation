@echo off
REM Quick Start Script - Runs everything automatically
REM Just double-click this file and the app will open in your browser!

setlocal enabledelayedexpansion
color 0A

echo.
echo ================================================================================
echo   STARTING APPLICATION - Please wait...
echo ================================================================================
echo.

REM Check Node.js
node -v >nul 2>&1
if errorlevel 1 (
  echo.
  echo ERROR: Node.js is not installed!
  echo.
  echo Please install from: https://nodejs.org/
  echo After installation, restart your computer and try again.
  echo.
  pause
  exit /b 1
)

echo [1/3] Installing/updating dependencies...
call npm install >nul 2>&1
if errorlevel 1 (
  echo ERROR: Failed to install dependencies
  pause
  exit /b 1
)
echo OK - Dependencies ready
echo.

echo [2/3] Starting development server...
echo Please wait - server is starting...
echo.

REM Start the dev server and wait for it to be ready
start cmd /c "npm run dev"

echo.
echo [3/3] Waiting for server to start...
timeout /t 5 /nobreak

echo.
echo ================================================================================
echo   SERVER IS RUNNING!
echo ================================================================================
echo.
echo Opening http://localhost:3000 in your browser...
echo.

REM Open in default browser
start http://localhost:3000

echo.
echo ================================================================================
echo   The application is now running!
echo ================================================================================
echo.
echo Login with:
echo   Username: admin
echo   Password: admin123
echo.
echo The browser window should open automatically.
echo If it doesn't, visit: http://localhost:3000
echo.
echo To stop the server:
echo   Close the black command window that opened
echo   Or press CTRL+C in that window
echo.
pause
