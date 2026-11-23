# Master PRD & Implementation Brief

## Invoice and Quotation Management System

**Prepared for:** Claude Code\
**Project status:** Requirements baseline --- inspect source PDFs/assets
before implementation\
**Primary business:** DIOUF AL SHARQ GENERAL CONTRACTING CO. and a
second company whose details must be taken from its source documents\
**Currency:** SAR\
**Default VAT:** 15% (configurable)

------------------------------------------------------------------------

# 1. Instructions to Claude Code

You are the senior product engineer and software architect responsible
for planning and implementing this application.

Build a complete, production-quality **online Invoice & Quotation
Management System** based on this specification and the original PDF
references supplied with the project.

Do not start by inventing generic invoice or quotation designs. The
supplied PDFs are the authoritative references for each document's
appearance and fixed content. First inspect all available reference
files, identify which file belongs to which company/document, and create
a source-asset inventory. Then propose an implementation plan and
identify any genuine ambiguities before coding.

## Mandatory implementation rules

**Stamp prohibition:** Do not use, insert, reproduce, or display any
stamp/seal image or stamp area in any invoice, quotation, PDF, preview,
or application screen. If a source PDF contains a stamp, omit it. A
signature may remain only if separately supplied and appropriate.

1.  Preserve the original visual design of each applicable PDF as
    closely as practical: page size, margins, typography, colors, logos,
    headings, bilingual content, table structure, borders, fixed company
    details, bank/payment details, QR placement, signature (no stamp)
    areas, and footer.
2.  Do not replace the supplied designs with generic templates or
    redesign them without explicit approval.
3.  Only make fields editable or automatic where this PRD says they
    should be. Keep fixed template content fixed.
4.  Generated PDFs must contain selectable/searchable text wherever
    possible. Do not use a screenshot or flattened full-page image as
    the document.
5.  Arabic must render correctly with proper right-to-left direction,
    shaping, punctuation, and alignment. English and Arabic content must
    coexist correctly.
6.  Keep the two companies' data, branding, templates, and document
    records separate.
7.  Shared owner/employee login is a confirmed MVP requirement. Do not
    silently change it to separate employee accounts.
8.  Invoice numbers and quotation references are entered manually by
    users. Do not auto-number them.
9.  Support up to 10 line items per document.
10. Do not claim ZATCA Phase 2 compliance merely because an invoice
    contains a QR code. Treat Phase 2 integration as a separate scope
    unless explicitly approved and implemented.
11. Do not fabricate company information, bank information, customer
    information, document wording, rates, or missing assets. Extract
    these from the supplied source documents or mark them as unresolved.
12. Do not leave fake buttons, nonfunctional actions, placeholder pages,
    or demo data in the finished product.
13. Use maintainable, modular architecture, strong validation, security
    best practices, automated tests, and clear setup/deployment
    documentation.
14. Before implementation, report the source files found and any missing
    files. If files are not available in the project workspace, ask the
    user to place them in the reference folder described below. Do not
    assume that files uploaded in ChatGPT are automatically available to
    Claude Code.

------------------------------------------------------------------------

# 2. Product overview

Create a secure, browser-based application that allows the business to
create, save, search, preview, download, and print invoices and
quotations for two separate companies.

The application must work on: - Mobile phones - Tablets - Laptops -
Desktop computers

It must be responsive and mobile-optimized. Users should be able to sign
in from different devices and see the same up-to-date records through a
central online database.

The application is for internal business use. The owner and employees
use the same shared credentials and have the same application access in
the MVP.

## Main objectives

-   Reproduce four document templates using the supplied PDF references.
-   Make the required fields editable without damaging the original
    design.
-   Calculate line totals, subtotal, VAT, and grand total accurately.
-   Generate the required invoice QR code.
-   Store documents and their generated PDFs online.
-   Search and retrieve past invoices and quotations.
-   Support two companies without mixing their information.
-   Provide a modern, simple, professional user experience.

------------------------------------------------------------------------

# 3. Company separation and template mapping

There are two companies in the application. Each company must have its
own: - Company profile and fixed legal/business information - Logo and
branding assets - Invoice template - Quotation template - Bank/payment
information - VAT/CR information - Signature and stamp assets, where
supplied - Customers and document associations - Document numbering
duplicate-check scope

