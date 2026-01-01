import { z } from "zod";

// Validasi saat membuat visi & misi baru
export const CreateVisionMissionSchema = z.object({
  vision: z.string().min(5, "Visi minimal 5 karakter"),
  mission: z.string().min(5, "Misi minimal 5 karakter"),
});

// Validasi saat update (boleh partial)
export const UpdateVisionMissionSchema = z.object({
  vision: z.string().optional(),
  mission: z.string().optional(),
}).refine((data) => data.vision || data.mission, {
  message: "Setidaknya salah satu field harus diisi saat update",
});