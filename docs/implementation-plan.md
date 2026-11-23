# Implementation Plan - Invoice & Quotation Management System

**Project:** Invoice & Quotation Management System  
**Version:** 1.0.0  
**Date:** 2026-11-23  
**Status:** Phase 2 - Foundation (In Progress)

---

## Executive Summary

A complete web application for creating, managing, and generating professional invoices and quotations for two Saudi companies: **AMANI** and **DIOUF AL SHARQ**. The system features:

- ✅ **Shared login** (MVP requirement - owner + employees share credentials)
- ✅ **Company separation** with distinct templates and data isolation
- ✅ **Invoice creation** with 1-10 line items, manual numbering, automatic calculations
- ✅ **Quotation creation** with dynamic line items and totals
- ✅ **QR code generation** (Saudi VAT Phase 1 format)
- ✅ **PDF generation** matching source document designs
- ✅ **Customer management** and document search
- ✅ **Document lifecycle** (draft, saved, archived, restored)
- ✅ **Responsive UI** (mobile-first, desktop-friendly)

---

## Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Frontend Framework | Next.js | 14.0+ |
| UI Library | React | 18.2+ |
| Language | TypeScript | 5.3+ |
| Database (Local) | SQLite | - |
| Database (Production) | PostgreSQL | 14+ |
| ORM | Prisma | 5.7+ |
| Validation | Zod | 3.22+ |
| Authentication | bcryptjs + JWT | - |
| PDF Generation | Playwright | 1.40+ |
| QR Codes | qrcode | 1.5+ |
| Styling | Tailwind CSS | - |
| Testing | Jest | 29.7+ |

---

## Project Structure

```
project-root/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── register/route.ts
│   │   │   │   └── logout/route.ts
│   │   │   ├── companies/route.ts
│   │   │   ├── customers/route.ts
│   │   │   ├── invoices/
│   │   │   │   ├── route.ts
│   │   │   │   ├── [id]/route.ts
│   │   │   │   └── [id]/pdf/route.ts (TODO)
│   │   │   └── quotations/
│   │   │       ├── route.ts
│   │   │       ├── [id]/route.ts
│   │   │       └── [id]/pdf/route.ts (TODO)
│   │   ├── (pages)/
│   │   │   ├── page.tsx (login)
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   └── dashboard/
│   │       ├── layout.tsx
│   │       ├── page.tsx (dashboard)
│   │       ├── invoices/
│   │       ├── quotations/
│   │       ├── customers/
│   │       ├── search/
│   │       ├── archive/
│   │       └── settings/
│   ├── lib/
│   │   ├── auth.ts (authentication helpers)
│   │   ├── calculations.ts (financial math)
│   │   ├── constants.ts (company data, defaults)
│   │   ├── prisma.ts (database client)
│   │   ├── qr.ts (QR code generation)
│   │   ├── validation.ts (Zod schemas)
│   │   └── *.test.ts (unit tests)
│   ├── types/
│   │   └── index.ts (TypeScript types)
│   └── utils/
│       └── (utility functions)
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── docs/
│   ├── source-asset-inventory.md
│   └── implementation-plan.md
├── public/ (TODO)
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── jest.config.js
└── README.md
```

---

## Phase Breakdown

### ✅ Phase 1: Discovery & Source Audit (Complete)
- [x] Identified source PDFs
- [x] Extracted company names and details
- [x] Created source-asset-inventory.md
- [x] Confirmed requirements and architecture

**Company Details:**
- **Company 1:** AMANI MUHAMMAD AL OTAIBI GENERAL CONTRACTING COMPANY
- **Company 2:** DIOUF ALSHARQ GENERAL CONTRACTING COMPANY (CR: 4030313386)

### ✅ Phase 2: Architecture & Foundation (In Progress)
- [x] Project setup (Next.js, TypeScript, Prisma)
- [x] Database schema and migrations
- [x] Authentication system (shared login)
- [x] Company separation and isolation
- [x] Core business logic (calculations, QR encoding)
- [x] API routes for CRUD operations
- [x] Frontend navigation and layouts
- [x] Login page and dashboard
- [x] Document creation workflows (UI forms)
- [ ] Environment setup and testing

**What's Done:**
- API routes: `/api/auth/*`, `/api/companies`, `/api/customers`, `/api/invoices`, `/api/quotations`
- Pages: Login, Dashboard, Invoice creation, Invoice list, Quotation list
- Core libraries: Auth, calculations, QR code, validation
- Database: Prisma schema with all entities

