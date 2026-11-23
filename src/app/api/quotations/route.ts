import { prisma } from '@/lib/prisma';
import { CreateQuotationSchema } from '@/lib/validation';
import { calculateLineAmount, calculateSubtotal, calculateVAT, calculateGrandTotal } from '@/lib/calculations';
import { Decimal } from '@prisma/client/runtime/library';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = CreateQuotationSchema.parse(body);

    // Check for duplicate quotation reference within the company
    const existing = await prisma.quotation.findFirst({
      where: {
        companyId: data.companyId,
        quotationRef: data.quotationRef.trim(),
      },
    });

    if (existing) {
      return Response.json(
        { error: `Quotation reference "${data.quotationRef}" already exists for this company` },
        { status: 409 }
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

    // Create customer snapshot
    const customerSnapshot = {
      name: data.customerId ? (await prisma.customer.findUnique({ where: { id: data.customerId } }))?.name : 'Guest Customer',
    };

    // Create quotation
    const quotation = await prisma.quotation.create({
      data: {
        companyId: data.companyId,
        customerId: data.customerId,
        quotationRef: data.quotationRef.trim(),
        quotationDate: new Date(data.quotationDate),
        validUntil: data.validUntil ? new Date(data.validUntil) : null,
        projectName: data.projectName,
        subject: data.subject,
        introText: data.introText,
        customerSnapshot: JSON.stringify(customerSnapshot),
        subtotal,
        vatAmount,
        grandTotal,
        status: 'saved',
        lineItems: {
          createMany: {
            data: lineItems.map((item, index) => ({
              lineNumber: index + 1,
              description: item.description,
              unit: item.unit,
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

    return Response.json(quotation, { status: 201 });
  } catch (error) {
    console.error('Create quotation error:', error);
    return Response.json(
      { error: 'Failed to create quotation' },
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

    const [quotations, total] = await Promise.all([
      prisma.quotation.findMany({
        where,
        include: { lineItems: true },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.quotation.count({ where }),
    ]);

    return Response.json({
      data: quotations,
      total,
      limit,
      skip,
    });
  } catch (error) {
    console.error('Get quotations error:', error);
    return Response.json(
      { error: 'Failed to fetch quotations' },
      { status: 500 }
    );
  }
}