Selecting a company must load that company's correct templates and
company information. Never mix company details, logos, bank details, or
document records.

## Company 1

Use the Company's 1 original invoice PDF as the invoice design/content
reference and its original quotation PDF as the quotation design/content
reference.

Do not assume the company name or details. Extract them from the
supplied PDFs and assets.

## Company 2 --- DIOUF AL SHARQ

Known company information:

-   Legal/company name: **DIOUF AL SHARQ GENERAL CONTRACTING CO.**
-   Commercial Registration (CR): **4030313386**
-   VAT registration number: **310205801200003**
-   Address: **Gharnath Street, opposite Saudi Aramco Complex,
    Musharifa, Jeddah, Saudi Arabia**
-   Email: **info@dioufalsharq.com**

Use the source documents to confirm and extract all other fixed details,
such as telephone numbers, bank details, website, and other legal
information. Do not invent missing information.

### Company 2 invoice

Use the original Company 2 invoice PDF as the authoritative design and
content reference. Reproduce it closely.

### Company 2 quotation --- special source mapping

This requirement is specifically confirmed:

-   **Design/template reference:** AMANI non-manpower quotation PDF.
-   **Actual business content/company identity:** DIOUF AL SHARQ's
    original quotation PDF and DIOUF AL SHARQ company information.

Use the AMANI non-manpower quotation only as the layout/design
reference. Replace AMANI-specific information with the correct DIOUF AL
SHARQ information and the actual quotation content from DIOUF AL SHARQ's
original quotation.

Preserve the AMANI template's structural design where appropriate,
including: - Header and company branding layout - Quotation title and
reference/date area - Company and quotation details sections - Subject
heading - Work-description/pricing table - Pricing and total section -
Terms and conditions - Authorized authorized signature area only; no
company stamp area - Footer design

Use DIOUF AL SHARQ's logo, company details, signature (no stamp) assets,
and actual work descriptions/rates where available.

**Do not leave AMANI company name, logo, contact details, bank details,
VAT/CR information, customer information, rates, or work descriptions in
the final DIOUF AL SHARQ quotation.** Check the generated PDF for
accidental AMANI remnants.

------------------------------------------------------------------------

# 4. Reference files and source inventory

Create and use this project folder structure where practical:

``` text
/references/
  /source-pdfs/
    company-1-invoice.pdf
    company-1-quotation.pdf
    company-2-invoice.pdf
    company-2-quotation-header-footer-reference.pdf
  /logos/
  /signatures/
  /stamps/
  /fonts/
  /other-assets/
```

The filenames above are suggested names only. Use the actual supplied
filenames and do not rename or overwrite originals without permission.

Before coding, inspect all available PDFs and image assets. Create
`docs/source-asset-inventory.md` containing: - Actual filename and file
type - Which company/document it relates to - Whether it is a design
reference, content reference, or asset - Page count and page
dimensions - Logos, stamps, signatures, fonts, and other embedded assets
identified - Fixed content that must remain unchanged - Editable fields
identified - Any unclear or conflicting information

For PDF inspection, inspect every page, not just the first page. If a
PDF contains embedded images or scans, inspect the page images as well
as extracted text.

If a required source is missing, stop template implementation and ask
for the missing source. Do not guess.

------------------------------------------------------------------------

# 5. Users, authentication, and access

## Confirmed MVP access model

-   One shared username and password are used by the owner and
    employees.
-   Owner and employees have the same access and features.
-   The same login works on mobile, laptop, and desktop.
-   All users see the same shared company records and document data.

Do not create restricted employee roles in the MVP unless later
requested.

## Important audit limitation

Because credentials are shared, the application cannot reliably identify
which individual employee performed an action. Record timestamps and
action history, but do not claim individual employee attribution.

The system may record a general activity log such as: - Document
created - Document updated - PDF generated - Document
archived/restored - Customer record updated - Settings changed

## Security requirements

-   Use HTTPS in production.
-   Store passwords using a strong password-hashing algorithm such as
    Argon2id or bcrypt with appropriate parameters. Never store
    plaintext or reversibly encrypted passwords.
