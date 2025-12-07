import { DashboardAdminContent } from "@/components/dashboard/admin/DashboardAdminContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Manajemen Admin - Sistem Manajemen Konten',
  description: 'Kelola admin dan pengguna sistem',
}

export default function AdminPage() {
  return <DashboardAdminContent />;
}