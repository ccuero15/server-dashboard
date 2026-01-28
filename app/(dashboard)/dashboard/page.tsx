import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ServerRow from "@/components/dashboard/ServerRow";
import { prisma } from "@/lib/prisma";
import OverviewChart from "@/components/dashboard/OverviewChart";
import { Server, Activity, AlertTriangle } from "lucide-react";

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    // Consultamos los servidores reales y su último HealthCheck
    const servers = await prisma.server.findMany({
        include: {
            healthChecks: {
                orderBy: { measuredAt: 'desc' },
                take: 10
            }
        }
    });

    // Mapeamos los datos para que el componente ServerRow reciba lo que espera
    const serversData = servers.map(s => ({
        id: s.id,
        hostname: s.hostname,
        ipAddress: s.ipAddress,
        osInfo: s.osInfo,
        createdAt: s.createdAt || new Date(),
        lastCheck: s.healthChecks[0] ? {
            cpuUsage: Number(s.healthChecks[0].cpuUsage),
            ramUsage: Number(s.healthChecks[0].ramUsage),
            diskUsage: Number(s.healthChecks[0].diskUsage),
            measuredAt: s.healthChecks[0].measuredAt,
        }
        : undefined
    }));

    // Cálculos para los KPIs Globales
    const totalServers = serversData.length;
    const serversWithAlerts = serversData.filter(s => (s.lastCheck?.cpuUsage || 0) > 80).length;
    const avgCpu = totalServers > 0 
        ? (serversData.reduce((acc, s) => acc + (s.lastCheck?.cpuUsage || 0), 0) / totalServers).toFixed(1) 
        : 0;
    
        const serverChecks = servers.flatMap(s => s.healthChecks);

    const chartData = serverChecks.map((check) => ({
        time: new Date(check.measuredAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        }),
        cpu: Number(check.cpuUsage),
        ram: Number(check.ramUsage),
        disk: Number(check.diskUsage),
    }));

    console.log(chartData)
    return (
        <div className="space-y-8">
            {/* KPI Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard title="Total Servers" value={totalServers.toString()} icon={<Server className="text-blue-500" />} />
                <StatCard title="Global CPU Avg" value={`${avgCpu}%`} icon={<Activity className="text-cyan-500" />} />
                <StatCard title="Active Alerts" value={serversWithAlerts.toString()} icon={<AlertTriangle className="text-amber-500" />} color={serversWithAlerts > 0 ? "text-amber-500" : ""} />
                {/* <StatCard title="DB Status" value="Online" icon={<Database className="text-green-500" />} /> */}
            </section>

            {/* Gráfica General (Puedes pasarle datos reales si los tienes) */}
            <OverviewChart data={chartData} />

            {/* Table Section */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Server Status</h3>
                        <p className="text-xs text-slate-500">Real-time monitoring from infrastructure</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                            <tr>
                                <th className="py-4 px-6 border-b border-slate-100 dark:border-slate-800">Hostname / Node</th>
                                <th className="py-4 px-6 border-b border-slate-100 dark:border-slate-800">IP Address</th>
                                <th className="py-4 px-6 border-b border-slate-100 dark:border-slate-800">CPU Usage</th>
                                <th className="py-4 px-6 border-b border-slate-100 dark:border-slate-800">RAM Usage</th>
                                <th className="py-4 px-6 border-b border-slate-100 dark:border-slate-800 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {serversData.map((server) => (
                                <ServerRow key={server.id.toString()} server={server} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Componente auxiliar para las Cards de arriba
function StatCard({ title, value, icon, color = "text-slate-900 dark:text-white" }: { title: string; value: string; icon: React.ReactNode; color?: string }) {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">{icon}</div>
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
        </div>
    );
}