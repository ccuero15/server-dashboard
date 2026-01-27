"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Server, 
  Settings, 
  ShieldCheck, 
  Menu, 
  ChevronLeft 
} from "lucide-react";

// Tipo Genérico para los ítems del menú
interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType; // Esto permite pasar cualquier componente de icono
}

const menuItems: MenuItem[] = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Servers", href: "/servers", icon: Server },
  { title: "Security", href: "/security", icon: ShieldCheck },
  { title: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside 
      className={`relative bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out flex flex-col
        ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Botón de Colapso (Las 3 líneas) */}
      <div className="h-16 flex items-center px-6 justify-between border-b border-slate-100 dark:border-slate-800">
        {!isCollapsed && (
          <span className="font-black text-primary tracking-tighter text-xl">FIBEX</span>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menú de Navegación */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all group
                ${isActive 
                  ? "bg-primary text-black font-bold shadow-lg shadow-primary/20" 
                  : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
            >
              <Icon size={22} className={isActive ? "text-black" : "group-hover:text-primary"} />
              {!isCollapsed && (
                <span className="text-sm whitespace-nowrap">{item.title}</span>
              )}
              
              {/* Tooltip opcional cuando está colapsado */}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  {item.title}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer del Sidebar */}
      {!isCollapsed && (
        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl">
            <p className="text-[10px] uppercase font-bold text-slate-400">System V1.0</p>
          </div>
        </div>
      )}
    </aside>
  );
}