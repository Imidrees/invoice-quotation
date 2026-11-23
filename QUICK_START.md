# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Windows Users

```bash
# 1. Navigate to project
cd C:\Users\Admin\Desktop\QUOTATION

# 2. Run setup script
setup.bat

# 3. Start development
npm run dev

# 4. Open in browser
# Visit: http://localhost:3000
```

### Mac/Linux Users

```bash
# 1. Navigate to project
cd /path/to/QUOTATION

# 2. Run setup script
bash setup.sh

# 3. Start development
npm run dev

# 4. Open in browser
# Visit: http://localhost:3000
```

---

## 📝 Manual Setup (If Scripts Don't Work)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Environment Variables
```bash
# Copy example to local
cp .env.example .env.local

# Edit .env.local if needed (default values should work for local dev)
```

### Step 3: Initialize Database
```bash
# Create SQLite database and schema
npx prisma db push --skip-generate

# Seed with initial data (companies, default user)
npx ts-node prisma/seed.ts
```

### Step 4: Start Development Server
```bash
npm run dev
```

### Step 5: Access Application
Open **http://localhost:3000** in your browser

---

## 🔑 Default Login

**After seeding, use these credentials:**

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

⚠️ **Important:** Change these credentials immediately after first login!

---

## 📊 First Test Workflow

### 1. Login
- Navigate to http://localhost:3000
- Enter username: `admin`
- Enter password: `admin123`
- Click "Sign In"

### 2. Create Your First Invoice
- Dashboard → "Create Invoice"
- Select Company: "AMANI" or "DIOUF"
- Invoice Number: `INV-001`
- Invoice Date: Today
- Customer Name: "Test Customer"
- Add Line Items:
  - Description: "Professional Services"
  - Quantity: `1`
  - Rate: `1000.00`
- Click "Create Invoice"
- System auto-calculates VAT (15%) and grand total

### 3. View Invoice
- Navigate to "All Invoices"
- See your created invoice in the list
- Click "View" to see details
- Totals calculated: Subtotal + VAT = Grand Total

### 4. Test Calculations
Verify math:
- Line Amount: 1 × 1000.00 = 1000.00
- Subtotal: 1000.00
- VAT (15%): 150.00
- **Grand Total: 1150.00** ✓

---

## 📁 Project Structure

```
QUOTATION/
├── src/
│   ├── app/
│   │   ├── api/              # Backend API routes
│   │   ├── dashboard/        # Dashboard pages
│   │   ├── page.tsx          # Login page
│   │   └── layout.tsx        # Root layout
│   ├── lib/
│   │   ├── auth.ts           # Authentication
│   │   ├── calculations.ts   # Financial math
│   │   ├── qr.ts             # QR code generation
│   │   ├── constants.ts      # Company data
│   │   └── validation.ts     # Input validation
│   └── types/
│       └── index.ts          # TypeScript types
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed script
├── docs/
│   ├── source-asset-inventory.md
│   └── implementation-plan.md
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

---

## 🛠️ Useful Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm start                # Run production build

# Database
npx prisma db push      # Update schema
npx prisma studio      # Open database GUI
npx prisma db seed     # Run seed script

# Testing
npm test                 # Run tests
npm run test:watch      # Watch mode

# Code Quality
npm run type-check      # TypeScript type checking
npm run lint            # Run linter

# Data Management
npx prisma db push --force-reset  # ⚠️ Reset database (dev only)
```

---

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### "SQLite database is locked"
```bash
# Kill any running Node processes
# Windows: taskkill /F /IM node.exe
# Mac/Linux: killall node

# Then restart:
npm run dev
```

### Port 3000 already in use
```bash
# Start on different port
PORT=3001 npm run dev
# Then visit: http://localhost:3001
```

### Database errors
```bash
# Reset database (⚠️ deletes all data)
npx prisma db push --force-reset
npx ts-node prisma/seed.ts
```

---

## ✅ What's Implemented

### ✓ Authentication & Security
- Shared login (admin username/password)
- Password hashing (bcryptjs)
- JWT session tokens
- HTTP-only cookies

### ✓ Companies
- AMANI MUHAMMAD AL OTAIBI (Company 1)
- DIOUF ALSHARQ (Company 2)
- Strict data isolation
- Separate templates per company

### ✓ Invoices
- Manual invoice numbering (company-scoped unique)
- Line items (1-10 per invoice)
- Automatic calculations (line amount, subtotal, VAT, grand total)
- QR code generation (Saudi VAT Phase 1)
- Document status tracking (draft, saved, archived)

### ✓ Quotations
- Manual quotation references (company-scoped unique)
- Line items with units (1-10 per quotation)
- Automatic calculations
- Project/client information
- Validity periods

### ✓ Database
- SQLite for local development
- Prisma ORM for type-safe queries
- Migrations support
- Activity logging schema

### ✓ UI/UX
- Responsive mobile-first design
- Dashboard with quick actions
- Invoice/quotation list pages
- Form validation
- Error handling

### ✓ Testing
- Unit tests for calculations
- Unit tests for QR encoding
- Validation schema tests
- Ready for integration tests

---

## ⏳ Next Phases

### Phase 3: Customer & Document Data
- Customer CRUD operations
- Document versioning
- Activity logging
- Advanced validations

### Phase 4: PDF Templates
- HTML/CSS templates for each company
- Playwright PDF generation
- Arabic text and RTL layout
- Logo embedding
- Visual regression tests

### Phase 5: Dashboard & Search
- Dashboard metrics
- Advanced search filters
- Archive/restore UI
- Settings pages

### Phase 6: QA & Production
- Comprehensive test suite
- Security hardening
- Performance optimization
- Production deployment setup

---

## 📞 Support

If you encounter issues:

1. **Check logs**: Look at terminal output for error messages
2. **Review docs**: See `README.md` and `docs/` folder
3. **Database issues**: Try resetting with `npx prisma db push --force-reset`
4. **Dependencies**: Reinstall with `npm install`

---

## 📋 Before You Go Live

- [ ] Change default admin password
- [ ] Review company information in database
- [ ] Test invoice creation workflow
- [ ] Verify calculations are accurate
- [ ] Check QR code generation
- [ ] Test on mobile device
- [ ] Review security settings
- [ ] Set up backups
- [ ] Create deployment plan

---

**Happy coding! 🚀**

For detailed documentation, see:
- `README.md` - Complete project overview
- `docs/implementation-plan.md` - Architecture and design decisions
- `docs/source-asset-inventory.md` - Source PDF references
