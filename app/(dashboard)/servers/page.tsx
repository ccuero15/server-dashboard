import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ServerWithLastCheck } from "@/types/server";
import ServerRow from "@/components/dashboard/ServerRow";
import { Search, Plus } from "lucide-react";

export default async function ServersPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // 1. Fetch de datos desde la DB
  const rawServers = await prisma.server.findMany({
    include: {
      healthChecks: {
        orderBy: { measuredAt: 'desc' },
        take: 1
      }
    }
  });

  // 2. Mapeo ESTRICTO para limpiar tipos de Prisma (BigInt, Decimal, Date)
  const servers: ServerWithLastCheck[] = rawServers.map((s) => ({
    id: s.id,
    hostname: s.hostname,
    ipAddress: s.ipAddress,
    osInfo: s.osInfo,
    lastCheck: s.healthChecks[0] ? {
      id: s.healthChecks[0].id.toString(), // De BigInt a string
      cpuUsage: Number(s.healthChecks[0].cpuUsage), // De Decimal a number
      ramUsage: Number(s.healthChecks[0].ramUsage),
      diskUsage: Number(s.healthChecks[0].diskUsage),
      measuredAt: s.healthChecks[0].measuredAt// De Date a string
    } : undefined
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
            Infrastructure Nodes
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Real-time monitoring of your connected systems
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Toolbar de búsqueda rápida */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Quick search nodes..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-none rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 text-[10px] uppercase tracking-widest font-black">
              <tr>
                <th className="py-4 px-6">Hostname / Node</th>
                <th className="py-4 px-6">IP Address</th>
                <th className="py-4 px-6">CPU Load</th>
                <th className="py-4 px-6">RAM Usage</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {servers.length > 0 ? (
                servers.map((server) => (
                  <ServerRow key={server.id} server={server} />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-slate-400 text-sm italic">
                    No active servers found in the fleet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}