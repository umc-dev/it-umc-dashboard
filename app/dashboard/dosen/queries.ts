import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDosen,
  deleteDosen,
  getDosenById,
  getDosens,
  updateDosen,
} from "./api";

// GET ALL DOSENS
export const useDosens = () => {
  return useQuery({
    queryKey: ["dosens"],
    queryFn: getDosens,
  });
};

// DELETE DOSEN
export const useDeleteDosen = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteDosen,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dosens"] });
    },
  });
};

// GET DOSEN BY ID
export const useDosenById = (id: string) => {
  return useQuery({
    queryKey: ["dosens", id],
    queryFn: () => getDosenById(id),
    enabled: !!id, // Fetch only if ID exists
  });
};

// CREATE DOSEN
export const useCreateDosen = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createDosen,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dosens"] });
    },
  });
};

// UPDATE DOSEN
export const useUpdateDosen = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateDosen(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dosens"] });
    },
  });
};