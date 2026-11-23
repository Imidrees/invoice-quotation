import { prisma } from '@/lib/prisma';
import { COMPANIES } from '@/lib/constants';

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        settings: true,
      },
    });

    // If no companies exist, seed with defaults
    if (companies.length === 0) {
      const created = await Promise.all([
        prisma.company.create({
          data: {
            name: COMPANIES.AMANI.name,
            nameArabic: COMPANIES.AMANI.nameArabic,
            crNumber: COMPANIES.AMANI.crNumber,
            vatNumber: COMPANIES.AMANI.vatNumber,
            address: COMPANIES.AMANI.address,
            addressArabic: COMPANIES.AMANI.addressArabic,
            email: COMPANIES.AMANI.email,
            phone: COMPANIES.AMANI.phone,
            website: COMPANIES.AMANI.website,
            bankName: COMPANIES.AMANI.bankName,
            bankNameArabic: COMPANIES.AMANI.bankNameArabic,
            accountName: COMPANIES.AMANI.accountName,
            accountNameArabic: COMPANIES.AMANI.accountNameArabic,
            accountNumber: COMPANIES.AMANI.accountNumber,
            ibanNumber: COMPANIES.AMANI.ibanNumber,
            swiftCode: COMPANIES.AMANI.swiftCode,
            settings: {
              create: {
                vatRate: 15,
                currency: 'SAR',
                timezone: 'Asia/Riyadh',
              },
            },
          },
        }),
        prisma.company.create({
          data: {
            name: COMPANIES.DIOUF.name,
            nameArabic: COMPANIES.DIOUF.nameArabic,
            crNumber: COMPANIES.DIOUF.crNumber,
            vatNumber: COMPANIES.DIOUF.vatNumber,
            address: COMPANIES.DIOUF.address,
            addressArabic: COMPANIES.DIOUF.addressArabic,
            email: COMPANIES.DIOUF.email,
            phone: COMPANIES.DIOUF.phone,
            website: COMPANIES.DIOUF.website,
            bankName: COMPANIES.DIOUF.bankName,
            bankNameArabic: COMPANIES.DIOUF.bankNameArabic,
            accountName: COMPANIES.DIOUF.accountName,
            accountNameArabic: COMPANIES.DIOUF.accountNameArabic,
            accountNumber: COMPANIES.DIOUF.accountNumber,
            ibanNumber: COMPANIES.DIOUF.ibanNumber,
            swiftCode: COMPANIES.DIOUF.swiftCode,
            settings: {
              create: {
                vatRate: 15,
                currency: 'SAR',
                timezone: 'Asia/Riyadh',
              },
            },
          },
        }),
      ]);
      return Response.json(created);
    }

    return Response.json(companies);
  } catch (error) {
    console.error('Get companies error:', error);
    return Response.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}
