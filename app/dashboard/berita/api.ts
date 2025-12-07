import { api } from "@/lib/api";
import { NewsResponse, PaginatedNewsResponse, UpdateNewsDto } from "./types";

export const getNews = async (): Promise<PaginatedNewsResponse> => {
  const res = await api.get("/news");
  return res.data;
};

export const deleteNews = async (slug: string): Promise<NewsResponse> => {
  const res = await api.delete(`/news/${slug}`);
  return res.data;
};

export const createNews = async (data: FormData): Promise<NewsResponse> => {
  const res = await api.post("/news", data);
  return res.data.data;
};

export const updateNews = async (
  slug: string,
  data: FormData,
): Promise<NewsResponse> => {
  const res = await api.put(`/news/${slug}`, data);
  return res.data.data;
};

export const getNewsBySlug = async (slug: string): Promise<NewsResponse> => {
  const res = await api.get(`news/${slug}`);
  return res.data.data;
};
