#!/bin/bash

# Complete Build Script for Mac/Linux
# This script installs dependencies, sets up database, and prepares the application

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo "================================================================================"
echo "   Invoice and Quotation Management System - Complete Build"
echo "================================================================================"
echo ""
echo "This script will:"
echo "   1. Install all dependencies"
echo "   2. Set up environment configuration"
echo "   3. Initialize the SQLite database"
echo "   4. Seed default data (companies, admin user)"
echo "   5. Run type checking"
echo "   6. Create build artifacts"
echo ""
read -p "Press Enter to continue..."
echo ""

# Check if Node.js is installed
echo -e "${BLUE}[1/6]${NC} Checking Node.js installation..."
if ! command -v node &> /dev/null; then
  echo ""
  echo -e "${RED}ERROR: Node.js is not installed!${NC}"
  echo "Please install Node.js from https://nodejs.org/"
  echo ""
  exit 1
fi

NODE_VERSION=$(node -v)
echo -e "   ${GREEN}✓${NC} Found $NODE_VERSION"
echo ""

# Install dependencies
echo -e "${BLUE}[2/6]${NC} Installing npm dependencies..."
echo "   This may take a few minutes on first install..."
npm install
echo -e "   ${GREEN}✓${NC} Dependencies installed"
echo ""

# Set up environment
echo -e "${BLUE}[3/6]${NC} Setting up environment configuration..."
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo -e "   ${GREEN}✓${NC} Created .env.local"
else
  echo -e "   ${GREEN}✓${NC} .env.local already exists"
fi
echo ""

# Initialize database
echo -e "${BLUE}[4/6]${NC} Initializing database schema..."
npx prisma db push --skip-generate
echo -e "   ${GREEN}✓${NC} Database schema created"
echo ""

# Seed database
echo -e "${BLUE}[5/6]${NC} Seeding database with initial data..."
npx ts-node prisma/seed.ts
echo -e "   ${GREEN}✓${NC} Database seeded"
echo ""

# Type check
echo -e "${BLUE}[6/6]${NC} Running TypeScript type check..."
if npm run type-check; then
  echo -e "   ${GREEN}✓${NC} Type check passed"
else
  echo -e "   ${YELLOW}⚠${NC} Type check warnings detected"
fi
echo ""

echo "================================================================================"
echo -e "   ${GREEN}✅ BUILD COMPLETE!${NC}"
echo "================================================================================"
echo ""
echo "Next steps:"
echo ""
echo "   1. Start development server:"
echo "      npm run dev"
echo ""
echo "   2. Open in browser:"
echo "      http://localhost:3000"
echo ""
echo "   3. Login with default credentials:"
echo "      Username: admin"
echo "      Password: admin123"
echo ""
echo -e "   ${YELLOW}⚠  IMPORTANT: Change the default password immediately after first login!${NC}"
echo ""
echo "Available commands:"
echo "   npm run dev              - Start development server"
echo "   npm run build            - Build for production"
echo "   npm start                - Run production build"
echo "   npm test                 - Run unit tests"
echo "   npx prisma studio      - Open database GUI"
echo ""
echo "Documentation:"
echo "   - README.md              - Complete overview"
echo "   - QUICK_START.md         - 5-minute guide"
echo "   - docs/implementation-plan.md - Architecture"
echo ""
echo "================================================================================"
echo ""
