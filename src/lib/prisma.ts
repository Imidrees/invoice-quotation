let prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new (require('@prisma/client').PrismaClient)()
} else {
  if (!global.prisma) {
    global.prisma = new (require('@prisma/client').PrismaClient)({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || "file:./prisma/dev.db"
        }
      }
    })
  }
  prisma = global.prisma
}

export { prisma }