-   Use secure, HTTP-only, same-site cookies for sessions where
    appropriate.
-   Protect against CSRF, XSS, SQL injection, brute-force login
    attempts, and common web vulnerabilities.
-   Validate and authorize every server-side operation.
-   Keep secrets in environment variables or a secrets manager; never
    commit secrets.
-   Provide a secure password-change flow.
-   Provide logout and session expiration.
-   Do not expose private document files through guessable public URLs.
-   Rate-limit authentication and sensitive endpoints.
-   Use secure file upload validation for logos and other assets.

Document the security implications of shared credentials and recommend
individual accounts as a future enhancement, but do not change the
confirmed shared-login MVP requirement.

------------------------------------------------------------------------

# 6. Main navigation and dashboard

Provide a clean, professional dashboard with a responsive sidebar or
mobile navigation.

## Main navigation

1.  Dashboard
2.  Companies
3.  All Invoices
4.  All Quotations
5.  Customers
6.  Search Documents
7.  Document Archive
8.  Settings
9.  Backup & Data

## Dashboard

Show useful summary cards and lists: - Total invoices - Total
quotations - Company 1 document summary - Company 2 document summary -
Recent invoices - Recent quotations - Recently updated documents - Quick
action: Create Invoice - Quick action: Create Quotation - Search
documents

Where totals are shown, clearly distinguish invoice totals from
quotation values. Do not imply quotations are received revenue.

Dashboard figures must be calculated from real database records, not
hardcoded sample values.

------------------------------------------------------------------------

# 7. Invoice requirements

There are two invoice templates, one per company. Use the correct source
PDF for each company and reproduce it closely.

## Invoice creation workflow

1.  User selects the company.
2.  The application loads that company's invoice template and fixed
    company details.
3.  User enters the invoice number manually.
4.  User enters invoice date and other required document details.
5.  User selects an existing customer or enters customer details.
6.  User chooses between 1 and 10 line-item rows.
7.  User enters descriptions, quantities, and rates.
8.  The application calculates amounts and VAT automatically.
9.  The application generates the QR code using the required invoice
    values.
10. User previews the PDF.
11. User saves the invoice.
12. User can download or print the PDF.

## Invoice fields

Make the following editable where present/applicable in the original
template:

-   Invoice number --- manual entry
-   Invoice date --- manual entry
-   Supply date --- manual entry, if applicable
-   Customer name
-   Customer/company details
-   Customer address and VAT number, if applicable
-   PO number
-   Product/service description
-   Quantity
-   Rate/unit price
-   Any other clearly variable customer or transaction field identified
    in the source PDF

Preserve all fixed company and template wording.

### Manual invoice numbering

Invoice number is entered manually. Do not generate it automatically.

-   Validate that the invoice number is not already used by another
    invoice belonging to the same company.
-   Duplicate checking is scoped to the company.
-   The same invoice number may exist for the other company.
-   Show a clear validation message if the number is already in use.
-   Trim accidental leading/trailing spaces and normalize comparison
    safely without silently changing the displayed number.

## Invoice line items

-   Allow 1--10 rows.
-   User can select the number of rows needed.
-   Each row should include the fields required by the source PDF, such
    as description, quantity, rate, and amount.
-   Calculate each line amount automatically:

`Line amount = Quantity × Rate`

-   Calculate subtotal as the sum of line amounts.
-   Calculate VAT using the configured VAT rate, default 15%, according
    to the source document's tax treatment.
-   Calculate grand total:

`Grand total = Subtotal + VAT`

-   Use decimal-safe arithmetic. Do not use floating-point arithmetic
    for financial calculations.
-   Format monetary values consistently in SAR.
-   Apply rounding consistently and document the rounding method.
-   Validate quantities and rates as non-negative numeric values. If
    zero values are allowed, handle them intentionally.

If the original PDF has additional totals, deductions, retention,
discounts, or tax breakdowns, preserve and implement them only when
supported by the source document and confirmed business rules. Do not
invent them.

------------------------------------------------------------------------

# 8. Invoice QR code

Automatically generate a QR code for each invoice. Place it in the same
location and approximate visual style as the QR code in the
corresponding original invoice PDF.

