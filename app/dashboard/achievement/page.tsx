import type { Metadata } from "next";
import { AchievementContent } from "@/components/dashboard/achievement/AchievementContent";

export const metadata: Metadata = {
  title: "Manajemen Prestasi - Sistem Manajemen Konten",
  description: "Kelola data prestasi mahasiswa",
};

export default function AchievementPage() {
  return <AchievementContent />;
}
