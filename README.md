# Server Dashboard

Instrucciones rápidas para levantar el proyecto y comandos de Prisma para migraciones y seed.

## Requisitos
- Node.js (>=16)
- npm / yarn / pnpm
- PostgreSQL (conexión en `.env`)

## Instalación
```sh
npm install
# o
pnpm install
# o
yarn
```

## Desarrollo
Levantar en modo desarrollo (hot-reload):
```sh
npm run dev
# o
pnpm dev
# o
yarn dev
```
Abrir: http://localhost:3000

## Build / Producción
Construir y servir:
```sh
npm run build
npm run start
```

## Prisma — Migraciones y seed
Si haces cambios en el esquema (`prisma/schema.prisma`) o en tablas:

1. Generar una nueva migración (desarrollo):
```sh
npx prisma migrate dev --name <descripcion_del_cambio>
```

2. Regenerar el cliente de Prisma:
```sh
npx prisma generate
```

3. Ejecutar el seed (poblar datos iniciales):
```sh
npx prisma db seed
```

Comandos útiles adicionales:

- Aplicar migraciones en producción:
```sh
npx prisma migrate deploy
npx prisma generate
npx prisma db seed
```

- Resetear la base de datos (borra datos y aplica migraciones):
```sh
npx prisma migrate reset
npx prisma db seed
```
> Atención: `migrate reset` elimina datos. Usar con precaución.

## Archivos relevantes
- Esquema de Prisma: `prisma/schema.prisma`
- Seed script: `prisma/seed.ts`
- Migraciones: `prisma/migrations`
- Cliente Prisma usado en el proyecto: `lib/prisma.ts`
- Scripts y dependencias: `package.json`

}