import { PaginationMeta } from "@/lib/types";
import { CreateFacilitySchema, UpdateFacilitySchema } from "./validator";
import { z } from "zod";

export type CreateFacilityDto = z.infer<typeof CreateFacilitySchema>;

export interface CreateFacilityData {
  name: string;
  description: string;
  photo: string | null;
}

export type UpdateFacilityDto = z.infer<typeof UpdateFacilitySchema>;

export interface UpdateFacilityData {
  name?: string;
  description?: string;
  photo?: string | null;
}

export interface FacilityResponse {
  id: number;
  name: string;
  description: string;
  photo: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FacilityListResponse {
  facilities: FacilityResponse[];
}

export interface PaginatedFacilityResponse {
  data: FacilityResponse[];
  meta: PaginationMeta;
}
