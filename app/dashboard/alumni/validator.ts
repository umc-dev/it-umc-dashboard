import { z } from "zod";

export const CreateAlumniSchema = z.object({
  name: z.string().min(1, "Name is required"),
  video: z
    .string()
    .url({ message: "Invalid URL format" })
    .min(1, "Video URL is required"),
  message: z.string().min(1, "Message is required"),
  year: z.coerce.number().min(2000, "Year must be 2000 or later"),
  photo: z.instanceof(File).nullable().optional(),
});

export const UpdateAlumniSchema = z.object({
  name: z.string().optional(),
  video: z.string().url({ message: "Invalid URL format" }).optional(),
  message: z.string().optional(),
  year: z.coerce.number().optional(),
  photo: z.instanceof(File).nullable().optional(),
});
