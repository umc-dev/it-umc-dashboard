import { PaginationMeta } from "@/lib/types";

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

//

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
