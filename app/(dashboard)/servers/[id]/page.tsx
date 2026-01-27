import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ArrowLeft, Cpu, HardDrive, LayoutList } from "lucide-react";
import Link from "next/link";
import DetailedChart from "@/components/dashboard/DetailedChart";
import { ChartMetric, Process } from "@/types/server";
import OverviewChart from "@/components/dashboard/OverviewChart";
import ProcessTable from "@/components/dashboard/ProcessTable";

export default async function ServerDetailPage({ params }: { params: { id: string } }) {
    const paramsResolve = await params;
    const serverId = parseInt(paramsResolve.id);

    if (isNaN(serverId)) {
        notFound();
    }

    // 1. Buscamos el servidor con sus últimos 20 checks y sus procesos
    const server = await prisma.server.findUnique({
        where: {
            id: serverId
        },
        include: {
            healthChecks: {
                orderBy: { measuredAt: 'asc' },
                take: 20,
                include: {
                    topProcesses: true
                }
            }
        }
    });

    if (!server) notFound();


    // 2. Formateamos los datos para la gráfica (Recharts no lee Decimals de Prisma)
    const chartData: ChartMetric[] = server.healthChecks.map((check) => ({
        time: new Date(check.measuredAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        }),
        // Forzamos la conversión a Number para eliminar el objeto Decimal de Prisma
        cpu: Number(check.cpuUsage) || 0,
        ram: Number(check.ramUsage) || 0,
        disk: Number(check.diskUsage) || 0,
    }));



    // 3. Obtenemos el último check para mostrar los procesos actuales
    const latestCheck = server.healthChecks[ server.healthChecks.length - 1 ];
    console.log(latestCheck, 'chart')

    const processes: Process[] = server.healthChecks[0]?.topProcesses.map(p => ({
        id: p.id.toString(),
        name: p.processName,
        cpuUsage: Number(p.cpuPercent),
        ramUsage: Number(p.memPercent),
        pid: p.pid
    })) || [];

    return (
        <div className="space-y-6">
            {/* Header de navegación */}
            <div className="flex items-center gap-4">
                <Link href="/servers" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{server.hostname}</h1>
                    <p className="text-sm text-slate-500 font-mono">{server.ipAddress} • {server.osInfo}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols gap-6">
                {/* Columna Izquierda: Gráfica Detallada */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold flex items-center gap-2">
                                <Cpu size={18} className="text-blue-500" /> Historial de Rendimiento
                            </h3>
                        </div>
                        <OverviewChart data={chartData} />
                    </div>
                </div>

                {/* Columna Derecha: Procesos de alto consumo */}
                {/*  <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-full">
                        <h3 className="font-bold flex items-center gap-2 mb-4">
                            <LayoutList size={18} className="text-primary" /> Top Processes
                        </h3>

                        {latestCheck?.topProcesses.length > 0 ? (
                            <div className="space-y-4">
                                {latestCheck.topProcesses.map((proc) => (
                                    <div key={proc.id.toString()} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{proc.processName}</span>
                                            <span className="text-[10px] text-slate-400 uppercase font-medium">MEM: {Number(proc.memPercent)}%</span>
                                        </div>
                                        <span className={`text-sm font-black ${Number(proc.cpuPercent) > 50 ? 'text-red-500' : 'text-slate-600 dark:text-slate-400'}`}>
                                            {Number(proc.cpuPercent)}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-40 text-center">
                                <p className="text-xs text-slate-400 italic">No heavy processes detected in the last check.</p>
                            </div>
                        )}
                    </div>
                </div> */}
                <div className="lg:col-span-4">
                    <ProcessTable processes={processes} />
                </div>
            </div>
        </div>
    );
}