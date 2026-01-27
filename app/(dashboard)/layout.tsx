// src/app/dashboard/layout.tsx

import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[#f8f9fa] dark:bg-[#111317] overflow-hidden">
      <Sidebar />
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        
        <Header/>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}