#!/bin/bash

# Invoice & Quotation Management System - Setup Script
# Run this script to set up the project for local development

set -e

echo "📋 Setting up Invoice & Quotation Management System..."
echo ""

# Check Node.js version
echo "✓ Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "  Node.js $NODE_VERSION"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "  ✓ Dependencies installed"
echo ""

# Set up environment
echo "⚙️  Setting up environment..."
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "  ✓ Created .env.local"
else
  echo "  ✓ .env.local already exists"
fi
echo ""

# Initialize database
echo "🗄️  Initializing database..."
npx prisma db push --skip-generate
echo "  ✓ Database schema created"
echo ""

# Seed database
echo "🌱 Seeding database with initial data..."
npx ts-node prisma/seed.ts
echo "  ✓ Database seeded"
echo ""

# Build TypeScript
echo "📝 Building TypeScript..."
npm run type-check
echo "  ✓ Type check passed"
echo ""

echo "✅ Setup complete!"
echo ""
echo "🚀 To start development:"
echo "   npm run dev"
echo ""
echo "📍 Then open: http://localhost:3000"
echo ""
echo "🔑 Default credentials:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "⚠️  Change credentials immediately after first login!"
