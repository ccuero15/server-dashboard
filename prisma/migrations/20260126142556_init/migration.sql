-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'VIEWER');

-- CreateTable
CREATE TABLE "servers" (
    "server_id" SERIAL NOT NULL,
    "hostname" VARCHAR(100) NOT NULL,
    "ip_address" VARCHAR(45) NOT NULL,
    "os_info" VARCHAR(100),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "servers_pkey" PRIMARY KEY ("server_id")
);

-- CreateTable
CREATE TABLE "health_checks" (
    "check_id" BIGSERIAL NOT NULL,
    "server_id" INTEGER NOT NULL,
    "cpu_usage" DECIMAL(5,2) NOT NULL,
    "ram_usage" DECIMAL(5,2) NOT NULL,
    "disk_usage" DECIMAL(5,2) NOT NULL,
    "measured_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "health_checks_pkey" PRIMARY KEY ("check_id")
);

-- CreateTable
CREATE TABLE "top_processes" (
    "process_id" BIGSERIAL NOT NULL,
    "check_id" BIGINT NOT NULL,
    "process_name" VARCHAR(255) NOT NULL,
    "cpu_percent" DECIMAL(5,2) NOT NULL,
    "mem_percent" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "top_processes_pkey" PRIMARY KEY ("process_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'VIEWER',
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "servers_hostname_key" ON "servers"("hostname");

-- CreateIndex
CREATE INDEX "idx_healthchecks_server_time" ON "health_checks"("server_id", "measured_at" DESC);

-- CreateIndex
CREATE INDEX "idx_healthchecks_measured_at" ON "health_checks"("measured_at");

-- CreateIndex
CREATE INDEX "idx_topprocesses_check_id" ON "top_processes"("check_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "health_checks" ADD CONSTRAINT "health_checks_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("server_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "top_processes" ADD CONSTRAINT "top_processes_check_id_fkey" FOREIGN KEY ("check_id") REFERENCES "health_checks"("check_id") ON DELETE CASCADE ON UPDATE CASCADE;
