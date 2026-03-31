import { z } from "zod";
import { CreateStrukturOrganisasiSchema, UpdateStrukturOrganisasiSchema } from "./validator";

export type CreateStrukturOrganisasiDto = z.infer<typeof CreateStrukturOrganisasiSchema>;
export type UpdateStrukturOrganisasiDto = z.infer<typeof UpdateStrukturOrganisasiSchema>;

export interface StrukturOrganisasiResponse {
  image: string;
  description: string;
}
