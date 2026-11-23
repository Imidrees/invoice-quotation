import { z } from 'zod';

export const LoginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const CreateInvoiceSchema = z.object({
  companyId: z.string().min(1, 'Company is required'),
  customerId: z.string().optional(),
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  invoiceDate: z.string().datetime(),
  dueDate: z.string().datetime().optional(),
  poNumber: z.string().optional(),
  lineItems: z.array(
    z.object({
      lineNumber: z.number().int().positive(),
      description: z.string().min(1),
      quantity: z.string().regex(/^\d+(\.\d{1,4})?$/, 'Invalid quantity'),
      rate: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid rate'),
    })
  ),
});

export const CreateQuotationSchema = z.object({
  companyId: z.string().min(1, 'Company is required'),
  customerId: z.string().optional(),
  quotationRef: z.string().min(1, 'Quotation reference is required'),
  quotationDate: z.string().datetime(),
  validUntil: z.string().datetime().optional(),
  projectName: z.string().optional(),
  subject: z.string().optional(),
  introText: z.string().optional(),
  lineItems: z.array(
    z.object({
      lineNumber: z.number().int().positive(),
      description: z.string().min(1),
      unit: z.string().optional(),
      quantity: z.string().regex(/^\d+(\.\d{1,4})?$/, 'Invalid quantity'),
      rate: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid rate'),
    })
  ),
});

export const CreateCustomerSchema = z.object({
  companyId: z.string().min(1, 'Company is required'),
  name: z.string().min(1, 'Customer name is required'),
  businessName: z.string().optional(),
  contactPerson: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  vatNumber: z.string().optional(),
  notes: z.string().optional(),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type CreateInvoiceInput = z.infer<typeof CreateInvoiceSchema>;
export type CreateQuotationInput = z.infer<typeof CreateQuotationSchema>;
export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>;
