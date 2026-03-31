import { PaginationMeta } from "@/lib/types";
import { CreateLectureshipSchema, UpdateLectureshipSchema } from "./validator";
import { z } from "zod";

// REQUEST DTO
export type CreateLectureshipDto = z.infer<typeof CreateLectureshipSchema>;

export interface CreateLectureshipData {
  name: string;
}

export type UpdateLectureshipDto = z.infer<typeof UpdateLectureshipSchema>;

export interface UpdateLectureshipData {
  name?: string;
}

// RESPONSE DTO
export interface LectureshipResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface LectureshipListResponse {
  lectureships: LectureshipResponse[];
}

export interface PaginatedLectureshipResponse {
  data: LectureshipResponse[];
  meta: PaginationMeta;
}