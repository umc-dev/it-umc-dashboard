import type { Metadata } from "next";
import { DashboardStatistikMahasiswaContent } from "@/components/dashboard/statistik-mahasiswa/StatistikMahasiswaContent";

export const metadata: Metadata = {
  title: "Statistik Mahasiswa - Sistem Manajemen Konten",
  description: "Kelola data statistik mahasiswa per tahun",
};

export default function StatistikMahasiswaPage() {
  return <DashboardStatistikMahasiswaContent />;
}