import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveNews,
  createNews,
  deleteNews,
  getNews,
  getNewsBySlug,
  updateNews,
} from "./api";
import { UpdateNewsDto } from "./types";

// GET ALL NEWS
export const useNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });
};

// DELETE NEWS
export const useDeleteNews = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteNews,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["news"] });
    },
  });
};

// Get New by Slug
export const useNewsBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["news", slug],
    queryFn: () => getNewsBySlug(slug),
    enabled: !!slug, // fetch hanya kalau ID ada
  });
};

// Create News
export const useCreateNews = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["news"] });
    },
  });
};

//  Update News
export const useUpdateNews = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: FormData }) =>
      updateNews(slug, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["news"] });
    },
  });
};

export const useApproveNews = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, status }: { slug: string; status: "PUBLISHED" | "REJECTED" }) =>
      approveNews(slug, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["news"] });
    },
  });
};
