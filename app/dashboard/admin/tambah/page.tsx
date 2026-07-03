import { FormAddAdmin } from "@/components/dashboard/admin/FormAddAdmin";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Tambah Admin - Sistem Manajemen Konten',
  description: 'Buat admin baru di sistem',
}

export default function TambahAdminPage() {
  return (
    <Suspense fallback={<p className="text-center py-10">Loading...</p>}>
      <FormAddAdmin />
    </Suspense>
  );
}