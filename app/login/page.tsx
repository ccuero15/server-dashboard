// src/app/login/page.tsx
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen relative flex flex-col font-display overflow-hidden">
      
      {/* Patrón de fondo (Dots) - Usando clases de Tailwind */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#4169e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* Header simple */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-20">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-xl">monitoring</span>
          </div>
          <h2 className="text-[#111317] dark:text-white text-xl font-bold tracking-tight">Fibex</h2>
        </div>
       
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-[460px]">
          
          <div className="bg-white dark:bg-[#1c2130] rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none p-8 md:p-10 border border-slate-100 dark:border-slate-800">
            <div className="text-center mb-8">
              <h1 className="text-[#111317] dark:text-white text-3xl font-bold mb-2">Bienvenido</h1>
              <p className="text-[#646d87] dark:text-gray-400 text-sm">
               Acceder a tu cuenta para continuar
              </p>
            </div>

            <LoginForm />

            <div className="mt-8 pt-6 text-center border-t border-gray-100 dark:border-gray-800">
              <p className="text-[#646d87] dark:text-gray-400 text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="text-primary font-semibold hover:underline">Contact Sales</a>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[#646d87] dark:text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">
              Unify your infrastructure monitoring
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Fibex.
      </footer>
    </div>
  );
}