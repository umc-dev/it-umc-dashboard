"use client";

import { useMe } from "@/app/login/queries";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === "EDITOR") {
        router.replace("/dashboard/berita");
      } else if (user.role === "DOSEN") {
        router.replace("/dashboard/dosen");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isLoading, user, router]);

  if (isLoading || user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return <>{children}</>;
}
