import { PaginationMeta } from "@/lib/types";
import { CreateNewsSchema, UpdateNewsSchema } from "./validator";
import { z } from "zod";

// Sementara
export interface AdminResponse {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

// Request
export type CreateNewsDto = z.infer<typeof CreateNewsSchema>;

export interface CreateNewsData {
  title: string;
  content: string;
  slug: string;
  thumbnail: string;
  categoryId: string;
  authorId: string;
}

export type UpdateNewsDto = z.infer<typeof UpdateNewsSchema>;

export interface UpdateNewsData {
  title?: string;
  content?: string;
  categoryId?: string;
  thumbnail?: string;
  slug?: string;
}

// Response

export interface NewsResponse {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  slug: string;
  authorId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;

  status?: "PENDING" | "PUBLISHED" | "REJECTED";
  category: CategoryResponse;
  admin: AdminResponse;
}

export interface NewsListResponse {
  news: NewsResponse[];
}

export interface PaginatedNewsResponse {
  data: NewsResponse[];
  meta: PaginationMeta;
}

export interface NewsWithAuthorResponse extends NewsResponse {
  author: AdminResponse;
}
