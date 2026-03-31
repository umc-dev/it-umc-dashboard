import type { Metadata } from "next";
import { DashboardFasilitasContent } from "@/components/dashboard/fasilitas/FasilitasContent";

export const metadata: Metadata = {
  title: "Manajemen Fasilitas - Sistem Manajemen Konten",
  description: "Kelola daftar fasilitas",
};

export default function FasilitasPage() {
  return <DashboardFasilitasContent />;
}
