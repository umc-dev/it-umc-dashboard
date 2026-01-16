import { PaginationMeta } from "@/lib/types";
import {
  CreateStatisticStudentSchema,
  UpdateStatisticStudentSchema,
} from "./validator";
import { z } from "zod";

// Request
export type CreateStatisticStudentDto = z.infer<
  typeof CreateStatisticStudentSchema
>;

export type UpdateStatisticStudentDto = z.infer<
  typeof UpdateStatisticStudentSchema
>;

// Response
export interface StatisticStudentResponse {
  id: string;
  year: number;
  enteredStudents: number;
  graduatedStudents: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedStatisticStudentResponse {
  data: StatisticStudentResponse[];
  meta: PaginationMeta;
}