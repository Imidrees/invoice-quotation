import { LoginSchema, CreateInvoiceSchema, CreateQuotationSchema } from '@/lib/validation';

describe('Validation Schemas', () => {
  describe('LoginSchema', () => {
    it('should validate correct login data', () => {
      const data = { username: 'admin', password: 'password123' };
      expect(() => LoginSchema.parse(data)).not.toThrow();
    });

    it('should reject short username', () => {
      const data = { username: 'ab', password: 'password123' };
      expect(() => LoginSchema.parse(data)).toThrow();
    });

    it('should reject short password', () => {
      const data = { username: 'admin', password: '12345' };
      expect(() => LoginSchema.parse(data)).toThrow();
    });
  });

  describe('CreateInvoiceSchema', () => {
    const validInvoice = {
      companyId: 'company-1',
      invoiceNumber: 'INV-001',
      invoiceDate: new Date().toISOString(),
      lineItems: [
        {
          lineNumber: 1,
          description: 'Service',
          quantity: '1',
          rate: '100.00',
        },
      ],
    };

    it('should validate correct invoice data', () => {
      expect(() => CreateInvoiceSchema.parse(validInvoice)).not.toThrow();
    });

    it('should reject missing companyId', () => {
      const invalid = { ...validInvoice, companyId: '' };
      expect(() => CreateInvoiceSchema.parse(invalid)).toThrow();
    });

    it('should reject invalid quantity format', () => {
      const invalid = {
        ...validInvoice,
        lineItems: [{ ...validInvoice.lineItems[0], quantity: 'abc' }],
      };
      expect(() => CreateInvoiceSchema.parse(invalid)).toThrow();
    });
  });
});
