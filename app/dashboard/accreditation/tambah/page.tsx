import { FormAddAccreditation } from "@/components/dashboard/accreditation/FormAddAccreditation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tambah Akreditasi - Sistem Manajemen Konten",
  description: "Tambah sertifikat dan SK akreditasi baru",
};

export default function TambahAccreditationPage() {
  return <FormAddAccreditation />;
}
