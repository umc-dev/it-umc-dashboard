import { z } from "zod";

export const CreateFacilitySchema = z.object({
  name: z.string().min(1, "Nama fasilitas wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  photo: z
    .instanceof(File)
    .nullable()
    .refine((file) => file instanceof File, {
      message: "Gambar wajib diupload",
    }),
});

export const UpdateFacilitySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  photo: z.instanceof(File).nullable().optional(),
});
