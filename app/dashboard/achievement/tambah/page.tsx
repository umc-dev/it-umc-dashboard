import type { Metadata } from "next";
import { FormAddAchievement } from "@/components/dashboard/achievement/FormAddAchievement";

export const metadata: Metadata = {
  title: "Tambah Prestasi - Sistem Manajemen Konten",
  description: "Tambahkan data prestasi mahasiswa",
};

export default function TambahAchievementPage() {
  return <FormAddAchievement />;
}
