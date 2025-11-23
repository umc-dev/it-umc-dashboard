import type { Metadata } from "next";
import { FormEditVisiMisi } from "@/components/dashboard/visi-misi/FormEditVIsiMisi";

export const metadata: Metadata = {
  title: "Ubah Visi & Misi - Sistem Manajemen Konten",
  description: "Edit data visi & misi di sistem",
};

export default function UbahKategoriPage() {
  return <FormEditVisiMisi />;
}
