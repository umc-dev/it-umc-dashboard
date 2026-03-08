import { z } from "zod";

export const CreateDosenSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  expertise: z.string().min(1, "Spesialisasi wajib diisi"),
  research: z.string().url("Link penelitian harus URL valid").min(1, "Link penelitian wajib diisi"),
  teaching: z.string().url("Link pengajaran harus URL valid").min(1, "Link pengajaran wajib diisi"),
  lectureshipId: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val === "") return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }),
  photo: z
    .instanceof(File)
    .nullable()
    .refine((file) => file instanceof File, {
      message: "Foto wajib diupload",
    }),
});

export const UpdateDosenSchema = z.object({
  name: z.string().optional(),
  expertise: z.string().optional(),
  research: z.string().url("Link penelitian harus URL valid").optional(),
  teaching: z.string().url("Link pengajaran harus URL valid").optional(),
  lectureshipId: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val === "") return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }),
  photo: z.instanceof(File).nullable().optional(),
});