import { PaginationMeta } from "@/lib/types";
import { CreateDosenSchema, UpdateDosenSchema } from "./validator";
import { z } from "zod";

export interface LectureshipRef {
  id: number;
  name: string;
}

// REQUEST DTO — gunakan z.output untuk tipe setelah transform
export type CreateDosenDto = z.output<typeof CreateDosenSchema>;
export type CreateDosenInputDto = z.input<typeof CreateDosenSchema>;

export interface CreateDosenData {
  name: string;
  expertise: string;
  research: string;
  teaching: string;
  photo: string | null;
  lectureshipId?: number | null;
}

// UPDATE DTO
export type UpdateDosenDto = z.output<typeof UpdateDosenSchema>;
export type UpdateDosenInputDto = z.input<typeof UpdateDosenSchema>;

export interface UpdateDosenData {
  name?: string;
  expertise?: string;
  research?: string;
  teaching?: string;
  photo?: string | null;
  lectureshipId?: number | null;
}

// RESPONSE DTO
export interface DosenResponse {
  id: string;
  name: string;
  expertise: string;
  research: string;
  teaching: string;
  photo: string | null;
  lectureship: LectureshipRef | null;
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