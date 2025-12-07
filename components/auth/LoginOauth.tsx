"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Icon Google Original (Warna-warni)
const GoogleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 shrink-0"
  >
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path
        fill="#4285F4"
        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
      />
      <path
        fill="#34A853"
        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.424 63.239 -14.754 63.239 Z"
      />
      <path
        fill="#FBBC05"
        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
      />
      <path
        fill="#EA4335"
        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.424 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
      />
    </g>
  </svg>
);

export function LoginOauth() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-12 bg-white h-full relative">
      {/* Container Utama */}
      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
        {/* Header: Logo & Judul */}
        <div className="space-y-4">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center">
            <div className="p-3 bg-blue-50/50 rounded-2xl border border-blue-100/50 shadow-sm">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={56}
                height={56}
                className="w-12 h-12"
              />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Selamat Datang
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mx-auto">
            Silakan masuk untuk mengakses dashboard admin Teknik Informatika.
          </p>
        </div>

        {/* Action Area */}
        <div className="w-full space-y-5 pt-2">
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="group relative w-full flex items-center justify-center gap-3 px-6 py-4 border border-gray-200 rounded-2xl text-gray-700 bg-white hover:bg-gray-50 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            ) : (
              <>
                <GoogleIcon />
                <span className="font-bold text-base tracking-wide text-gray-800 group-hover:text-black">
                  Masuk dengan Google
                </span>
              </>
            )}
          </button>

          {/* Helper Alert Box */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex items-start gap-3 text-left">
            <div className="mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
            <p className="text-xs text-blue-700 leading-relaxed font-medium">
              Mohon gunakan email institusi{" "}
              <span className="font-bold">@umc.ac.id</span> Anda untuk
              verifikasi otomatis.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8">
          <p className="text-xs text-gray-300 font-medium">Protected by UMC</p>
        </div>
      </div>
    </div>
  );
}
