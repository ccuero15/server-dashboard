import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';
import bcrypt from "bcryptjs";
import { Prisma, PrismaClient } from '@/generated/prisma/client';

// Configuración del pool para el adaptador de Postgres
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🚀 Iniciando el Seeding...');

    // 1. Crear Usuarios
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const users = [
        {
            email: 'admin@empresa.com',
            name: 'Super Admin',
            password: adminPassword,
            role: 'ADMIN' as const,
        },
        {
            email: 'user@empresa.com',
            name: 'Usuario Regular',
            password: userPassword,
            role: 'VIEWER' as const,
        }
    ];

    for (const u of users) {
        await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: u,
        });
        console.log(`✅ Usuario verificado/creado: ${u.email}`);
    }

    // 2. Crear Servidores
    const servers = [
        {
            hostname: 'srv-prod-01',
            ipAddress: '192.168.1.10',
            osInfo: 'Ubuntu 22.04 LTS',
        },
        {
            hostname: 'srv-db-cluster',
            ipAddress: '192.168.1.20',
            osInfo: 'Debian 12',
        }
    ];

    for (const s of servers) {
        await prisma.server.upsert({
            where: { hostname: s.hostname },
            update: {},
            create: s,
        });
        console.log(`✅ Servidor verificado/creado: ${s.hostname}`);
    }

    // 3. Crear Métrica de prueba (HealthCheck + TopProcesses)
    const targetServer = await prisma.server.findUnique({
        where: { hostname: 'srv-prod-01' },
    });

    if (targetServer) {
        // La magia de Prisma: Creación anidada
        const checkConPico = await prisma.healthCheck.create({
            data: {
                serverId: targetServer.id,
                cpuUsage: new Prisma.Decimal(85.5), // Simulando un pico > 80
                ramUsage: new Prisma.Decimal(45.3),
                diskUsage: new Prisma.Decimal(60.2),
                measuredAt: new Date(),
                topProcesses: {
                    create: [
                        {
                            processName: 'node-backend',
                            cpuPercent: new Prisma.Decimal(70.2),
                            memPercent: new Prisma.Decimal(15.5)
                        },
                        {
                            processName: 'postgresql',
                            cpuPercent: new Prisma.Decimal(10.1),
                            memPercent: new Prisma.Decimal(20.0)
                        }
                    ]
                }
            }
        });
        console.log(`✅ Métrica y procesos creados. ID del Check: ${checkConPico.id.toString()}`);
    }

    console.log('✨ Seeding finalizado con éxito');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('❌ Error en el seeding:', e);
        await prisma.$disconnect();
        process.exit(1);
    });