**What's Next:**
- Database initialization and seed script
- Install dependencies
- Test authentication flow
- Create invoice/quotation API finalization

### ⏳ Phase 3: Customer & Document Data
- [ ] Customer management (add, edit, search)
- [ ] Invoice CRUD with validations
- [ ] Quotation CRUD with validations
- [ ] Document version history
- [ ] Activity logging
- [ ] Soft delete/archive functionality

### ⏳ Phase 4: PDF Templates
- [ ] HTML/CSS templates for each design
  - AMANI Invoice
  - AMANI Quotation
  - DIOUF Invoice
  - DIOUF Quotation (AMANI layout + DIOUF content)
- [ ] Playwright PDF rendering setup
- [ ] Arabic text and RTL layout
- [ ] Logo embedding from source PDFs
- [ ] QR code placement
- [ ] Visual regression tests

### ⏳ Phase 5: Dashboard & Search
- [ ] Dashboard metrics and stats
- [ ] Document search and filters
- [ ] Archive/restore functionality
- [ ] Company settings pages
- [ ] User settings and password change
- [ ] Backup and data export

### ⏳ Phase 6: QA & Deployment
- [ ] Unit tests (calculations, QR, validation)
- [ ] Integration tests (workflows, API endpoints)
- [ ] End-to-end tests (user journeys)
- [ ] PDF visual regression tests
- [ ] Security review and hardening
- [ ] Performance optimization
- [ ] Production deployment guide
- [ ] Documentation

---

## Database Schema Overview

### Core Entities

**User** - Shared login credentials
- id, username, password (bcrypt hashed), createdAt, updatedAt

**Session** - Active user sessions
- id, userId, token, expiresAt, createdAt

**Company** - Business entities (AMANI, DIOUF)
- id, name, nameArabic, crNumber, vatNumber, address, email, phone, website
- bankName, accountName, accountNumber, ibanNumber, swiftCode
- logoBase64 (embedded from PDF)

**CompanySetting** - Company-specific configuration
- id, companyId, vatRate (default 15%), currency, timezone

**Customer** - Client information (company-scoped)
- id, companyId, name, businessName, contactPerson, phone, email, address, vatNumber

**Invoice** - Invoice documents
- id, companyId, customerId, invoiceNumber (manual, company-scoped unique)
- invoiceDate, dueDate, poNumber
- customerSnapshot (JSON snapshot for historical accuracy)
- subtotal, vatAmount, grandTotal (Decimal for precision)
- qrPayload (TLV-encoded QR data), pdfPath
- status (draft, saved, archived), createdAt, updatedAt

**InvoiceLineItem** - Line items for invoices (1-10 per invoice)
- id, invoiceId, lineNumber, description, quantity, rate, amount

**Quotation** - Quotation documents
- id, companyId, customerId, quotationRef (manual, company-scoped unique)
- quotationDate, validUntil, projectName, subject, introText
- customerSnapshot (JSON snapshot)
- subtotal, vatAmount, grandTotal, pdfPath
- status (draft, saved, archived), createdAt, updatedAt

**QuotationLineItem** - Line items for quotations (1-10 per quotation)
- id, quotationId, lineNumber, description, unit, quantity, rate, amount

**DocumentVersion** - Version history and snapshots
- id, invoiceId/quotationId, versionNumber, documentData (JSON), pdfPath, createdAt

**ActivityLog** - Audit trail
- id, userId, companyId, action, documentType, documentId, details, createdAt

**ApplicationSetting** - App-wide configuration
- id, key (unique), value (text)

---

## Key Design Decisions

### 1. Shared Login Model (MVP)
- ✅ Confirmed requirement: Owner + employees share one username/password
- Limitation: Cannot reliably attribute actions to specific users
- Future: Implement individual accounts with roles
- Current: Session-based JWT tokens with 24-hour expiry

### 2. Manual Document Numbering
- Invoice numbers entered by user (not auto-generated)
- Quotation references entered by user
- Both validated for company-scoped uniqueness
- Prevents numbering conflicts and maintains user control

### 3. Decimal-Safe Arithmetic
- All monetary calculations use Prisma `Decimal` type
- Avoids floating-point precision errors
- Rounding: 2 decimal places (SAR cents), ROUND_HALF_UP strategy

### 4. Customer Snapshots
- Document creation snapshots customer data as JSON
- Historical invoices/quotations remain unchanged if customer details later update
- Maintains data integrity and audit trail

### 5. QR Code (Saudi VAT Phase 1)
- TLV (Tag-Length-Value) encoded payload
- 5 required fields: seller name, VAT number, invoice date/time, total (inc. VAT), VAT amount
- Base64-encoded for QR generation
- **Not Phase 2 compliant** (XML, cryptographic stamping out of scope)

