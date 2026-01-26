// src/components/layout/Sidebar.tsx
"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: "dashboard" },
  { name: "Servers", href: "/dashboard/servers", icon: "dns" },
  { name: "Network", href: "/dashboard/network", icon: "hub" },
  { name: "Logs", href: "/dashboard/logs", icon: "article" },
  { name: "Settings", href: "/dashboard/settings", icon: "settings" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    // Implement logout logic here
     await signOut();


  };

  return (
    <>
      {/* Overlay para móvil */}
      <div 
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Aside */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 py-6 
        flex flex-col justify-between shrink-0 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col gap-8">
          {/* Brand & Close Button (Mobile) */}
          <div className="px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-2xl">monitoring</span>
              </div>
              <div>
                <h1 className="text-slate-900 dark:text-white font-bold text-lg leading-tight">Fibex</h1>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Enterprise</p>
              </div>
            </div>
            {/* Cerrar solo en móvil */}
            <button onClick={onClose} className="md:hidden text-slate-500 hover:text-primary">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 px-4">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => { if (window.innerWidth < 768) onClose(); }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-primary/10 text-primary font-semibold" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-1 px-4">
         {/*  <Link 
            href="/support" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined">support_agent</span>
            <span className="text-sm font-semibold">Support</span>
          </Link> */}
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors w-full text-left">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-semibold">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}