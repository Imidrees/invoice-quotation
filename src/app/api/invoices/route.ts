import { prisma } from '@/lib/prisma';
import { CreateInvoiceSchema } from '@/lib/validation';
import { calculateLineAmount, calculateSubtotal, calculateVAT, calculateGrandTotal, roundToTwoDecimals } from '@/lib/calculations';
import { createQRPayload, generateQRCode } from '@/lib/qr';
import { Decimal } from '@prisma/client/runtime/library';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = CreateInvoiceSchema.parse(body);

    // Check for duplicate invoice number within the company
    const existing = await prisma.invoice.findFirst({
      where: {
        companyId: data.companyId,
        invoiceNumber: data.invoiceNumber.trim(),
      },
    });

    if (existing) {
      return Response.json(
        { error: `Invoice number "${data.invoiceNumber}" already exists for this company` },
        { status: 409 }
      );
    }

    // Get company details for QR code
    const company = await prisma.company.findUnique({
      where: { id: data.companyId },
    });

    if (!company) {
      return Response.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    // Calculate totals
    let subtotal = new Decimal(0);
    const lineItems = data.lineItems.map((item) => {
      const amount = calculateLineAmount(item.quantity, item.rate);
      subtotal = subtotal.plus(amount);
      return {
        ...item,
        amount: amount.toString(),
      };
    });

    const vatAmount = calculateVAT(subtotal, 15);
    const grandTotal = calculateGrandTotal(subtotal, vatAmount);

    // Create QR payload
    const qrPayload = createQRPayload(
      company.name,
      company.vatNumber,
      new Date(data.invoiceDate),
      grandTotal.toString(),
      vatAmount.toString()
    );

    const qrDataUrl = await generateQRCode(qrPayload);

    // Create customer snapshot
    const customerSnapshot = {
      name: data.customerId ? (await prisma.customer.findUnique({ where: { id: data.customerId } }))?.name : 'Guest Customer',
      email: '',
      phone: '',
      address: '',
    };

    // Create invoice
    const invoice = await prisma.invoice.create({
      data: {
        companyId: data.companyId,
        customerId: data.customerId,
        invoiceNumber: data.invoiceNumber.trim(),
        invoiceDate: new Date(data.invoiceDate),
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        poNumber: data.poNumber,
        customerSnapshot: JSON.stringify(customerSnapshot),
        subtotal,
        vatAmount,
        grandTotal,
        qrPayload: qrDataUrl,
        status: 'saved',
        lineItems: {
          createMany: {
            data: lineItems.map((item, index) => ({
              lineNumber: index + 1,
              description: item.description,
              quantity: new Decimal(item.quantity),
              rate: new Decimal(item.rate),
              amount: new Decimal(item.amount),
            })),
          },
        },
      },
      include: {
        lineItems: true,
      },
    });

    return Response.json(invoice, { status: 201 });
  } catch (error) {
    console.error('Create invoice error:', error);
    return Response.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');

    const where = companyId ? { companyId } : {};

    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        where,
        include: { lineItems: true },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.invoice.count({ where }),
    ]);

    return Response.json({
      data: invoices,
      total,
      limit,
      skip,
    });
  } catch (error) {
    console.error('Get invoices error:', error);
    return Response.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}
