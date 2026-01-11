import { AlumniContent } from "@/components/dashboard/alumni/AlumniContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Manajemen Alumni - Sistem Manajemen Konten',
  description: 'Kelola data alumni di sistem',
}

export default function AlumniPage() {
  return <AlumniContent />;
}