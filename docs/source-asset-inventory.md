# Source Asset Inventory

**Project:** Invoice & Quotation Management System  
**Date Prepared:** 2026-11-22  
**Status:** Phase 1 Discovery - Awaiting Company 1 identification and content verification

---

## Files Found in Workspace

| Filename | File Type | Size | Status | Notes |
|----------|-----------|------|--------|-------|
| invoice 1.pdf | PDF | 381 KB | ✓ Located | Presumed Company 1 invoice template |
| invoice 2.pdf | PDF | 1 MB | ✓ Located | Presumed Company 2 (DIOUF AL SHARQ) invoice template |
| qoutation 1.pdf | PDF | 263.5 KB | ✓ Located | Presumed Company 1 quotation template |
| QUOTATION 2 header.pdf | PDF | 110.6 KB | ✓ Located | Company 2 quotation header component |
| QUOTATION 2 footer.pdf | PDF | 98 KB | ✓ Located | Company 2 quotation footer component |
| Invoice_Quotation_Management_System_PRD_Localhost.md | Markdown | 39.4 KB | ✓ Located | Product Requirements Document |

---

## Document Mapping (Preliminary)

### Company 1 - **[NAME REQUIRED]**
**Status:** Needs identification from invoice 1.pdf and quotation 1.pdf

#### Invoice 1
- **Source File:** `invoice 1.pdf`
- **Type:** Invoice template design reference
- **Content Source:** invoice 1.pdf
- **Purpose:** Design and content template for Company 1 invoices
- **Extracted Company Info:** PENDING - Awaiting text extraction and verification

#### Quotation 1
- **Source File:** `qoutation 1.pdf` (note: filename has typo "qoutation")
- **Type:** Quotation template design reference
- **Content Source:** qoutation 1.pdf
- **Purpose:** Design and content template for Company 1 quotations
- **Extracted Company Info:** PENDING - Awaiting text extraction and verification

---

### Company 2 - DIOUF AL SHARQ GENERAL CONTRACTING CO.
**Status:** Identified from PRD; needs verification against invoice 2.pdf

**Known Details:**
- Legal Name: DIOUF AL SHARQ GENERAL CONTRACTING CO.
- Commercial Registration (CR): 4030313386
- VAT Registration Number: 310205801200003
- Address: Gharnath Street, opposite Saudi Aramco Complex, Musharifa, Jeddah, Saudi Arabia
- Email: info@dioufalsharq.com

#### Invoice 2
- **Source File:** `invoice 2.pdf`
- **Type:** Invoice template design reference
- **Content Source:** invoice 2.pdf
- **Purpose:** Design and content template for Company 2 invoices
- **Status:** Needs verification that company details match PRD known information

#### Quotation 2 (Special Mapping)
- **Source Files:** `QUOTATION 2 header.pdf` + `QUOTATION 2 footer.pdf`
- **Type:** Quotation template (split across header and footer)
- **Design Reference:** AMANI non-manpower quotation layout
- **Content Source:** DIOUF AL SHARQ quotation content
- **Status:** Header and footer appear to be separate components; needs assembly and verification
- **Implementation Note:** Use AMANI layout as design reference only. Replace all AMANI branding/content with DIOUF AL SHARQ information.

---

## Critical Questions Requiring Clarification

### 1. Company 1 Identity
❌ **BLOCKING ISSUE:** Company 1 name and details must be extracted from invoice 1.pdf and qoutation 1.pdf.

**Action Required:**
- Confirm the exact company name from invoice 1.pdf
- Confirm all company details (CR, VAT number, address, contact info, website, bank details)
- Confirm whether Company 1 invoice and quotation PDFs are the actual source templates
- Provide any Company 1 logo or branding assets if separate from PDFs

### 2. Company 2 Quotation Structure
⚠️ **CLARIFICATION NEEDED:** The quotation 2 is split into header and footer PDFs.

**Questions:**
- Are these components meant to be assembled into one quotation template, or are they separate sections?
- Is there a quotation body/content section missing?
- Should the footer appear on every page or only the last page?
- Are there page breaks or multi-page considerations?

### 3. Source PDF Completeness
❌ **CLARIFICATION NEEDED:**

**Questions:**
- Are all required PDFs present? The PRD references:
  - Company 1 invoice ✓ (invoice 1.pdf)
  - Company 1 quotation ✓ (qoutation 1.pdf)
  - Company 2 invoice ✓ (invoice 2.pdf)
  - Company 2 quotation design reference (AMANI template) ❌ **MISSING**
  - Company 2 quotation content reference ❌ **UNCLEAR if separate from header/footer**

- Are logos, signatures, or other brand assets available as separate files?
- Has an AMANI template PDF been provided for the quotation design reference?

### 4. Document Characteristics (To Be Extracted)
For each template, we need:

