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

export interface DosenTridharma {
  id: number;
  dosenId: string;
  category: "PENGAJARAN" | "PENELITIAN" | "PENGABDIAN";
  title: string;
  year: number;
  description: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

export interface DosenResponse {
  id: string;
  prodi: "S1" | "D3";
  nidn: string;
  name: string;
  expertise: string;
  research: string;
  teaching: string;
  photo: string | null;
  education: string | null;
  description: string | null;
  positions: DosenPosition[];
  dosenTridharmas?: DosenTridharma[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedDosenResponse {
  data: DosenResponse[];
  meta: PaginationMeta;
}

