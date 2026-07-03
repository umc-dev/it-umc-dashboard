import { z } from "zod";

export const CreateAchievementSchema = z.object({
  prodi: z.enum(["S1", "D3"], { message: "Prodi wajib dipilih" }),
  name: z.string().min(1, "Nama mahasiswa wajib diisi"),
  achievementName: z.string().min(1, "Nama prestasi wajib diisi"),
  link: z.string().url("Link sertifikat harus URL valid"),
  achievedAt: z.string().min(1, "Tanggal prestasi wajib diisi"),
});

export const UpdateAchievementSchema = z.object({
  prodi: z.enum(["S1", "D3"]).optional(),
  name: z.string().optional(),
  achievementName: z.string().optional(),
  link: z.string().url("Link sertifikat harus URL valid").optional(),
  achievedAt: z.string().optional(),
});
