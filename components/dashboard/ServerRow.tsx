import { ServerWithLastCheck } from "@/types/server";
import { Search } from "lucide-react";
import Link from "next/link";

// src/components/dashboard/ServerRow.tsx
export default function ServerRow({ server }: { server: ServerWithLastCheck }) {
  const lastCheck = server.lastCheck;

  // Lógica de estado: Si no hay checks o el último fue hace más de 5 min, está offline
  const isOnline = lastCheck
    ? (new Date().getTime() - new Date(lastCheck.measuredAt).getTime()) < 5 * 60 * 1000
    : false;

  const cpu = Number(lastCheck?.cpuUsage || 0);
  const ram = Number(lastCheck?.ramUsage || 0);

  return (
    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className={`size-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
          <div>
            <p className="font-bold text-slate-900 dark:text-white leading-none">{server.hostname}</p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">{server.osInfo || 'Unknown OS'}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6 font-mono text-xs text-slate-600 dark:text-slate-400">
        {server.ipAddress}
      </td>
      <td className="py-4 px-6">
        <div className="flex flex-col gap-1.5 w-32">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
            <span>CPU</span>
            <span>{cpu}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${cpu > 85 ? 'bg-red-500' : 'bg-primary'}`}
              style={{ width: `${cpu}%` }}
            />
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex flex-col gap-1.5 w-32">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
            <span>RAM</span>
            <span>{ram}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${ram > 90 ? 'bg-amber-500' : 'bg-indigo-500'}`}
              style={{ width: `${ram}%` }}
            />
          </div>
        </div>
      </td>
      <td className="py-4 px-6 text-right">
        <button className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all text-slate-400">
          <Link href={`/servers/${server.id}`}>
            <Search size={16} />
          </Link>
        </button>
      </td>
    </tr>
  );
}