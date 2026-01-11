import { FormAddAlumni } from "@/components/dashboard/alumni/FormAddAlumni";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Tambah Alumni - Sistem Manajemen Konten',
  description: 'Buat data alumni baru di sistem',
}

export default function TambahAlumniPage() {
  return <FormAddAlumni />;
}