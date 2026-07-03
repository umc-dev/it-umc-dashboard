import { z } from "zod";

export const CreateStudySchema = z.object({
  prodi: z.enum(["S1", "D3"], { message: "Prodi wajib dipilih" }),
  source: z
    .instanceof(File)
    .refine((file) => file instanceof File, {
      message: "File PDF wajib diupload",
    }),
});

export const UpdateStudySchema = z.object({
  prodi: z.enum(["S1", "D3"]).optional(),
  source: z.instanceof(File).nullable().optional(),
});