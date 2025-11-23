import type { Metadata } from "next";
import { DashboardKerjaSamaContent } from "@/components/dashboard/kerja-sama/KerjaSamaContent";

export const metadata: Metadata = {
  title: "Manajemen Kerja Sama - Sistem Manajemen Konten",
  description: "Kelola daftar kerja sama",
};

export default function MataKuliahPage() {
  return <DashboardKerjaSamaContent />;
}
