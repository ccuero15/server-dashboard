import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ChartMetric, Process } from "@/types/server";
import ServerDetailClient from "./ServerDetailCliente"; // Asegúrate de que el nombre coincida

export default async function ServerDetailPage({ params }: { params: { id: string } }) {
    // Resolvemos params para Next.js 15+
    const paramsResolve = await params;
    const serverId = parseInt(paramsResolve.id);

    if (isNaN(serverId)) notFound();

    // 1. Carga inicial desde la DB para el primer renderizado
    const server = await prisma.server.findUnique({
        where: { id: serverId },
        include: {
            healthChecks: {
                orderBy: { measuredAt: 'desc' }, // Traemos los más recientes primero
                take: 20,
                include: {
                    topProcesses: true
                }
            }
        }
    });

    if (!server) notFound();

    // 2. Formateamos el historial para la gráfica (Invertimos para que el eje X sea cronológico)
    const initialChartData: ChartMetric[] = server.healthChecks
        .reverse()
        .map((check) => ({
            time: new Date(check.measuredAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }),
            cpu: Number(check.cpuUsage) || 0,
            ram: Number(check.ramUsage) || 0,
            disk: Number(check.diskUsage) || 0,
        }));

    // 3. Obtenemos los procesos del último check registrado
    // Nota: Como ahora filtramos por >75%, esto podría estar vacío, lo cual es correcto.
    const latestCheck = server.healthChecks[server.healthChecks.length - 1];
    const initialProcesses: Process[] = latestCheck?.topProcesses.map(p => ({
        id: p.id.toString(),
        name: p.processName,
        cpuUsage: Number(p.cpuPercent),
        ramUsage: Number(p.memPercent),
        pid: p.pid
    })) || [];

    return (
        <div className="space-y-6">
            {/* Header Estático (SEO Friendly) */}
            <div className="flex items-center gap-4">
                <Link 
                    href="/servers" 
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {server.hostname}
                    </h1>
                    <p className="text-sm text-slate-500 font-mono">
                        {server.ipAddress} • {server.osInfo}
                    </p>
                </div>
            </div>

            {/* 4. EL CLIENTE DINÁMICO: 
              Le pasamos los datos iniciales de la DB. 
              Él se encargará de conectar el SSE y usar SWR.
            */}
            <ServerDetailClient 
                serverId={serverId}
                initialChartData={initialChartData}
                initialProcesses={initialProcesses}
            />
        </div>
    );
}