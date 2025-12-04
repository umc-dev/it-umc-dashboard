import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryBySlug,
  updateCategory,
} from "./api";
import { UpdateCategoryDto } from "./types";

// Get All Categories
export const useCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
};

// Delete Category
export const useDeleteCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

// Get Category by Slug
export const useCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategoryBySlug(slug),
    enabled: !!slug, // fetch hanya kalau ID ada
  });
};

// CREATE NEWS
export const useCreateCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

// UPDATE NEWS
export const useUpdateCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: UpdateCategoryDto }) =>
      updateCategory(slug, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["category"] });
    },
  });
};
