"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";


interface OverviewChartProps {
  time: string;
  cpu: number;
  ram: number;
  disk: number;
}

// Datos ficticios para ver cómo luce el dashboard general
const data = [
  { time: "10:00", cpu: 45.5, ram: 55, disk: 70 },
  { time: "10:10", cpu: 52.3, ram: 58, disk: 70 },
  { time: "10:20", cpu: 48.7, ram: 60, disk: 70 },
  { time: "10:30", cpu: 70.2, ram: 62, disk: 70 },
  { time: "10:40", cpu: 65.8, ram: 65, disk: 70 },
  { time: "10:50", cpu: 58.9, ram: 63, disk: 70 },
];

export default function OverviewChart({ data }: { data:  OverviewChartProps[] }) {
  return (
    <div className="h-87.5 w-full bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Rendimiento Promedio (Red)</h3>
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