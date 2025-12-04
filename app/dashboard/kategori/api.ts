import { api } from "@/lib/api";
import { Category, CreateCategoryDto, UpdateCategoryDto } from "./types";

export const getCategory = async (): Promise<Category[]> => {
  const res = await api.get("/category");
  return res.data.data;
};

export const deleteCategory = async (slug: string): Promise<Category> => {
  const res = await api.delete(`/category/${slug}`);
  return res.data;
};

export const createCategory = async (
  data: CreateCategoryDto,
): Promise<Category> => {
  const res = await api.post("/category", data);
  return res.data;
};

export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const res = await api.get(`/category/${slug}`);
  console.log({ res });
  return res.data.data;
};

export const updateCategory = async (
  slug: string,
  data: UpdateCategoryDto,
): Promise<Category> => {
  const res = await api.put(`/category/${slug}`, data);
  return res.data;
};
