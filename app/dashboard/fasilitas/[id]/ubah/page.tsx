import type { Metadata } from "next";
import { FormEditFasilitas } from "@/components/dashboard/fasilitas/FormEditFasilitas";

export const metadata: Metadata = {
  title: "Ubah Fasilitas - Sistem Manajemen Konten",
  description: "Perbarui data fasilitas",
};

export default function UbahFasilitasPage() {
  return <FormEditFasilitas />;
}
