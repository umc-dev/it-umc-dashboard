import { PaginationMeta } from "@/lib/types";
import { CreateDosenSchema, UpdateDosenSchema } from "./validator";
import { z } from "zod";

export interface LectureshipRef {
  id: number;
  name: string;
}

export interface DosenPosition {
  id: number;
  startDate: string;
  endDate: string | null;
  lectureship: LectureshipRef;
}

export type CreateDosenDto = z.output<typeof CreateDosenSchema>;
export type CreateDosenInputDto = z.input<typeof CreateDosenSchema>;

export type UpdateDosenDto = z.output<typeof UpdateDosenSchema>;
export type UpdateDosenInputDto = z.input<typeof UpdateDosenSchema>;

export interface DosenResponse {
  id: string;
  nidn: string;
  name: string;
  expertise: string;
  research: string;
  teaching: string;
  photo: string | null;
  positions: DosenPosition[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedDosenResponse {
  data: DosenResponse[];
  meta: PaginationMeta;
}
