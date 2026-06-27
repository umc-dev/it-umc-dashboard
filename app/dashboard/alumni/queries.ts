import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAlumni,
  deleteAlumni,
  getAlumni,
  getAlumniById,
  updateAlumni,
} from "./api";

export const useAlumni = (prodi?: 'S1' | 'D3') => {
  return useQuery({
    queryKey: ["alumni", prodi],
    queryFn: () => getAlumni(prodi),
  });
};

export const useDeleteAlumni = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteAlumni,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alumni"] });
    },
  });
};

export const useAlumniById = (id: string) => {
  return useQuery({
    queryKey: ["alumni", id],
    queryFn: () => getAlumniById(id),
    enabled: !!id,
  });
};

export const useCreateAlumni = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createAlumni,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alumni"] });
    },
  });
};

export const useUpdateAlumni = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateAlumni(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alumni"] });
    },
  });
};