The expected Saudi VAT QR Phase 1 TLV payload contains these five
values:

1.  Seller name
2.  Seller VAT registration number
3.  Invoice date/time
4.  Invoice total including VAT
5.  VAT total

Use the appropriate UTF-8 and TLV encoding rules. Validate the generated
QR by decoding it and checking that every encoded value matches the
invoice record.

Requirements: - QR must be generated from saved/validated invoice
data. - Regenerate it when any encoded field changes. - Do not use a
static QR copied from the source PDF. - Ensure the QR is sharp and
readable in the generated PDF and on print. - Test scanning using more
than one QR scanner or decoder. - If a required value is missing, show a
validation error instead of generating a misleading QR. - Store the
payload/version or enough data to reproduce it.

**Compliance boundary:** A Phase 1-style VAT QR code does not by itself
constitute full ZATCA Phase 2 e-invoicing compliance. Do not claim Phase
2 compliance. XML generation, cryptographic stamping,
clearance/reporting APIs, certificates, and other ZATCA integration
requirements are out of scope unless separately approved and implemented
against current official requirements.

------------------------------------------------------------------------

# 9. Quotation requirements

There are two quotation templates. Company 1 uses its original quotation
PDF. Company 2 uses the special AMANI-design/DIOUF-content mapping
described in Section 3.

## Quotation creation workflow

1.  User selects the company.
2.  The correct quotation template and fixed company details load.
3.  User manually enters the quotation reference.
4.  User enters quotation date and client/project details.
5.  User enters subject and introductory wording where applicable.
6.  User selects between 1 and 10 work rows.
7.  User enters work descriptions, units, quantities, and rates.
8.  The application calculates amounts, subtotal, VAT, and grand total
    according to the approved source layout/business rules.
9.  User previews the PDF.
10. User saves the quotation.
11. User can download or print it.

## Editable quotation fields

Where present/applicable in the source template:

-   Quotation reference --- manual entry
-   Quotation date
-   Customer/client name and details
-   Project name/location
-   Offer validity
-   Contract/service period
-   Subject
-   Introductory paragraph / "Dear Sir" wording
-   Work description
-   Unit
-   Quantity
-   Rate
-   Any other variable project-specific field identified in the source
    PDF

Fixed company identity and template wording should remain fixed unless
explicitly configured as company settings.

## Manual quotation reference

The quotation reference is manually entered. Example format supplied by
the user:

`DS-SSEM-QT-2026-089`

This is an example only, not an automatically generated pattern.

-   Do not auto-generate references.
-   Check duplicates within the selected company.
-   The same reference may be used by the other company.
-   Display a clear duplicate warning/error.

## Quotation rows and calculations

-   Allow 1--10 rows.
-   Each row includes the source template's relevant columns, such as
    description, unit, quantity, rate, and amount.
-   Line amount = quantity × rate.
-   Subtotal = sum of line amounts.
-   Apply the default 15% VAT where the applicable quotation/source
    template requires VAT.
-   Grand total = subtotal + VAT.
-   Use decimal-safe calculations and consistent SAR formatting.

If the source quotation has a specific VAT presentation or no VAT
section, preserve its layout. Do not add an unapproved VAT section or
change the source's tax treatment without clarifying the business rule.

------------------------------------------------------------------------

# 10. PDF generation and template fidelity

PDF output is a core feature, not a secondary export.

## Required output

-   Use A4 unless the source PDF has a different page size.
-   Preserve the original page orientation and dimensions.
-   Preserve page margins, spacing, typography, colors, tables, borders,
    headings, and footer.
-   Use the correct company logo and branding.
-   Preserve bilingual English/Arabic content and correct right-to-left
    layout.
-   Place QR and signature elements only; do not include stamp elements
    in their correct positions.
-   Handle long descriptions and multi-page documents without clipping
    or overlapping.
-   Keep totals and signature blocks together where practical.
-   Ensure text remains selectable/searchable.
-   Generate crisp print-quality output.
-   Support browser preview, download, and printing on desktop and
    mobile.

## PDF template implementation

Use separate template renderers for each of the four document designs.
Share reusable data/calculation components where appropriate, but do not
force all documents into one generic visual template.

