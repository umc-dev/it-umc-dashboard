import { z } from "zod";

export const CreateAchievementSchema = z.object({
  name: z.string().min(1, "Nama mahasiswa wajib diisi"),
  achievementName: z.string().min(1, "Nama prestasi wajib diisi"),
  link: z.string().url("Link sertifikat harus URL valid"),
  achievedAt: z.string().min(1, "Tanggal prestasi wajib diisi"),
});

export const UpdateAchievementSchema = z.object({
  name: z.string().optional(),
  achievementName: z.string().optional(),
  link: z.string().url("Link sertifikat harus URL valid").optional(),
  achievedAt: z.string().optional(),
});
