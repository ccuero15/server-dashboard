"use client";

import { ChartMetric } from "@/types/server";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";


interface DetailedChartProps {
    data: ChartMetric[];
}

export default function DetailedChart({ data }: DetailedChartProps) {

    console.log(data, 'data')
    // Verificación de seguridad para evitar errores de renderizado
    if (!data || data.length === 0) {
        return (
            <div className="h-[300px] w-full flex items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                No telemetry data available
            </div>
        );
    }

    return (
        /* CAMBIO: Usamos h-[300px] para asegurar que el contenedor tenga altura real */
        <div className="h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="cpu" name="CPU Avg" stroke="#3b82f6" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="ram" name="RAM Avg" stroke="#06b6d4" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="disk" name="Disk Avg" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}