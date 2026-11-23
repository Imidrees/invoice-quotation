#!/bin/bash
# Quick Start Script - Runs everything automatically
# Just run: bash RUN_NOW.sh

echo ""
echo "================================================================================"
echo "   STARTING APPLICATION - Please wait..."
echo "================================================================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "ERROR: Node.js is not installed!"
  echo ""
  echo "Please install from: https://nodejs.org/"
  echo "After installation, try again."
  echo ""
  exit 1
fi

echo "[1/3] Installing/updating dependencies..."
npm install > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "ERROR: Failed to install dependencies"
  exit 1
fi
echo "OK - Dependencies ready"
echo ""

echo "[2/3] Starting development server..."
echo "Please wait - server is starting..."
echo ""

# Start the dev server
npm run dev &
SERVER_PID=$!

echo "[3/3] Waiting for server to start..."
sleep 5

echo ""
echo "================================================================================"
echo "   SERVER IS RUNNING!"
echo "================================================================================"
echo ""
echo "Opening http://localhost:3000 in your browser..."
echo ""

# Open in default browser (Mac/Linux)
if command -v open &> /dev/null; then
  open http://localhost:3000
elif command -v xdg-open &> /dev/null; then
  xdg-open http://localhost:3000
else
  echo "Please open in your browser: http://localhost:3000"
fi

echo ""
echo "================================================================================"
echo "   The application is now running!"
echo "================================================================================"
echo ""
echo "Login with:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "The browser window should open automatically."
echo "If it doesn't, visit: http://localhost:3000"
echo ""
echo "To stop the server: Press CTRL+C"
echo ""

# Wait for the server process
wait $SERVER_PID