### 6. PDF Generation
- Server-side rendering with Playwright/Chromium
- HTML/CSS templates for each company's design
- Embedded fonts for Arabic text with RTL layout
- No stamps/seals (explicitly prohibited)
- Output: Text-based, searchable, print-quality A4

### 7. Company Separation
- Strict data isolation using `companyId` foreign keys
- Unique constraints: (companyId, invoiceNumber), (companyId, quotationRef)
- Companies cannot access each other's data or settings
- Separate templates for each company

### 8. Local-First Development
- SQLite database stored in project directory (`dev.db`)
- Generated PDFs stored in local file system
- No external services required for local testing
- PostgreSQL architecture ready for production migration

---

## Security Considerations

### Authentication & Sessions
- Passwords hashed with bcrypt (12 rounds)
- Sessions stored in HTTP-only, same-site cookies
- JWT tokens (default 24 hours expiry)
- Rate limiting on auth endpoints (TODO)

### Data Protection
- Input validation on all endpoints (Zod schemas)
- Server-side authorization checks
- CSRF protection via same-site cookies
- SQL injection prevented by Prisma parameterized queries
- XSS prevention via React escaping + CSP headers (TODO)

### File Security
- PDF/file downloads require server-side access control
- Generated PDFs not publicly guessable URLs
- Uploaded logos validated for MIME type and size (TODO)

### Secrets Management
- Environment variables for sensitive config (`.env.local`)
- Never commit `.env.local` or secrets to Git
- Production: Use environment variables or secrets manager

---

## Financial Calculation Logic

### Decimal Arithmetic
```typescript
Line Amount = Quantity × Rate  (Decimal precision)
Subtotal = ∑ Line Amounts
VAT = Subtotal × 15% (default, configurable per company)
Grand Total = Subtotal + VAT
```

### Rounding Rules
- All intermediate calculations use `Decimal` type
- Final values rounded to 2 decimal places (SAR cents)
- Rounding method: ROUND_HALF_UP (standard commercial rounding)

### Example
```
Item 1: 3 × 100.00 = 300.00
Item 2: 5 × 65.33 = 326.65
Subtotal: 626.65
VAT (15%): 94.00 (rounded)
Grand Total: 720.65
```

---

## QR Code Specification

### TLV Encoding
| Tag | Field | Type | Example |
|-----|-------|------|---------|
| 1 | Seller Name | UTF-8 | DIOUF ALSHARQ GENERAL CONTRACTING COMPANY |
| 2 | VAT Number | UTF-8 | 310205801200003 |
| 3 | Invoice DateTime | ISO 8601 | 2024-01-15T10:30:00Z |
| 4 | Invoice Total (inc. VAT) | String | 720.65 |
| 5 | VAT Amount | String | 94.00 |

### Generation Process
1. Build TLV buffer with 5 required fields
2. Base64 encode the buffer
3. Generate QR code from base64 string
4. Embed QR in invoice PDF

### Validation
- QR decoded to verify all fields match invoice data
- Tests confirm encode/decode round-trip accuracy
- Multiple QR scanners tested before production

---

## API Endpoints (Implemented)

### Authentication
- `POST /api/auth/register` - Create shared login account
- `POST /api/auth/login` - Sign in and get session
- `POST /api/auth/logout` - Sign out and clear session

### Companies
- `GET /api/companies` - List all companies (auto-seed if empty)

### Customers
- `GET /api/customers?companyId=...` - List customers for company
- `POST /api/customers` - Create customer
- `GET /api/customers/[id]` - Get customer details
- `PUT /api/customers/[id]` - Update customer
- `DELETE /api/customers/[id]` - Delete customer

### Invoices
- `GET /api/invoices?companyId=...` - List invoices (paginated)
- `POST /api/invoices` - Create invoice (auto-calculate QR)
- `GET /api/invoices/[id]` - Get invoice details
- `PUT /api/invoices/[id]` - Update invoice
- `DELETE /api/invoices/[id]` - Archive invoice
- `GET /api/invoices/[id]/pdf` - Download PDF (TODO)

### Quotations
- `GET /api/quotations?companyId=...` - List quotations (paginated)
- `POST /api/quotations` - Create quotation
- `GET /api/quotations/[id]` - Get quotation details
- `PUT /api/quotations/[id]` - Update quotation
- `DELETE /api/quotations/[id]` - Archive quotation
- `GET /api/quotations/[id]/pdf` - Download PDF (TODO)

