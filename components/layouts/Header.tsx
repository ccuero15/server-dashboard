// src/components/layout/Header.tsx
"use client";

import Image from "next/image";

interface HeaderProps {
  user?: {
    name?: string | null;
    role?: string;
    image?: string | null;
  };
  onMenuClick: () => void; // Definimos la prop que viene del layout
}

export default function Header({ user, onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 md:px-8 flex items-center justify-between shrink-0 z-30">
      
      {/* Sección Izquierda: Botón Hamburguesa + Título */}
      <div className="flex items-center gap-4">
        {/* BOTÓN HAMBURGUESA: Solo visible en móvil (hidden md:block invierte esto) */}
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:hidden text-slate-600 dark:text-slate-300 transition-colors"
          aria-label="Open Menu"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
          System Overview
        </h2>
      </div>

      {/* Sección Derecha: Usuario y Notificaciones */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Notificaciones (Opcional) */}
        {/* //TODO el modulo de notificacion falta por  */}
       {/*  <button className="p-2 text-slate-500 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button> */}

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

        {/* Perfil de Usuario */}
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden xs:block">
            {
                user?.name && user?.role && (
                    
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                      {user?.name}
                    </p>
                    
                )
            }

            <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
              {user?.name || "User Name"}
            </p>
            <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase">
              {user?.role || "Administrator"}
            </p>
          </div>
          
          {/* Avatar con fallback */}
          <div className="size-9 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center overflow-hidden">
            {user?.image ? (
              <Image
                src={user.image!}
                alt="Avatar"
                width={36}
                height={36}
                className="size-full object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-primary">person</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}