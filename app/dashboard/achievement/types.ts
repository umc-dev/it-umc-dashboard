import { PaginationMeta } from "@/lib/types";
import { z } from "zod";
import { CreateAchievementSchema, UpdateAchievementSchema } from "./validator";

export interface AchievementResponse {
  id: number;
  name: string;
  achievementName: string;
  link: string;
  achievedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedAchievementResponse {
  data: AchievementResponse[];
  meta: PaginationMeta;
}

export type CreateAchievementDto = z.infer<typeof CreateAchievementSchema>;
export type UpdateAchievementDto = z.infer<typeof UpdateAchievementSchema>;
