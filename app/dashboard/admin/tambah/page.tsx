import { FormAddAdmin } from "@/components/dashboard/admin/FormAddAdmin";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Tambah Admin - Sistem Manajemen Konten',
  description: 'Buat admin baru di sistem',
}

export default function TambahAdminPage() {
  return <FormAddAdmin />;
}