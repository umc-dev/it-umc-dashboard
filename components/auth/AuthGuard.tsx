"use client";

import { useMe } from "@/app/login/queries";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, isError } = useMe();
  const router = useRouter();
  const pathname = usePathname();

  // Tentukan apakah user memiliki akses ke halaman saat ini
  let isAuthorized = false;
  if (user) {
    if (user.role === "SUPER_ADMIN") {
      isAuthorized = true;
    } else if (user.role === "ADMIN") {
      // ADMIN bisa akses semua kecuali halaman admin manajemen
      const isForbidden = pathname === "/dashboard/admin" || pathname.startsWith("/dashboard/admin/");
      isAuthorized = !isForbidden;
    } else if (user.role === "DOSEN") {
      // DOSEN hanya bisa akses halaman dosen
      isAuthorized = pathname === "/dashboard/dosen" || pathname.startsWith("/dashboard/dosen/");
    } else if (user.role === "EDITOR") {
      // EDITOR hanya bisa akses berita & kategori
      isAuthorized =
        pathname === "/dashboard/berita" ||
        pathname.startsWith("/dashboard/berita/") ||
        pathname === "/dashboard/kategori" ||
        pathname.startsWith("/dashboard/kategori/");
    }
  }

  useEffect(() => {
    if (isLoading) return;

    if (isError || !user) {
      router.replace("/login");
      return;
    }

    if (!isAuthorized) {
      if (user.role === "EDITOR") {
        router.replace("/dashboard/berita");
      } else if (user.role === "DOSEN") {
        router.replace("/dashboard/dosen");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isLoading, isError, user, isAuthorized, router]);

  if (isLoading || !isAuthorized) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return <>{children}</>;
}
