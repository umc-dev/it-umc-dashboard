import { z } from "zod";

export const CreateAlumniSchema = z.object({
  name: z.string().min(1, "Name is required"),
  video: z.string().optional().nullable(),
  message: z.string().min(1, "Message is required"),
  year: z.coerce.number().min(1990, "Angkatan tidak valid"),
  graduationYear: z.coerce.number().optional().nullable(),
  workplace: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  photo: z.instanceof(File).nullable().optional(),
  prodi: z.enum(["S1", "D3"], { message: "Program Studi is required" }),
});

export const UpdateAlumniSchema = z.object({
  name: z.string().optional(),
  video: z.string().optional().nullable(),
  message: z.string().optional(),
  year: z.coerce.number().optional(),
  graduationYear: z.coerce.number().optional().nullable(),
  workplace: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  photo: z.instanceof(File).nullable().optional(),
  prodi: z.enum(["S1", "D3"]).optional(),
});
