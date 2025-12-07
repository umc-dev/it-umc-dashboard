"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import Image from "next/image";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulasi delay login
    setTimeout(() => {
      if (email && password) {
        router.push("/dashboard");
      } else {
        setError("Email dan password harus diisi");
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-12 bg-white h-full">
      <div className="w-full max-w-md space-y-8">
        {/* 1. Header Section (Mobile Logo & Title) */}
        <div className="text-center">
          {/* Logo hanya muncul di mobile, di desktop sudah ada di Branding component */}
          <div className="lg:hidden flex justify-center mb-6">
            <div className="p-3 bg-blue-50 rounded-2xl">
              <Image
                src="/logo.svg"
                alt="Logo UMC"
                width={64}
                height={64}
                className="w-12 h-12"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Selamat Datang
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Masuk untuk mengelola konten website prodi.
          </p>
        </div>

        {/* 2. Form Section */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="w-1 h-8 bg-red-500 rounded-full" />
              <p className="text-sm font-medium text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email Kampus
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="admin@umc.ac.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm bg-gray-50/50 focus:bg-white hover:bg-gray-50"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm bg-gray-50/50 focus:bg-white hover:bg-gray-50"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Remember Me (Forgot Password removed) */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              disabled={isLoading}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-600 cursor-pointer select-none"
            >
              Ingat saya di perangkat ini
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Memproses...
              </>
            ) : (
              <>
                <LogIn className="-ml-1 mr-2 h-4 w-4" />
                Masuk Dashboard
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-6 border-t border-gray-100 pt-6">
          <p className="text-center text-xs text-gray-400 leading-relaxed">
            Sistem Informasi Teknik Informatika <br />©{" "}
            {new Date().getFullYear()} Universitas Muhammadiyah Cirebon
          </p>
        </div>
      </div>
    </div>
  );
}
