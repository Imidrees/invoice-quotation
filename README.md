# Invoice & Quotation Management System

## Project Overview

A production-ready web application for creating, managing, and generating invoices and quotations for two Saudi companies:
1. **AMANI MUHAMMAD AL OTAIBI GENERAL CONTRACTING COMPANY**
2. **DIOUF ALSHARQ GENERAL CONTRACTING COMPANY**

The system supports:
- Secure shared login (MVP requirement)
- Company separation with distinct templates
- Invoice and quotation creation with 1-10 line items
- Automatic calculations (subtotal, VAT 15%, grand total)
- Invoice QR code generation (Saudi VAT Phase 1)
- PDF generation matching source document designs
- Customer management
- Document search, archive, and restore
- Responsive mobile-first UI

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: SQLite (local), PostgreSQL-ready architecture
- **ORM**: Prisma
- **Validation**: Zod
- **Authentication**: bcryptjs + JWT
- **PDF Generation**: Playwright/Chromium
- **QR Codes**: qrcode library with TLV encoding
- **Styling**: Tailwind CSS (to be added)

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Windows/Mac/Linux

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file (copy from `.env.example`):

```bash
cp .env.example .env.local
```

Edit `.env.local` and ensure:
- `DATABASE_URL="file:./dev.db"` (for local SQLite)
- `JWT_SECRET=your-secret-key-change-in-production`
- `SESSION_EXPIRY_HOURS=24`

### 3. Initialize the Database

```bash
npx prisma db push
```

This creates the SQLite database and schema.

### 4. Create Initial User Account

Run the registration endpoint to create the shared login:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "SecurePassword123"}'
```

Replace with your preferred credentials.

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

## Usage

### First Run

1. Open http://localhost:3000 in your browser
2. Login with the credentials you created
3. Navigate to the dashboard
4. Select a company (AMANI or DIOUF)
5. Create an invoice or quotation
6. Add line items (1-10)
7. Preview and download PDF

### Key Workflows

#### Create an Invoice
1. Dashboard → "Create Invoice"
2. Select company
3. Enter invoice number (manual, company-scoped unique)
4. Set invoice date
5. Select or add customer
6. Add line items with descriptions, quantities, rates
7. System calculates subtotals and VAT (15%)
8. Preview and save
9. Download/print PDF

#### Create a Quotation
1. Dashboard → "Create Quotation"
2. Select company
3. Enter quotation reference (manual)
4. Set quotation date and validity
5. Add project/client details
6. Add work items (1-10 rows)
7. System calculates totals
8. Preview and save
9. Download/print PDF

#### Search Documents
- Use the search bar to find invoices/quotations by number, reference, company, or date
- Filter by document type, date range, or status

#### Manage Archive
- Deleted documents move to archive (recoverable)
- Restore from archive if needed
- Permanent deletion requires separate confirmation

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # Login, logout, register
│   │   │   ├── companies/    # Company data
│   │   │   ├── customers/    # Customer CRUD
│   │   │   ├── invoices/     # Invoice CRUD and PDF
│   │   │   ├── quotations/   # Quotation CRUD and PDF
│   │   │   └── documents/    # Search, archive, restore
│   │   ├── (pages)/          # Page components
│   │   └── layout.tsx        # Root layout
│   ├── components/           # Reusable UI components
│   ├── lib/
│   │   ├── auth.ts           # Auth helpers
│   │   ├── calculations.ts   # Financial calculations
│   │   ├── constants.ts      # App constants & company data
│   │   ├── prisma.ts         # Prisma client
│   │   ├── qr.ts             # QR code generation
│   │   └── validation.ts     # Zod schemas
│   ├── types/                # TypeScript types
│   └── utils/                # Utility functions
├── prisma/
│   └── schema.prisma         # Database schema
├── docs/
│   ├── source-asset-inventory.md  # PDF reference inventory
│   └── implementation-plan.md      # Architecture notes
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run tests
npm test

# Watch tests
npm run test:watch

# Type check
npm run type-check

# Lint code
npm run lint

# Push database schema changes
npx prisma db push

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset local database (dev only)
npx prisma db push --force-reset
```

## Database Schema

The system uses these main entities:

- **User**: Shared login credentials
- **Session**: Active user sessions
- **Company**: AMANI and DIOUF company details
- **CompanySetting**: VAT rate, currency, timezone per company
- **Customer**: Customer records (company-scoped)
- **Invoice**: Invoice data with manual numbering
- **InvoiceLineItem**: Line items for invoices
- **Quotation**: Quotation data with manual references
- **QuotationLineItem**: Line items for quotations
- **DocumentVersion**: Version history and snapshots
- **ActivityLog**: Audit trail of document actions

## Financial Calculations

All monetary calculations use **Decimal arithmetic** (no floating-point):

