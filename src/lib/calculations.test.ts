import { calculateLineAmount, calculateSubtotal, calculateVAT, calculateGrandTotal } from '@/lib/calculations';
import { encodeQRPayload, decodeQRPayload, createQRPayload } from '@/lib/qr';
import { Decimal } from '@prisma/client/runtime/library';

describe('Financial Calculations', () => {
  describe('calculateLineAmount', () => {
    it('should calculate line amount correctly', () => {
      const amount = calculateLineAmount(5, 100);
      expect(amount.toString()).toBe('500');
    });

    it('should handle decimal quantities', () => {
      const amount = calculateLineAmount('2.5', '50');
      expect(amount.toString()).toBe('125');
    });

    it('should handle decimal rates', () => {
      const amount = calculateLineAmount(10, '12.50');
      expect(amount.toString()).toBe('125');
    });
  });

  describe('calculateSubtotal', () => {
    it('should sum line amounts', () => {
      const subtotal = calculateSubtotal([100, 200, 150]);
      expect(subtotal.toString()).toBe('450');
    });

    it('should handle decimals', () => {
      const subtotal = calculateSubtotal(['125.50', '200.25', '74.25']);
      expect(subtotal.toString()).toBe('400');
    });
  });

  describe('calculateVAT', () => {
    it('should calculate 15% VAT by default', () => {
      const vat = calculateVAT(1000);
      expect(vat.toString()).toBe('150.00');
    });

    it('should calculate custom VAT rate', () => {
      const vat = calculateVAT(1000, 20);
      expect(vat.toString()).toBe('200.00');
    });

    it('should round to 2 decimals', () => {
      const vat = calculateVAT('999.99', 15);
      expect(vat.toDecimalPlaces(2).toString()).toMatch(/\d+\.\d{2}/);
    });
  });

  describe('calculateGrandTotal', () => {
    it('should add subtotal and VAT', () => {
      const total = calculateGrandTotal(1000, 150);
      expect(total.toString()).toBe('1150.00');
    });

    it('should handle decimal values', () => {
      const total = calculateGrandTotal('999.99', '149.99');
      expect(total.toString()).toBe('1149.98');
    });
  });
});

describe('QR Code TLV Encoding', () => {
  describe('encodeQRPayload', () => {
    it('should encode all required fields', () => {
      const payload = {
        sellerName: 'Test Company',
        sellerVATNumber: '123456789',
        invoiceDateTime: '2024-01-15T10:30:00Z',
        invoiceTotal: '1150.00',
        vatAmount: '150.00',
      };

      const encoded = encodeQRPayload(payload);
      expect(encoded).toBeInstanceOf(Buffer);
      expect(encoded.length).toBeGreaterThan(0);
    });
  });

  describe('decodeQRPayload', () => {
    it('should decode encoded payload correctly', () => {
      const original = {
        sellerName: 'Test Company',
        sellerVATNumber: '123456789',
        invoiceDateTime: '2024-01-15T10:30:00Z',
        invoiceTotal: '1150.00',
        vatAmount: '150.00',
      };

      const encoded = encodeQRPayload(original);
      const decoded = decodeQRPayload(encoded);

      expect(decoded).not.toBeNull();
      expect(decoded?.sellerName).toBe(original.sellerName);
      expect(decoded?.sellerVATNumber).toBe(original.sellerVATNumber);
      expect(decoded?.invoiceTotal).toBe(original.invoiceTotal);
      expect(decoded?.vatAmount).toBe(original.vatAmount);
    });

    it('should return null for invalid buffer', () => {
      const invalid = Buffer.from('invalid data');
      const decoded = decodeQRPayload(invalid);
      expect(decoded).toBeNull();
    });
  });

  describe('createQRPayload', () => {
    it('should create valid QR payload', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const payload = createQRPayload(
        'Test Company',
        '123456789',
        date,
        '1150.00',
        '150.00'
      );

      expect(payload.sellerName).toBe('Test Company');
      expect(payload.sellerVATNumber).toBe('123456789');
      expect(payload.invoiceTotal).toBe('1150.00');
      expect(payload.vatAmount).toBe('150.00');
      expect(payload.invoiceDateTime).toBe(date.toISOString());
    });
  });
});