Recommended approach: - Create HTML/CSS templates that accurately
reproduce each source PDF. - Render PDFs using a reliable server-side
browser engine such as Playwright/Chromium, or another proven method
after evaluating Arabic shaping and layout fidelity. - Embed or load
licensed fonts correctly. - Use explicit page dimensions and print
CSS. - Avoid relying on the user's local fonts. - Make rendering
deterministic across environments.

## Visual quality assurance

For each template: 1. Generate a sample PDF using representative test
data. 2. Render the PDF pages to images. 3. Compare them side by side
with the source PDF pages. 4. Adjust dimensions, spacing, font sizes,
alignment, borders, and element positions. 5. Repeat until the match is
acceptably close. 6. Keep visual regression snapshots/tests for future
changes.

Do not mark a template complete based only on the HTML preview. Verify
the actual generated PDF.

------------------------------------------------------------------------

# 11. Customer management

Provide a customer directory.

Suggested fields: - Customer name - Company/business name - Contact
person - Phone - Email - Address - VAT registration number, if
applicable - Notes, if needed - Associated company

Users should be able to: - Add a customer - Edit customer details -
Search customers - Select a saved customer when creating an invoice or
quotation - Enter a one-time customer without saving, if appropriate

Keep company/customer associations clear. Avoid accidentally selecting a
customer belonging to the wrong company. If customers are intentionally
shared across both companies, make that behavior explicit in the data
model and UI.

When a saved customer is selected, populate the relevant document fields
while allowing document-specific snapshots to remain historically
accurate.

------------------------------------------------------------------------

# 12. Document lists, search, and filters

## All invoices

Display: - Invoice number - Company - Customer - Invoice date - Total
amount - Status, if implemented

Actions: - View - Edit - Preview PDF - Download PDF - Print -
Archive/delete

## All quotations

Display: - Quotation reference - Company - Customer - Quotation date -
Total amount - Status, if implemented

Actions: - View - Edit - Preview PDF - Download PDF - Print -
Archive/delete

## Search and filters

Search by: - Invoice number - Quotation reference - Customer name -
Company - Document type - Date or date range

Support sorting, pagination, and useful empty states. Search should be
fast and should not load every record into the browser at once.

------------------------------------------------------------------------

# 13. Document lifecycle, versions, and archive

Documents must be saved in the database, with generated PDFs stored in
secure file storage.

Support: - Draft, if useful - Saved/final - Edited/updated - Archived -
Restored

When a document is edited: - Update the current record. - Record the
update timestamp. - Preserve prior versions or snapshots where
practical. - Regenerate the PDF and QR if relevant. - Ensure the user
can distinguish the current PDF from an older version.

Deletion should be recoverable: - Default delete action moves a document
to the archive/recycle area. - Allow restore. - Permanent deletion must
require a separate confirmation. - Do not permanently delete files or
records through an accidental single click.

A document should retain a snapshot of the customer/company information
used when it was issued, so later changes to a customer profile do not
silently rewrite historical documents.

------------------------------------------------------------------------

# 14. Settings

Provide a settings area for: - Company profiles - Company logos and
branding - Company contact/legal information - Bank/payment details -
Signature and stamp assets - VAT rate (default 15%) - Currency (SAR) -
Language/display preferences - Shared login credentials and password
change - Document template configuration where safe - Backup and restore
controls

Do not allow a settings change to silently rewrite previously issued
PDFs. Historical document snapshots should remain stable unless a
document is intentionally edited and regenerated.

------------------------------------------------------------------------

# 15. Backup and data protection

The system is online and must protect business records.

Requirements: - Automated database backups. - Secure backup of generated
PDFs and uploaded assets. - Documented backup frequency and retention
policy. - Restore procedure. - Backup encryption at rest where
supported. - Restrict backup access. - Test restoration before
production launch and periodically afterward. - Provide a manual
export/backup option if practical. - Do not expose backups publicly.

A backup is not considered complete until a restore test has succeeded.

------------------------------------------------------------------------

# 17. Local development and localhost-first delivery

The first version must be easy for a non-technical user to run and
inspect locally before online deployment. Localhost development is
mandatory.

## Local development requirements

