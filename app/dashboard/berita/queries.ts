import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNews, getNews } from "./api";

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

// // GET ONE NEWS BY SLUG
// export const useNewsById = (id: string) => {
//   return useQuery({
//     queryKey: ["news", id],
//     queryFn: () => getNewsById(id),
//     enabled: !!id, // fetch hanya kalau ID ada
//   });
// };

// // CREATE NEWS
// export const useCreateNews = () => {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: createNews,
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["news"] });
//     },
//   });
// };

// // UPDATE NEWS
// export const useUpdateNews = () => {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: updateNews,
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["news"] });
//     },
//   });
// };
