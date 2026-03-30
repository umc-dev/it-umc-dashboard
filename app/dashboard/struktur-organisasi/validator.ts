import { z } from "zod";

export const CreateStrukturOrganisasiSchema = z.object({
  description: z.string().min(1, "Description is required"),
});

export const UpdateStrukturOrganisasiSchema = z.object({
  description: z.string().min(1, "Description is required").optional(),
});