-   Run locally at `http://localhost:3000` (or document the actual
    port).
-   Do not require cloud hosting, a paid database, Docker, or a
    separately installed database server just to start the MVP.
-   Provide beginner-friendly Windows instructions, plus macOS/Linux
    instructions where practical.
-   Local development data and generated PDFs must be stored on the
    user's computer.
-   The user must be able to test creating, editing, previewing,
    downloading, and printing invoices and quotations locally.

## Recommended local-first stack

-   Next.js, React, and TypeScript.
-   SQLite for local development, using Prisma or another maintained
    ORM.
-   Local private storage for uploaded assets and generated PDFs during
    development.
-   Server-side PDF rendering with documented browser/runtime
    dependencies.
-   A data-access layer that allows migration to PostgreSQL and private
    cloud storage later without rewriting business logic or PDF
    templates.

Do not require PostgreSQL or cloud services for local preview unless
technically essential. Explain any unavoidable dependency in simple
terms.

## Required README instructions

Provide a complete `README.md` with verified commands appropriate to the
implementation. It must explain: - Required Node.js version and how to
check it. - How to install dependencies. - How to initialize the local
database. - How to create the first shared login securely. - Where to
place the four source PDFs and other assets. - How to start the app and
open the localhost URL. - How to stop the app. - How to reset local test
data safely. - Common Windows troubleshooting steps.

Include `.env.example` and explain how to create a local `.env`. Never
commit real passwords or secrets.

## Localhost acceptance test

A non-technical user must be able to follow the README on a fresh
checkout, start the app, sign in, select either company, create a test
invoice and quotation, preview/download/print PDFs, stop and restart the
app, and still see saved local records.

Do not mark localhost delivery complete until this workflow and all
README commands have been tested.

## Later production migration

Localhost comes first. Document how local SQLite and local file storage
can later be migrated to managed PostgreSQL and private cloud storage.
Production deployment is a later phase and must not block local testing.

------------------------------------------------------------------------

# 17. Technical architecture and engineering standards

Choose one coherent, well-supported stack. Do not mix competing
frameworks without a clear reason.

A suitable default architecture is: - Frontend: Next.js with React and
TypeScript - Backend: Next.js server-side routes/server actions or a
clearly separated API layer - Database: SQLite for local development;
PostgreSQL-compatible architecture for later production - ORM: Prisma or
Drizzle - Validation: Zod or an equivalent schema validation library -
PDF: Playwright/Chromium or another proven server-side renderer - QR: A
maintained QR/TLV implementation with tests - File storage: private
object storage compatible with the deployment platform - Hosting: secure
cloud hosting with managed PostgreSQL and private file storage

Claude Code may recommend a different stack if there is a strong
technical reason. Explain the choice before implementation and keep the
architecture consistent.

## Code quality

-   TypeScript strict mode.
-   Modular feature-based architecture.
-   Reusable UI components.
-   Separate domain logic from UI and PDF rendering.
-   Separate the four PDF templates.
-   Centralize money calculations and VAT logic.
-   Validate input on both client and server.
-   Use database constraints for important uniqueness/integrity rules.
-   Use migrations; do not manually mutate production schema.
-   Use transactions for multi-step document saves.
-   Use structured error handling and useful logs.
-   Do not swallow errors silently.
-   Use pagination and database indexes.
-   Avoid unnecessary network requests and oversized client bundles.
-   Optimize images and uploaded assets.
-   Use accessible labels, keyboard navigation, and adequate contrast.
-   Keep code formatted and linted.
-   Add comments for non-obvious business logic, not every line.
-   Avoid duplicated logic and overly large components.
-   Never hardcode secrets.
-   Do not put production business data into demo seed files.

## Suggested domain entities

Design the schema carefully. Likely entities include: - Company -
CompanyAsset - Customer - Invoice - InvoiceLineItem - Quotation -
QuotationLineItem - DocumentVersion or DocumentSnapshot -
StoredDocumentFile - SharedUserCredential / Auth configuration -
ActivityLog - ApplicationSetting - BackupMetadata, if required

Include `companyId` on all company-scoped records and enforce
company-scoped uniqueness for invoice numbers and quotation references.

