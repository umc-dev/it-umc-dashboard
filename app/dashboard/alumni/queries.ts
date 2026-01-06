import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAlumni,
  deleteAlumni,
  getAlumni,
  getAlumniById,
  updateAlumni,
} from "./api";
import { UpdateAlumniDto } from "./types";

// Hook to fetch all alumni
export const useAlumni = () => {
  return useQuery({
    queryKey: ["alumni"],
    queryFn: getAlumni,
  });
};

// Hook to delete alumni
export const useDeleteAlumni = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteAlumni,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alumni"] });
    },
  });
};

// Hook to fetch alumni by ID
export const useAlumniById = (id: string) => {
  return useQuery({
    queryKey: ["alumni", id],
    queryFn: () => getAlumniById(id),
    enabled: !!id, // Only fetch if ID is provided
  });
};

// Hook to create alumni
export const useCreateAlumni = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createAlumni,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alumni"] });
    },
  });
};

// Hook to update alumni
export const useUpdateAlumni = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAlumniDto }) =>
      updateAlumni(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alumni"] });
    },
  });
};