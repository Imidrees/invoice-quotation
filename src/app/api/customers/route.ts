import { prisma } from '@/lib/prisma';
import { CreateCustomerSchema } from '@/lib/validation';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');

    if (!companyId) {
      return Response.json(
        { error: 'companyId is required' },
        { status: 400 }
      );
    }

    const customers = await prisma.customer.findMany({
      where: { companyId },
      orderBy: { name: 'asc' },
    });

    return Response.json(customers);
  } catch (error) {
    console.error('Get customers error:', error);
    return Response.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = CreateCustomerSchema.parse(body);

    const customer = await prisma.customer.create({
      data,
    });

    return Response.json(customer, { status: 201 });
  } catch (error) {
    console.error('Create customer error:', error);
    return Response.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}
