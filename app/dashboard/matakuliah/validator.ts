import { z } from "zod";

export const CreateStudySchema = z.object({
  source: z
    .instanceof(File)
    .refine((file) => file instanceof File, {
      message: "File PDF wajib diupload",
    }),
});

export const UpdateStudySchema = z.object({
  source: z.instanceof(File).nullable().optional(),
});