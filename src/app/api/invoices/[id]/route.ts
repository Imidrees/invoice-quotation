import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: {
        lineItems: true,
        company: true,
      },
    });

    if (!invoice) {
      return Response.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    return Response.json(invoice);
  } catch (error) {
    console.error('Get invoice error:', error);
    return Response.json(
      { error: 'Failed to fetch invoice' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const invoice = await prisma.invoice.update({
      where: { id: params.id },
      data: body,
      include: { lineItems: true },
    });

    return Response.json(invoice);
  } catch (error) {
    console.error('Update invoice error:', error);
    return Response.json(
      { error: 'Failed to update invoice' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Move to archive instead of permanent delete
    const invoice = await prisma.invoice.update({
      where: { id: params.id },
      data: { status: 'archived' },
    });

    return Response.json({ success: true, invoice });
  } catch (error) {
    console.error('Archive invoice error:', error);
    return Response.json(
      { error: 'Failed to archive invoice' },
      { status: 500 }
    );
  }
}