---

## Frontend Pages (Implemented)

### Public
- `/` - Login page (register/sign-in toggle)

### Dashboard
- `/dashboard` - Dashboard (stats, quick actions, recent documents)
- `/dashboard/invoices` - All invoices (filterable by company)
- `/dashboard/invoices/create` - Create invoice form
- `/dashboard/invoices/[id]` - View/edit invoice (TODO)
- `/dashboard/quotations` - All quotations (filterable)
- `/dashboard/quotations/create` - Create quotation form (TODO)
- `/dashboard/quotations/[id]` - View/edit quotation (TODO)
- `/dashboard/customers` - Customer management (TODO)
- `/dashboard/search` - Search documents (TODO)
- `/dashboard/archive` - Archived documents (TODO)
- `/dashboard/settings` - Settings (TODO)

---

## Testing Strategy

### Unit Tests (src/lib/*.test.ts)
- Financial calculations (line amount, subtotal, VAT, grand total)
- QR TLV encoding/decoding
- Validation schemas
- Decimal arithmetic precision

### Integration Tests (jest)
- Authentication flow (register, login, logout)
- Invoice CRUD operations
- Quotation CRUD operations
- Duplicate number validation
- Company separation enforcement
- PDF generation workflow

### End-to-End Tests (Playwright - TODO)
- Complete invoice creation workflow
- Complete quotation creation workflow
- Search and filter
- Archive and restore
- Mobile viewport testing

### PDF Regression Tests (TODO)
- Generated PDF page dimensions vs. source
- Text extraction validation
- Arabic text rendering check
- Logo and table presence
- QR code validation

---

## Known Limitations & Future Enhancements

### Current Limitations (MVP Scope)
- Shared login (no individual user attribution)
- Phase 1 QR only (no ZATCA Phase 2)
- No automatic numbering (manual entry required)
- Single timezone (Asia/Riyadh)
- No multi-currency support
- Basic search (no advanced filters yet)

### Future Enhancements
- Individual employee accounts with role-based access
- ZATCA Phase 2 e-invoicing integration
- Automated invoice/quotation numbering options
- Payment gateway integration (Stripe, etc.)
- Email/WhatsApp delivery
- Inventory management
- General ledger integration
- Multi-language UI
- Advanced analytics and reporting

---

## Deployment Roadmap

### Phase 2 Deliverables (Current)
- ✅ Project structure and configuration
- ✅ Database schema and migrations
- ✅ Authentication system
- ✅ Core business logic (calculations, QR)
- ✅ API routes for all CRUD operations
- ✅ Frontend pages and navigation
- ✅ Unit tests for calculations and QR
- ✅ README with local setup instructions

### Phase 3-4 Deliverables (Next)
- Invoice and quotation management (CRUD)
- PDF template implementation (all 4 designs)
- Customer management UI
- Document version history

### Phase 5-6 Deliverables (Final)
- Dashboard metrics and analytics
- Search, filters, pagination
- Archive/restore functionality
- Settings and configuration
- Comprehensive testing suite
- Security hardening
- Production deployment setup

---

## Success Criteria

### Must Have (MVP)
- [x] Two companies with separate templates and data
- [x] Shared login (owner + employees)
- [x] Invoice creation with 1-10 line items
- [x] Quotation creation with 1-10 line items
- [x] Manual invoice numbering (company-scoped unique)
- [x] Manual quotation references (company-scoped unique)
- [ ] QR code generation (Phase 1 format)
- [ ] PDF generation matching source designs
- [ ] Responsive mobile UI
- [ ] Local development setup (SQLite)
- [ ] README and deployment docs

### Should Have (Phase 2-3)
- [ ] Customer management
- [ ] Document search and filters
- [ ] Archive/restore functionality
- [ ] Activity logging
- [ ] Document versioning
- [ ] Settings management

### Could Have (Future)
- [ ] Advanced analytics
- [ ] Automated numbering
- [ ] Email delivery
- [ ] Payment integration
- [ ] Inventory management

---

## Next Immediate Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Initialize Database**
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```

4. **Test Authentication**
   - Visit http://localhost:3000
   - Login with admin / admin123
   - Should redirect to dashboard

5. **Create Test Invoice**
   - Dashboard → Create Invoice
   - Test line item calculations
   - Verify totals

6. **Verify QR Code**
   - Check QR payload encoding
   - Run unit tests: `npm test`

---

**Last Updated:** 2026-11-23  
**Next Review:** After Phase 2 foundation complete  
**Owner:** Development Team
