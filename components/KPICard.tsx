interface KPICardProps {
  title: string;
  value: string;
  percentage: number;
  trend: "up" | "down";
  icon: string;
  colorClass: string; // e.g., "text-primary" o "text-orange-600"
  bgClass: string;    // e.g., "bg-blue-50"
}

export const KPICard = ({ title, value, percentage, trend, icon, colorClass, bgClass }: KPICardProps) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 ${bgClass} dark:bg-opacity-20 rounded-lg ${colorClass}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <span className={`${trend === 'up' ? 'text-green-500' : 'text-red-500'} text-sm font-bold flex items-center gap-1`}>
        <span className="material-symbols-outlined text-sm">
          {trend === 'up' ? 'trending_up' : 'trending_down'}
        </span> 
        {percentage}%
      </span>
    </div>
    <p className="text-slate-500 text-sm font-semibold mb-1">{title}</p>
    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{value}</h3>
    <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <div className="bg-primary h-full rounded-full" style={{ width: value.includes('%') ? value : '90%' }}></div>
    </div>
  </div>
);