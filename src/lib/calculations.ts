import { Decimal } from '@prisma/client/runtime/library';

/**
 * Financial calculations with decimal-safe arithmetic
 * Always use Decimal for monetary values to avoid floating-point errors
 */

export function calculateLineAmount(quantity: Decimal | number, rate: Decimal | number): Decimal {
  const q = new Decimal(quantity);
  const r = new Decimal(rate);
  return q.times(r);
}

export function calculateSubtotal(lineAmounts: (Decimal | number)[]): Decimal {
  return lineAmounts.reduce((sum, amount) => {
    return new Decimal(sum).plus(new Decimal(amount));
  }, new Decimal(0));
}

export function calculateVAT(subtotal: Decimal | number, vatRate: Decimal | number = 15): Decimal {
  const sub = new Decimal(subtotal);
  const rate = new Decimal(vatRate);
  return sub.times(rate).dividedBy(100).toDecimalPlaces(2);
}

export function calculateGrandTotal(subtotal: Decimal | number, vat: Decimal | number): Decimal {
  return new Decimal(subtotal).plus(new Decimal(vat)).toDecimalPlaces(2);
}

export function formatSAR(amount: Decimal | number): string {
  const num = new Decimal(amount).toNumber();
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

export function roundToTwoDecimals(value: Decimal | number): Decimal {
  return new Decimal(value).toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
}
