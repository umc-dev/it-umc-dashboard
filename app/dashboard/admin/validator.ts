// app/dashboard/admin/validator.ts
import { z } from "zod";

export const CreateAdminSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "EDITOR", "DOSEN"]).optional(),
  prodi: z.enum(["S1", "D3"]).optional(),
  avatar: z
    .instanceof(File, { message: "Foto profil wajib diupload" })
    .refine((file) => file.size > 0, "Foto profil wajib diupload"),
});

export const UpdateAdminSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").optional(),
  email: z.string().email("Email tidak valid").optional(),
  password: z.string().min(6, "Password minimal 6 karakter").optional().or(z.literal("")),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "EDITOR", "DOSEN"]).optional(),
  prodi: z.enum(["S1", "D3"]).optional(),
  avatar: z.instanceof(File).optional(), 
});