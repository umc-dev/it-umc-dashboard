import { z } from "zod";

// Validasi saat membuat visi & misi baru
export const CreateVisionMissionSchema = z.object({
  prodi: z.enum(["S1", "D3"], { required_error: "Prodi wajib dipilih" }),
  vision: z.string().min(5, "Visi minimal 5 karakter"),
  mission: z.string().min(5, "Misi minimal 5 karakter"),
});

// Validasi saat update (boleh partial)
export const UpdateVisionMissionSchema = z.object({
  prodi: z.enum(["S1", "D3"]).optional(),
  vision: z.string().optional(),
  mission: z.string().optional(),
});