import { z } from "zod";

export const CreateNewsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  categoryId: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.length > 0, "Category ID is required"),
  thumbnail: z.instanceof(File).nullable(),
});

export const UpdateNewsSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  categoryId: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .optional(),
  thumbnail: z.instanceof(File).nullable().optional(),
});
