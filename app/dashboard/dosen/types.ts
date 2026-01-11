import { PaginationMeta } from "@/lib/types";
import { CreateDosenSchema, UpdateDosenSchema } from "./validator";
import { z } from "zod";

// REQUEST DTO
export type CreateDosenDto = z.infer<typeof CreateDosenSchema>;

export interface CreateDosenData {
  name: string;
  expertise: string;
  research: string;
  teaching: string;
  photo: string | null;
}

export type UpdateDosenDto = z.infer<typeof UpdateDosenSchema>;

export interface UpdateDosenData {
  name?: string;
  expertise?: string;
  research?: string;
  teaching?: string;
  photo?: string | null;
}

// RESPONSE DTO
export interface DosenResponse {
  id: string;
  name: string;
  expertise: string;
  research: string;
  teaching: string;
  photo: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DosenListResponse {
  dosens: DosenResponse[];
}

export interface PaginatedDosenResponse {
  data: DosenResponse[];
  meta: PaginationMeta;
}