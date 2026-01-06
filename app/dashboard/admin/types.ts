import { PaginationMeta } from "@/lib/types";
import { CreateAdminSchema, UpdateAdminSchema } from "./validator";
import { z } from "zod";

// REQUEST DTO
export type CreateAdminDto = z.infer<typeof CreateAdminSchema>;

export type UpdateAdminDto = z.infer<typeof UpdateAdminSchema>;

// RESPONSE DTO
export interface AdminResponse {
  id: string;
  name: string | null;
  email: string;
  avatar: string | null;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR";
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedAdminResponse {
  data: AdminResponse[];
  meta: PaginationMeta;
}