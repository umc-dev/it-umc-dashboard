import { PaginationMeta } from "@/lib/types";

export type AccreditationCategory = "KAMPUS" | "PRODI";
export type ProdiType = "S1" | "D3";

export interface Accreditation {
  id: string;
  category: AccreditationCategory;
  prodi: ProdiType | null;
  title: string;
  grade: string;
  skNumber: string;
  skLink: string | null;
  certificateFile: string | null;
  institution: string | null;
  validFrom: string;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedAccreditationResponse {
  data: Accreditation[];
  meta?: PaginationMeta;
}
