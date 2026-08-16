import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveAlumni,
  createAlumni,
  deleteAlumni,
  getAlumni,
  getAlumniById,
  updateAlumni,
} from "./api";

export const useAlumni = (prodi?: "S1" | "D3", status?: "pending" | "approved" | "all") => {
  return useQuery({
    queryKey: ["alumni", prodi, status],
    queryFn: () => getAlumni(prodi, status),
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

export const useApproveAlumni = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isApproved }: { id: string; isApproved: boolean }) =>
      approveAlumni(id, isApproved),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alumni"] });
    },
  });
};