```
Line Amount = Quantity × Rate
Subtotal = Sum of Line Amounts
VAT Amount = Subtotal × 15% (default)
Grand Total = Subtotal + VAT Amount
```

Decimal rounding: **2 decimal places** (SAR cents)

## Invoice QR Code

Invoices include a QR code (Saudi VAT Phase 1 format) containing:
1. Seller name
2. Seller VAT number
3. Invoice date/time (ISO 8601)
4. Invoice total (including VAT)
5. VAT amount

The QR payload uses TLV (Tag-Length-Value) encoding and is base64-encoded.

**Note**: This is Phase 1 QR only. Full ZATCA Phase 2 e-invoicing is out of scope unless separately approved.

## Security

- Passwords: **bcrypt** hashing (12 rounds)
- Sessions: **HTTP-only, same-site cookies**
- Authentication: **JWT tokens** (default 24 hours)
- CSRF protection: Same-site cookies + CSRF tokens (to implement)
- XSS protection: React escaping + CSP headers
- SQL injection: Prisma parameterized queries
- Input validation: Zod schemas on all endpoints
- File uploads: Validated MIME types and size limits

**Important**: Shared credentials mean the system cannot reliably attribute actions to individual users. Future enhancement: implement individual employee accounts with role-based access.

## PDF Templates

Each company has two templates: Invoice and Quotation.

### Template Design Process

1. Source PDFs are reference designs (invoice 1.pdf, invoice 2.pdf, qoutation 1.pdf)
2. HTML/CSS templates reproduce the layouts
3. Playwright renders HTML → PDF with print CSS
4. Arabic text uses embedded fonts with RTL layout
5. Logos embedded from source PDFs
6. No stamps/seals (explicitly prohibited)

Generated PDFs are:
- Text-based (searchable)
- Print-quality A4
- Responsive to variable content (multi-page if needed)
- Stored securely with server-side access control

## Testing

### Unit Tests
- Financial calculations
- QR TLV encoding/decoding
- Decimal arithmetic
- Validation schemas

### Integration Tests
- Login/logout/session
- Invoice/quotation CRUD
- Duplicate number checking
- Company separation
- PDF generation

### End-to-End Tests (E2E)
- Complete user workflows
- Mobile & desktop viewports
- Create → Edit → Archive → Restore
- Search and filters

### PDF Regression Tests
- Generated PDFs compared against source layouts
- Text extraction validation
- Arabic text rendering
- QR code validation

## Troubleshooting

### "SQLite database is locked"
Ensure only one dev server is running. Kill any background Node processes:
```bash
# Windows
taskkill /F /IM node.exe

# Mac/Linux
killall node
```

### "Cannot find module '@/lib/prisma'"
Check that `tsconfig.json` path alias is correct and `npm install` completed.

### Font rendering issues with Arabic
Ensure fonts are embedded in HTML or served from a CDN. Test with multiple browsers.

### QR code not scanning
- Verify QR is at least 200x200 pixels
- Use white background with black foreground
- Test with multiple QR scanner apps
- Check payload encoding (must be valid UTF-8 TLV)

## Deployment

### Production Checklist

1. **Environment**
   - `NODE_ENV=production`
   - `JWT_SECRET=` (use strong random value)
   - Use PostgreSQL instead of SQLite
   - Use managed storage (S3, etc.) for PDFs

2. **Security**
   - Enable HTTPS
   - Set secure cookies (`secure: true`)
   - Configure CORS if needed
   - Add rate limiting
   - Rotate credentials regularly

3. **Database**
   - Run migrations: `npx prisma migrate deploy`
   - Configure backups
   - Test restore procedure

4. **Backups**
   - Database: Automated daily backups
   - PDF files: Synced to cloud storage
   - Test restoration before launch

5. **Monitoring**
   - Application logging
   - Error tracking (Sentry, etc.)
   - Performance monitoring
   - Activity audit logs

## Support & Next Steps

### Phase Completion Status

- ✅ Phase 1: Discovery & Source Audit
- ✅ Phase 2: Architecture & Foundation (In Progress)
- ⏳ Phase 3: Customer & Document Data
- ⏳ Phase 4: PDF Templates
- ⏳ Phase 5: Dashboard & Search
- ⏳ Phase 6: QA & Deployment

### Known Limitations

- Shared login (no individual user attribution)
- Phase 1 QR only (not full ZATCA Phase 2)
- No automatic document numbering (manual entry required)
- Single timezone (Asia/Riyadh)
- No multi-currency support

### Future Enhancements

- Individual employee accounts with roles
- ZATCA Phase 2 integration
- Payment gateway integration
- Email/WhatsApp delivery
- Inventory management
- General ledger integration
- Multi-language UI

## Contact & Feedback

For issues or questions, refer to the implementation team or project documentation.

---

**Last Updated**: 2026-11-23  
**Version**: 1.0.0 (In Development)
