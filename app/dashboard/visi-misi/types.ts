import { PaginationMeta } from "@/lib/types";
import { CreateVisionMissionSchema, UpdateVisionMissionSchema } from "./validator";
import { z } from "zod";

export type CreateVisionMissionDto = z.infer<typeof CreateVisionMissionSchema>;
export type UpdateVisionMissionDto = z.infer<typeof UpdateVisionMissionSchema>;

export interface VisionMissionResponse {
  id: number;
  prodi: "S1" | "D3";
  vision: string;
  mission: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedVisionMissionResponse {
  data: VisionMissionResponse[];
  meta: PaginationMeta;
}