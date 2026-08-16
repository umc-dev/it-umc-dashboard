import { PaginationMeta } from "@/lib/types";
import { z } from "zod";
import { CreatePartnershipSchema, UpdatePartnershipSchema } from "./validator";

export type CreatePartnershipDto = z.infer<typeof CreatePartnershipSchema>;
export type UpdatePartnershipDto = z.infer<typeof UpdatePartnershipSchema>;

export interface PartnershipFileItem {
  id: string;
  partnershipId: string;
  fileName: string;
  fileUrl: string;
  fileType: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PartnershipResponse {
  id: string;
  name: string;
  photo: string | null;
  description: string | null;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  files?: PartnershipFileItem[];
}

export interface PaginatedPartnershipResponse {
  data: PartnershipResponse[];
  meta: PaginationMeta;
}