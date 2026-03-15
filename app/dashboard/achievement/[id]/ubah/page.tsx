import type { Metadata } from "next";
import { FormEditAchievement } from "@/components/dashboard/achievement/FormEditAchievement";

export const metadata: Metadata = {
  title: "Edit Prestasi - Sistem Manajemen Konten",
  description: "Perbarui data prestasi mahasiswa",
};

export default function EditAchievementPage() {
  return <FormEditAchievement />;
}
