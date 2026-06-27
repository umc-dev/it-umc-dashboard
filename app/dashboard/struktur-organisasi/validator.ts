import { z } from "zod";

export const CreateStrukturOrganisasiSchema = z.object({
  description: z.string().min(1, "Description is required"),
  prodi: z.enum(["S1", "D3"]).optional(),
});

export const UpdateStrukturOrganisasiSchema = z.object({
  description: z.string().min(1, "Description is required").optional(),
  prodi: z.enum(["S1", "D3"]).optional(),
});
