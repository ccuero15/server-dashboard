// src/components/dashboard/ServerTable.tsx

import { ServerWithLastCheck } from "@/types/server";
import ServerRow from "./ServerRow";

 

interface ServerTableProps {
  servers: ServerWithLastCheck[];
}

export default function ServerTable({ servers }: ServerTableProps) {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/30">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Infrastucture Nodes</h3>
          <p className="text-xs text-slate-500 font-medium">Real-time health monitoring from health_checks</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span> Filter
           </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-widest font-bold border-b border-slate-100 dark:border-slate-800">
              <th className="py-4 px-6 font-bold">Node / Hostname</th>
              <th className="py-4 px-6 font-bold">IPv4 Address</th>
              <th className="py-4 px-6 font-bold">CPU Load</th>
              <th className="py-4 px-6 font-bold">RAM Usage</th>
              <th className="py-4 px-6 text-right font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {servers.length > 0 ? (
              servers.map((server) => (
                <ServerRow key={server.id} server={server} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-500 text-sm">
                  No server nodes found in database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}