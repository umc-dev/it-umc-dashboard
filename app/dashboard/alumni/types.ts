import { PaginationMeta } from "@/lib/types";
import { z } from "zod";
import { CreateAlumniSchema, UpdateAlumniSchema } from "./validator";

// Alumni Interface
export interface Alumni {
  id: string;
  name: string;
  video: string;
  message: string; 
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

// Request DTOs
export type CreateAlumniDto = z.infer<typeof CreateAlumniSchema>;

export interface CreateAlumniData {
  name: string;
  video: string;
  message: string;
  year: number;
}

export type UpdateAlumniDto = z.infer<typeof UpdateAlumniSchema>;

export interface UpdateAlumniData {
  name?: string;
  video?: string;
  message?: string;
  year?: number;
}

// Response DTOs
export interface AlumniResponse {
  id: string;
  name: string;
  video: string;
  message: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AlumniListResponse {
  alumni: AlumniResponse[];
}

export interface PaginatedAlumniResponse {
  data: AlumniResponse[];
  meta: PaginationMeta;
}