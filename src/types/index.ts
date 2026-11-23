export type CompanyType = 'amani' | 'diouf';

export interface Company {
  id: string;
  name: string;
  nameArabic: string;
  crNumber: string;
  vatNumber: string;
  address: string;
  addressArabic: string;
  email: string;
  phone: string;
  website?: string;
  bankName: string;
  bankNameArabic: string;
  accountName: string;
  accountNameArabic: string;
  accountNumber: string;
  ibanNumber: string;
  swiftCode?: string;
  logoBase64?: string;
}

export interface Customer {
  id: string;
  companyId: string;
  name: string;
  businessName?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  vatNumber?: string;
  notes?: string;
}

export interface InvoiceLineItem {
  id?: string;
  lineNumber: number;
  description: string;
  quantity: string;
  rate: string;
  amount?: string;
}

export interface Invoice {
  id: string;
  companyId: string;
  customerId?: string;
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate?: Date;
  poNumber?: string;
  customerSnapshot: Customer;
  lineItems: InvoiceLineItem[];
  subtotal: string;
  vatAmount: string;
  grandTotal: string;
  qrPayload?: string;
  pdfPath?: string;
  status: 'draft' | 'saved' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface QuotationLineItem {
  id?: string;
  lineNumber: number;
  description: string;
  unit?: string;
  quantity: string;
  rate: string;
  amount?: string;
}

export interface Quotation {
  id: string;
  companyId: string;
  customerId?: string;
  quotationRef: string;
  quotationDate: Date;
  validUntil?: Date;
  projectName?: string;
  subject?: string;
  introText?: string;
  customerSnapshot: Customer;
  lineItems: QuotationLineItem[];
  subtotal: string;
  vatAmount: string;
  grandTotal: string;
  pdfPath?: string;
  status: 'draft' | 'saved' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface PDFTemplate {
  generateHTML: (data: any) => string;
  generatePDF: (data: any) => Promise<Buffer>;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}
