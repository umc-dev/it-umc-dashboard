import type { Metadata } from "next";
import { DashboardVisiMisiContent } from "@/components/dashboard/visi-misi/VisiMisiContent";

export const metadata: Metadata = {
  title: "Manajemen Visi & Misi - Sistem Manajemen Konten",
  description: "Kelola visi misi",
};

export default function MataKuliahPage() {
  return <DashboardVisiMisiContent />;
}
