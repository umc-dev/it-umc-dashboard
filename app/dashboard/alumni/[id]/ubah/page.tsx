import { FormEditAlumni } from "@/components/dashboard/alumni/FormEditAlumni";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Ubah Alumni - Sistem Manajemen Konten',
  description: 'Edit data alumni di sistem',
}

export default function UbahAlumniPage() {
  return <FormEditAlumni />;
}