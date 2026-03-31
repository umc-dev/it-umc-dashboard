import type { Metadata } from "next";
import { FormAddFasilitas } from "@/components/dashboard/fasilitas/FormAddFasilitas";

export const metadata: Metadata = {
  title: "Tambah Fasilitas - Sistem Manajemen Konten",
  description: "Buat fasilitas baru",
};

export default function TambahFasilitasPage() {
  return <FormAddFasilitas />;
}
