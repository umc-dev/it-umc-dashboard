import { AccreditationContent } from "@/components/dashboard/accreditation/AccreditationContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manajemen Akreditasi - Sistem Manajemen Konten",
  description: "Kelola sertifikat dan SK akreditasi kampus & prodi",
};

export default function AccreditationPage() {
  return <AccreditationContent />;
}
