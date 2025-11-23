import type { Metadata } from "next";
import { FormEditKerjaSama } from "@/components/dashboard/kerja-sama/FormEditKerjaSama";

export const metadata: Metadata = {
  title: "Ubah Kerja Sama - Sistem Manajemen Konten",
  description: "Edit data kerja sama di sistem",
};

export default function UbahKategoriPage() {
  return <FormEditKerjaSama />;
}
