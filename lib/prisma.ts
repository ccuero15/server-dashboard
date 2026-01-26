import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import 'server-only'; 



const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

// Forzar que este archivo solo se ejecute en el servidor

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;



if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

