"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setError("Email y contraseña son obligatorios.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciales inválidas. Inténtalo de nuevo.");
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Ocurrió un error inesperado. Intenta más tarde.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm font-semibold text-[#111317] dark:text-slate-200"
        >
          Work Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="name@company.com"
          className="h-14 rounded-xl border border-[#dcdee5] bg-white px-4 text-base text-[#111317] outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-[#111317] dark:text-slate-200"
          >
            Password
          </label>
          <button
            type="button"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="h-14 w-full rounded-xl border border-[#dcdee5] bg-white px-4 pr-12 text-base text-[#111317] outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#646d87] transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="flex h-14 w-full items-center justify-center rounded-xl bg-primary text-black text-base font-bold shadow-lg shadow-primary/20 transition-all  hover:bg-blue-700 hover:text-amber-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
