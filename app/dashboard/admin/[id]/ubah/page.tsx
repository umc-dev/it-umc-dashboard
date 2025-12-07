import { FormEditAdmin } from "@/components/dashboard/admin/FormEditAdmin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Ubah Admin - Sistem Manajemen Konten',
  description: 'Edit data admin di sistem',
}
export default function UbahAdminPage() {
  return <FormEditAdmin />;
}