Store monetary values using PostgreSQL `NUMERIC/DECIMAL`, not
floating-point columns.

Use explicit date/time handling and store timestamps consistently
(typically UTC), while displaying dates in the business's configured
timezone. Confirm the required business timezone from the source
documents or user; do not assume the server's timezone.

------------------------------------------------------------------------

# 18. Quality assurance and testing

Do not consider the application complete until the following test
categories pass.

## Unit tests

Test: - Line amount calculations - Subtotal - VAT calculation - Grand
total - Currency rounding - Empty and maximum line-item cases - Invoice
QR TLV encoding/decoding - Manual number/reference duplicate
validation - Company isolation rules - Arabic text handling where
testable

## Integration tests

Test: - Login/logout/session behavior -
Create/read/update/archive/restore invoice -
Create/read/update/archive/restore quotation - Customer creation and
selection - Company-specific template selection - Company-scoped
duplicate invoice number checks - Company-scoped duplicate quotation
reference checks - PDF file generation and storage - QR regeneration
after relevant invoice changes - Backup and restore workflow

## End-to-end tests

Test complete user journeys on desktop and mobile viewport sizes: -
Login - Create invoice for Company 1 - Create invoice for Company 2 -
Create quotation for Company 1 - Create quotation for Company 2 -
Preview, save, download, and print - Search and filter documents - Edit
and restore an archived document

## PDF regression tests

For all four templates: - Compare generated PDF page dimensions to
source. - Check page count and overflow. - Check that required fixed
text exists. - Check Arabic text is not reversed, broken, or clipped. -
Check logos, signatures, tables, QR, and totals. Confirm that no stamp
appears. - Render to images and compare against approved baseline
snapshots.

## Required project checks

Before delivery, run and report: - Type check - Lint - Unit tests -
Integration tests - End-to-end tests, where configured - Production
build - PDF/QR validation tests

Fix errors rather than merely listing them.

------------------------------------------------------------------------

# 19. User experience and visual design

The application UI should be modern, professional, clean, and easy for
non-technical business users.

Requirements: - Responsive mobile-first layouts. - Clear visual
hierarchy. - Consistent spacing, typography, buttons, forms, and
tables. - Simple document creation flow. - Clear required-field
indicators and validation messages. - Helpful success/error
notifications. - Confirmation for destructive actions. - Loading states
and empty states. - No cluttered dashboard. - Large, touch-friendly
mobile controls. - Mobile-friendly tables or responsive card layouts. -
PDF preview should be usable on a phone. - Keep the application's UI
design distinct from the document templates; the PDFs themselves must
follow their original references.

Avoid decorative complexity that makes routine document creation slower.

------------------------------------------------------------------------

# 20. Non-functional requirements

The finished system should be: - Secure - Reliable - Maintainable -
Scalable for growing document/customer volume - Responsive on common
mobile and desktop browsers - Fast for normal business operations -
Accessible - Backed up and recoverable - Consistent in PDF output - Easy
to deploy and update

Set reasonable performance targets and measure them. Avoid claiming a
target has been achieved without testing it.

------------------------------------------------------------------------

# 21. Out of scope unless separately approved

Do not silently add these features to the MVP: - Full ZATCA Phase 2
integration, XML clearance/reporting, cryptographic stamping, or
certificate workflows - Automated invoice or quotation numbering -
Individual employee accounts and role-based permissions - Payment
gateway integration - Inventory management - Accounting ledger/general
ledger - Payroll - Automatic email or WhatsApp delivery -
Customer-facing portal - Multi-currency support beyond SAR - Electronic
signature provider integration

These may be proposed as future enhancements, but the MVP should focus
on the requirements above.

------------------------------------------------------------------------

# 22. Acceptance criteria

The project is accepted only when all applicable criteria below are
satisfied:

1.  The app is accessible online through a secure browser connection.
2.  The same shared login works on mobile, laptop, and desktop.
3.  Owner and employees have the same access in the MVP.
4.  Both companies are represented with separate company data and
    branding.
5.  Each company loads its correct invoice and quotation templates.
6.  Company 1 invoice and quotation closely match their original PDFs.
7.  Company 2 invoice closely matches its original PDF.
8.  Company 2 quotation uses AMANI's layout as the design reference but
    contains DIOUF AL SHARQ's actual company identity and quotation
    content only.
