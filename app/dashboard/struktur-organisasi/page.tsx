import type { Metadata } from "next";
import { StrukturOrganisasiContent } from "@/components/dashboard/struktur-organisasi/StrukturOrganisasiContent";

export const metadata: Metadata = {
  title: "Manajemen Struktur Organisasi - Sistem Manajemen Konten",
  description: "Kelola struktur organisasi",
};

export default function StrukturOrganisasiPage() {
  return <StrukturOrganisasiContent />;
}
