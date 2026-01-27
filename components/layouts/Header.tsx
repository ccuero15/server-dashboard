"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { 
  LogOut, 
  User as UserIcon, 
  Settings, 
  ChevronDown,
  Search,
  Bell
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const user = session?.user;

  if (!user) return <div className="h-20" />; // Esqueleto mínimo

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
          System Overview
        </h2>
        <div className="relative w-80 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm placeholder:text-slate-500 outline-none"
            placeholder="Search servers..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>

        <div className="h-10 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            <div className="hidden lg:block text-right">
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                {user.name}
              </p>
              {/* Mostramos el rol que ahora sí viene en la sesión */}
              <p className="text-[10px] text-primary font-bold uppercase mt-1 tracking-wider">
                {user.role || "VIEWER"}
              </p>
            </div>
            
            <div className="bg-primary/10 p-0.5 rounded-full border-2 border-primary">
              <div 
                className="size-9 rounded-full bg-cover bg-center bg-slate-200" 
                style={{ backgroundImage: `url(${user.image || '/default-avatar.png'})` }}
              ></div>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>
              
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-20 overflow-hidden py-2">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 truncate font-medium">{user.email}</p>
                </div>

                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <UserIcon size={16} /> My Profile
                </button>
                
                <hr className="my-2 border-slate-100 dark:border-slate-800" />

                <button 
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}