9.  No AMANI-specific information remains in the final DIOUF quotation.
10. Invoice number and quotation reference are entered manually.
11. Duplicate checking is company-scoped.
12. Users can add 1--10 invoice lines and 1--10 quotation lines.
13. Financial calculations are accurate and decimal-safe.
14. VAT defaults to 15% and follows the approved source-document
    treatment.
15. Invoice QR values match the saved invoice data and can be decoded
    successfully.
16. Arabic and English render correctly.
17. PDFs are text-based/searchable wherever possible and print clearly.
18. Users can preview, save, edit, download, and print documents.
19. Users can search and filter saved records.
20. Archive and restore work correctly.
21. Customer records can be managed and selected.
22. Backups and restore are implemented and tested.
23. No important action is a fake or nonfunctional button.
24. Automated checks pass and setup/deployment documentation is
    provided.

------------------------------------------------------------------------

# 23. Implementation phases

Work in phases. Do not try to build everything in one unverified pass.

## Phase 1 --- Discovery and source audit

-   Inspect project structure and dependencies.
-   Find all reference PDFs and assets.
-   Build `docs/source-asset-inventory.md`.
-   Extract document layouts, fixed content, editable fields, and
    company data.
-   Identify missing files and ambiguities.
-   Report the findings and proposed architecture.

**Do not begin final PDF template coding until source mapping is
confirmed.**

## Phase 2 --- Architecture and foundation

-   Set up the application and development scripts.
-   Configure database and migrations.
-   Implement authentication using the confirmed shared-login model.
-   Implement company separation.
-   Establish validation, logging, and error handling.
-   Create responsive application shell and navigation.

## Phase 3 --- Customer and document data

-   Implement customer management.
-   Implement invoice and quotation data models.
-   Implement manual identifiers and company-scoped duplicate
    validation.
-   Implement line-item management and decimal-safe calculations.
-   Implement document snapshots/version history.

## Phase 4 --- PDF templates

-   Implement each of the four template renderers.
-   Reproduce source PDFs.
-   Implement bilingual layout and Arabic support.
-   Implement invoice QR generation.
-   Generate sample PDFs and run visual comparisons.
-   Fix layout mismatches before proceeding.

## Phase 5 --- Dashboard, search, archive, and settings

-   Implement dashboard metrics.
-   Implement document lists and filters.
-   Implement archive/restore.
-   Implement company and application settings.
-   Implement secure file storage.

## Phase 6 --- QA, security, and deployment

-   Complete unit, integration, and end-to-end tests.
-   Complete PDF and QR validation.
-   Test mobile and desktop layouts.
-   Configure production hosting, database, storage, HTTPS, and
    environment secrets.
-   Configure and test backups/restoration.
-   Provide deployment and maintenance documentation.

------------------------------------------------------------------------

# 24. Required deliverables

Provide: - Working application source code - Database schema and
migrations - Four PDF template implementations - Invoice QR
implementation and tests - Authentication and company separation -
Customer management - Invoice and quotation workflows - Dashboard,
search, archive, and settings - Secure PDF/file storage - Automated test
suite - `.env.example` with names of required variables but no secrets -
README with local setup instructions - Deployment guide - Backup and
restore guide - Source asset inventory - Known limitations and
unresolved requirements list

------------------------------------------------------------------------

# 25. Final instruction to Claude Code

Start with **Phase 1: Discovery and source audit**.

First inspect the files actually available in the repository/workspace.
Do not assume ChatGPT uploads are automatically present in Claude Code.
If source PDFs are missing, tell the user exactly which files need to be
copied into `/references/source-pdfs/` and wait for them.

After the source audit, present: 1. The files found and their document
mapping. 2. The fixed company information extracted from each source. 3.
The editable fields identified for each template. 4. Any conflicts,
missing information, or questions that genuinely block accurate
implementation. 5. The recommended architecture and implementation plan.

Do not guess when source documents conflict. Do not replace the supplied
PDF designs with generic templates. Once the source mapping is
confirmed, implement in phases, test each phase, and keep the
application production-quality.
