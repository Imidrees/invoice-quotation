import { prisma } from '@/lib/prisma';
import { COMPANIES } from '@/lib/constants';
import { hashPassword } from '@/lib/auth';

async function main() {
  console.log('🌱 Seeding database...');

  try {
    // Create companies
    console.log('Creating companies...');
    const amani = await prisma.company.upsert({
      where: { crNumber: COMPANIES.AMANI.crNumber },
      update: {},
      create: {
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
    });

    const diouf = await prisma.company.upsert({
      where: { crNumber: COMPANIES.DIOUF.crNumber },
      update: {},
      create: {
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
    });

    console.log(`✅ Companies created: ${amani.id}, ${diouf.id}`);

    // Create default user (shared login)
    console.log('Creating default user...');
    const hashedPassword = await hashPassword('admin123');
    const user = await prisma.user.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        password: hashedPassword,
      },
    });

    console.log(`✅ Default user created: ${user.id}`);
    console.log(`
📋 Default Credentials:
   Username: admin
   Password: admin123

⚠️  Change these credentials immediately after first login!
    `);

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
