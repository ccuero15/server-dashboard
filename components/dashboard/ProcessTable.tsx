// src/components/dashboard/ProcessTable.tsx
'use client';

import { Process } from "@/types/server";
import { LayoutList, AlertTriangle } from "lucide-react";

interface ProcessTableProps {
  processes: Process[];
}

export default function ProcessTable({ processes }: ProcessTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2">
          <LayoutList size={18} className="text-indigo-500" /> 
          Procesos de Alto Consumo
        </h3>
        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500 font-mono">
          TOP 10 ORDENADO POR CPU
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 font-semibold">PID</th>
              <th className="px-6 py-3 font-semibold">Nombre</th>
              <th className="px-6 py-3 font-semibold text-right">CPU %</th>
              <th className="px-6 py-3 font-semibold text-right">RAM %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {processes.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic text-sm">
                  No se detectan procesos pesados en este intervalo.
                </td>
              </tr>
            ) : (
              processes.map((proc) => {
                const isHighCpu = proc.cpuUsage > 80;
                return (
                  <tr 
                    key={proc.id} // Usamos el ID como key estable
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${isHighCpu ? 'bg-red-50/50 dark:bg-red-900/10' : ''}`}
                  >
                    <td className="px-6 py-4 text-xs font-mono text-slate-500">{proc.pid}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {proc.name}
                        </span>
                        {isHighCpu && <AlertTriangle size={14} className="text-red-500 animate-pulse" />}
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-right text-sm font-bold ${isHighCpu ? 'text-red-600' : 'text-slate-700 dark:text-slate-300'}`}>
                      {proc.cpuUsage.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-slate-600 dark:text-slate-400">
                      {proc.ramUsage.toFixed(1)}%
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}