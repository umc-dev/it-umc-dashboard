import { PaginationMeta } from "@/lib/types";
import { CreatePartnershipSchema, UpdatePartnershipSchema } from "./validator";
import { z } from "zod";

// REQUEST DTO
export type CreatePartnershipDto = z.infer<typeof CreatePartnershipSchema>;

export interface CreatePartnershipData {
  name: string;
  photo: string | null;
  startDate: Date;
  endDate: Date;
}

export type UpdatePartnershipDto = z.infer<typeof UpdatePartnershipSchema>;

export interface UpdatePartnershipData {
  name?: string;
  photo?: string | null;
  startDate?: Date;
  endDate?: Date;
}

// RESPONSE DTO
export interface PartnershipResponse {
  id: string;
  name: string;
  photo: string | null;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface PartnershipListResponse {
  partnerships: PartnershipResponse[];
}

export interface PaginatedPartnershipResponse {
  data: PartnershipResponse[];
  meta: PaginationMeta;
}