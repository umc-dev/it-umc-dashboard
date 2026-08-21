import { PaginationMeta } from "@/lib/types";
import { z } from "zod";
import { CreateAlumniSchema, UpdateAlumniSchema } from "./validator";

export interface Alumni {
  id: string;
  name: string;
  photo: string | null;
  workplace: string | null;
  position: string | null;
  linkedin: string | null;
  instagram: string | null;
  video: string | null;
  message: string;
  year: number;
  graduationYear: number | null;
  prodi: "S1" | "D3";
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateAlumniDto = z.output<typeof CreateAlumniSchema>;
export type CreateAlumniInputDto = z.input<typeof CreateAlumniSchema>;

export type UpdateAlumniDto = z.output<typeof UpdateAlumniSchema>;
export type UpdateAlumniInputDto = z.input<typeof UpdateAlumniSchema>;

export interface AlumniResponse {
  id: string;
  name: string;
  photo: string | null;
  workplace: string | null;
  position: string | null;
  linkedin: string | null;
  instagram: string | null;
  video: string | null;
  message: string;
  year: number;
  graduationYear: number | null;
  prodi: "S1" | "D3";
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedAlumniResponse {
  data: AlumniResponse[];
  meta: PaginationMeta;
}
