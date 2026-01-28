'use client';

import { memo } from 'react';
import OverviewChart from "@/components/dashboard/OverviewChart";
import ProcessTable from "@/components/dashboard/ProcessTable";
import { ChartMetric, Process } from "@/types/server";
import { Cpu } from "lucide-react";
import { useServerMetrics } from '@/app/hooks/useServerMetrics';

interface Props {
  serverId: number;
  initialChartData: ChartMetric[];
  initialProcesses: Process[];
}

// --- AQUÍ SALEN LOS MEMOIZED COMPONENTS ---
// Evitan re-renders costosos de la UI en cada señal de SSE
const MemoizedChart = memo(OverviewChart);
const MemoizedTable = memo(ProcessTable);

export default function ServerDetailClient({ serverId, initialChartData, initialProcesses }: Props) {
  
  const { chartData, processes } = useServerMetrics(
    serverId, 
    initialChartData, 
    initialProcesses
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Cpu size={18} className="text-blue-500" /> Monitoreo en Vivo
            </h3>
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          
          {/* Usamos el componente memoizado */}
          <MemoizedChart data={chartData || []} />
        </div>
      </div>

      <div className="lg:col-span-4">
        {/* Tabla reactiva conectada a SWR */}
        <MemoizedTable processes={processes || []} />
      </div>
    </div>
  );
}