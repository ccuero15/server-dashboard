import useSWR from 'swr';
import { useEffect } from 'react';
import { SSEMessage, ChartMetric, Process } from '@/types/server';

export const useServerMetrics = (serverId: number, initialChartData: ChartMetric[], initialProcesses: Process[]) => {
  
  // Estado para la gráfica
  const { data: chartData, mutate: mutateChart } = useSWR<ChartMetric[]>(
    `server-${serverId}-charts`, 
    null, 
    { fallbackData: initialChartData }
  );

  // Estado para los procesos
  const { data: processes, mutate: mutateProcesses } = useSWR<Process[]>(
    `server-${serverId}-processes`, 
    null, 
    { fallbackData: initialProcesses }
  );

  useEffect(() => {
    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_MONITOR_API_URL}/api/v1/health/stream`);

    eventSource.onmessage = (event) => {
      const data: SSEMessage = JSON.parse(event.data);
      
      if (data.serverId === serverId.toString()) {
        // 1. Actualizar Gráfica
        const newPoint: ChartMetric = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          cpu: data.cpuUsage,
          ram: data.ramUsage,
          disk: data.diskUsage,
        };

        mutateChart((current) => {
          const updated = current ? [...current, newPoint] : [newPoint];
          return updated.length > 20 ? updated.slice(1) : updated;
        }, false);

        // 2. Actualizar Procesos
        if (data.processes) {
          const newProcesses: Process[] = data.processes.map(p => ({
            id: p.pid.toString(),
            name: p.name,
            cpuUsage: p.cpuUsage,
            ramUsage: p.ramUsage,
            pid: p.pid
          }));
          mutateProcesses(newProcesses, false);
        }
      }
    };

    return () => eventSource.close();
  }, [serverId, mutateChart, mutateProcesses]);

  return { chartData, processes };
};