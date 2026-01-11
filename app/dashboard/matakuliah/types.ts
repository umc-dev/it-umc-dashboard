import { PaginationMeta } from "@/lib/types";
import { CreateStudySchema, UpdateStudySchema } from "./validator";
import { z } from "zod";

// REQUEST DTO
export type CreateStudyDto = z.infer<typeof CreateStudySchema>;

export type UpdateStudyDto = z.infer<typeof UpdateStudySchema>;

// RESPONSE DTO
export interface StudyResponse {
  id: number;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedStudyResponse {
  data: StudyResponse[];
  meta: PaginationMeta;
}