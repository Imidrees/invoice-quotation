import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: params.id },
    });

    if (!customer) {
      return Response.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    return Response.json(customer);
  } catch (error) {
    console.error('Get customer error:', error);
    return Response.json(
      { error: 'Failed to fetch customer' },
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

    const customer = await prisma.customer.update({
      where: { id: params.id },
      data: body,
    });

    return Response.json(customer);
  } catch (error) {
    console.error('Update customer error:', error);
    return Response.json(
      { error: 'Failed to update customer' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.customer.delete({
      where: { id: params.id },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Delete customer error:', error);
    return Response.json(
      { error: 'Failed to delete customer' },
      { status: 500 }
    );
  }
}