| Property | Invoice 1 | Quotation 1 | Invoice 2 | Quotation 2 |
|----------|-----------|------------|-----------|------------|
| Page Size | PENDING | PENDING | PENDING | PENDING |
| Orientation | PENDING | PENDING | PENDING | PENDING |
| Language(s) | PENDING | PENDING | PENDING | PENDING |
| QR Code Present | PENDING | PENDING | PENDING | PENDING |
| Signature Area | PENDING | PENDING | PENDING | PENDING |
| Stamp/Seal Area | PENDING | PENDING | PENDING | PENDING |
| Table Columns | PENDING | PENDING | PENDING | PENDING |
| Fixed Content | PENDING | PENDING | PENDING | PENDING |
| Editable Fields | PENDING | PENDING | PENDING | PENDING |

---

## Extracted Editable Fields (Pending Verification)

### Expected Invoice Fields (from PRD)
- Invoice number (manual entry)
- Invoice date
- Supply date (if applicable)
- Customer name and details
- Customer address and VAT number
- PO number
- Product/service description
- Quantity
- Rate/unit price
- Line item amounts (auto-calculated)
- Subtotal (auto-calculated)
- VAT amount (auto-calculated)
- Grand total (auto-calculated)

### Expected Quotation Fields (from PRD)
- Quotation reference (manual entry)
- Quotation date
- Customer/client name and details
- Project name/location
- Offer validity
- Contract/service period
- Subject
- Introductory paragraph
- Work description
- Unit
- Quantity
- Rate
- Line amounts (auto-calculated)
- Subtotal (auto-calculated)
- VAT amount (auto-calculated)
- Grand total (auto-calculated)

---

## Missing Assets and Dependencies

### Required Before Template Implementation

| Asset | Company 1 | Company 2 | Status |
|-------|-----------|-----------|--------|
| Logo/Brand Image | ❓ | ❓ | Not located as separate file |
| Signature Image | ❓ | ❓ | Not located as separate file |
| Stamp/Seal | ❌ PROHIBITED | ❌ PROHIBITED | Per PRD: Do not use or reproduce |
| Arabic-compliant Fonts | ? | ? | Implementation step |
| QR Code Template | N/A | Expected | To be generated dynamically |

### Questions About Assets
- Are Company 1 and Company 2 logos embedded in the PDFs, or available as separate image files?
- Are signature images available as separate files?
- Should fonts be embedded or loaded from a system/web source?

---

## Implementation Blockers and Next Steps

### BEFORE proceeding to Phase 2 (Architecture and Foundation):

1. ✅ **PRD Reviewed** - All requirements understood
2. ❌ **Company 1 Identification** - Exact name and details must be confirmed from invoice 1.pdf
3. ❌ **Document Text Extraction** - Full text content of all PDFs needed to map all fixed and editable fields
4. ⚠️ **Company 2 Quotation Assembly** - Clarify structure of header/footer split PDFs
5. ❌ **Missing AMANI Template** - If a separate AMANI quotation template exists, it must be provided
6. ❌ **Asset Files** - Confirm whether logos/signatures are embedded or separate

### Recommended Directory Structure (Once Assets Are Confirmed)

```
/project-root/
├── /references/
│   ├── /source-pdfs/
│   │   ├── company-1-invoice.pdf
│   │   ├── company-1-quotation.pdf
│   │   ├── company-2-invoice.pdf
│   │   ├── company-2-quotation-header.pdf
│   │   ├── company-2-quotation-footer.pdf
│   │   └── amani-quotation-template-reference.pdf  [if separate]
│   ├── /logos/
│   │   ├── company-1-logo.png
│   │   └── company-2-logo.png
│   ├── /signatures/
│   │   ├── company-1-signature.png
│   │   └── company-2-signature.png
│   └── /fonts/
│       ├── [Arabic-compliant fonts if needed]
├── docs/
│   ├── source-asset-inventory.md
│   └── implementation-plan.md
├── src/
├── README.md
└── [project files]
```

---

## Notes and Observations

- **PRD Stamp Prohibition:** Strictly observed. No stamp/seal will be reproduced or displayed per section 1, item "Stamp prohibition."
- **Bilingual Support Required:** Both templates must support Arabic and English text with proper RTL rendering.
- **VAT Treatment:** Default 15% VAT; source PDFs may specify different treatment for quotations.
- **Shared Login Model:** Confirmed as MVP requirement; owner and employees share credentials.
- **Company Separation:** Strict separation required; never mix company data or records.

---

## Action Items for User

**CRITICAL - Please provide or confirm:**

1. **Company 1 Details**
   - [ ] Extract and confirm company name from invoice 1.pdf
   - [ ] Provide CR number, VAT number, address, email, phone, website
   - [ ] Confirm whether invoice 1.pdf and qoutation 1.pdf are the authoritative source templates

2. **Company 2 Quotation**
   - [ ] Clarify the structure: Are header/footer PDFs complete, or is there a missing body section?
   - [ ] Confirm whether an AMANI quotation template exists and must be provided separately

3. **Assets**
   - [ ] Confirm whether logos and signatures are embedded in PDFs or available as separate files
   - [ ] Provide any separate asset files (logos, signatures, fonts)

4. **Additional Source PDFs (if applicable)**
   - [ ] Provide AMANI quotation design reference if it's a separate file

Once these items are confirmed, Phase 1 will be complete and Phase 2 (Architecture and Foundation) can begin.

---

**Prepared by:** Claude Code  
**Next Review:** After user clarifications provided
