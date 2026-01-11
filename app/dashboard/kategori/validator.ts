import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(3),
});

export const UpdateCategorySchema = z.object({
  name: z.string().min(3).optional(),
});
