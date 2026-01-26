// src/app/dashboard/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ServerRow from "@/components/dashboard/ServerRow";
// import { prisma } from "@/lib/prisma"; // Descomenta cuando conectes tu DB

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    // SIMULACIÓN DE DATOS DE TU DB (Esto luego lo cambiarás por un await prisma.server.findMany...)
        const serversFromDB = [
            { 
                id: 1, 
                hostname: "US-East-01 (Prod)", 
                ipAddress: "192.168.1.104", 
                osInfo: "Ubuntu 22.04 LTS",
                createdAt: new Date(),
                lastCheck: { cpuUsage: 42, ramUsage: 65, diskUsage: 18, measuredAt: new Date() }
            },
            { 
                id: 2, 
                hostname: "EU-Central-Node", 
                ipAddress: "10.0.42.18", 
                osInfo: "Debian 12",
                createdAt: new Date(),
                lastCheck: { cpuUsage: 89, ramUsage: 78, diskUsage: 54, measuredAt: new Date() }
            },
        ];

    return (
        <div className="space-y-8">
            {/* KPI Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Aquí irían tus KPICards */}
            </section>

            {/* Table Section */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {/* Cabecera de la tabla */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Server Status</h3>
                        <p className="text-xs text-slate-500">Monitored via HealthChecks</p>
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
                            {serversFromDB.map((server) => (
                                <ServerRow key={server.id} server={server} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}