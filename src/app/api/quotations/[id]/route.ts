import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const quotation = await prisma.quotation.findUnique({
      where: { id: params.id },
      include: {
        lineItems: true,
        company: true,
      },
    });

    if (!quotation) {
      return Response.json(
        { error: 'Quotation not found' },
        { status: 404 }
      );
    }

    return Response.json(quotation);
  } catch (error) {
    console.error('Get quotation error:', error);
    return Response.json(
      { error: 'Failed to fetch quotation' },
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

    const quotation = await prisma.quotation.update({
      where: { id: params.id },
      data: body,
      include: { lineItems: true },
    });

    return Response.json(quotation);
  } catch (error) {
    console.error('Update quotation error:', error);
    return Response.json(
      { error: 'Failed to update quotation' },
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
    const quotation = await prisma.quotation.update({
      where: { id: params.id },
      data: { status: 'archived' },
    });

    return Response.json({ success: true, quotation });
  } catch (error) {
    console.error('Archive quotation error:', error);
    return Response.json(
      { error: 'Failed to archive quotation' },
      { status: 500 }
    );
  }
}
