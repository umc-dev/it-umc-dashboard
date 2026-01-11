import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStudy,
  deleteStudy,
  getStudies,
  getStudyById,
  updateStudy,
} from "./api";

// GET ALL STUDIES
export const useStudies = () => {
  return useQuery({
    queryKey: ["studies"],
    queryFn: getStudies,
  });
};

// DELETE STUDY
export const useDeleteStudy = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteStudy,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["studies"] });
    },
  });
};

// GET STUDY BY ID
export const useStudyById = (id: number) => {
  return useQuery({
    queryKey: ["studies", id],
    queryFn: () => getStudyById(id),
    enabled: !!id, // Fetch only if ID exists
  });
};

// CREATE STUDY
export const useCreateStudy = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createStudy,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["studies"] });
    },
  });
};

// UPDATE STUDY
export const useUpdateStudy = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      updateStudy(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["studies"] });
    },
  });
};