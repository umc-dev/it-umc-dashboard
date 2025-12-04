import { z } from "zod";

export const CreateNewsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  categoryId: z.string().min(1, "Category ID is required"),
  thumbnail: z.string().min(1, "Thumbnail wajib diupload"),
});

export const UpdateNewsSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  thumbnail: z
    .instanceof(File, { message: "File tidak valid" })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Ukuran file maksimal 2MB",
    }),
  categoryId: z.string().optional(),
});
