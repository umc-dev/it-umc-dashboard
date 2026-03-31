import { z } from "zod";

export const CreateLectureshipSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter").max(50, "Nama maksimal 50 karakter"),
});

export const UpdateLectureshipSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter").max(50, "Nama maksimal 50 karakter").optional(),
});