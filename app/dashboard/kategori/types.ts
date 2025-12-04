import { PaginationMeta } from "@/lib/types";
import { NewsResponse } from "../berita/types";
import { CreateCategorySchema, UpdateCategorySchema } from "./validator";
import { z } from "zod";

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryResponse {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryListResponse {
  categories: CategoryResponse[];
}

export interface PaginatedCategoryResponse {
  data: CategoryResponse[];
  meta: PaginationMeta;
}

export interface CategoryWithNewsResponse extends CategoryResponse {
  news: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export interface CategoryWithNews extends Category {
  news: NewsResponse[];
}

export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;

export interface CreateCategoryData {
  name: string;
  slug: string;
}

export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;

export interface UpdateCategoryData {
  name?: string;
  slug?: string;
}
