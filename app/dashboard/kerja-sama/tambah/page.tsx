import type { Metadata } from "next";
import { FormAddKerjaSama } from "@/components/dashboard/kerja-sama/FormAddKerjaSama";

export const metadata: Metadata = {
  title: "Tambah Kerja Sama - Sistem Manajemen Konten",
  description: "Buat kerja sama baru",
};

export default function TambahKategoriPage() {
  return <FormAddKerjaSama />;
}
