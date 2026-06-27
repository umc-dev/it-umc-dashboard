import { z } from "zod";
import { CreateStrukturOrganisasiSchema, UpdateStrukturOrganisasiSchema } from "./validator";

export type CreateStrukturOrganisasiDto = z.infer<typeof CreateStrukturOrganisasiSchema>;
export type UpdateStrukturOrganisasiDto = z.infer<typeof UpdateStrukturOrganisasiSchema>;

export interface StrukturOrganisasiResponse {
  id: string;
  prodi: "S1" | "D3";
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
