import type { Metadata } from "next";
import { FormAddVisiMisi } from "@/components/dashboard/visi-misi/FormAddVisiMisi";

export const metadata: Metadata = {
  title: "Tambah Visi & Misi - Sistem Manajemen Konten",
  description: "Buat visi & misi baru",
};

export default function TambahKategoriPage() {
  return <FormAddVisiMisi />;
}
