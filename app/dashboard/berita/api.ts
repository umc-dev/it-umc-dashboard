import { api } from "@/lib/api";
import { NewsResponse, PaginatedNewsResponse } from "./types";

export const getNews = async (): Promise<PaginatedNewsResponse> => {
  const res = await api.get("/news");
  return res.data;
};

export const deleteNews = async (slug: string): Promise<NewsResponse> => {
  const res = await api.delete(`/news/${slug}`);
  return res.data;
};
