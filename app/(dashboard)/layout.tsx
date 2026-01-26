// src/app/dashboard/layout.tsx
"use client";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import { useState } from "react";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#f8f9fa] dark:bg-[#111317] overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Asegúrate que tu Header reciba esta prop para abrir el menú */}
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}