"use client";

import { Process } from "@/types/server";
import { Cpu, Database } from "lucide-react";

interface ProcessTableProps {
  processes: Process[];
}

export default function ProcessTable({ processes }: ProcessTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <h3 className="font-bold text-slate-900 dark:text-white">Top Processes</h3>
        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 py-1 px-2 rounded-md font-bold uppercase">
          Live
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] text-slate-400 uppercase font-black">
            <tr>
              <th className="px-6 py-3">Process</th>
              <th className="px-6 py-3 text-right">CPU</th>
              <th className="px-6 py-3 text-right">RAM</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {processes.length > 0 ? (
              processes.map((proc) => (
                <tr key={proc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate max-w-[120px]">
                        {proc.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">PID: {proc.pid}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <span className="text-xs font-bold text-blue-500">{proc.cpuUsage.toFixed(1)}%</span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <span className="text-xs font-bold text-cyan-500">{proc.ramUsage.toFixed(1)}%</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-slate-400 text-xs italic">
                  No process data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}