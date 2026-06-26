import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDosen,
  deleteDosen,
  getDosenById,
  getDosens,
  updateDosen,
  createDosenTridharma,
  updateDosenTridharma,
  deleteDosenTridharma,
} from "./api";

// GET ALL DOSENS
export const useDosens = (prodi?: string) => {
  return useQuery({
    queryKey: ["dosens", prodi],
    queryFn: () => getDosens(prodi),
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

// CREATE DOSEN TRIDHARMA
export const useCreateDosenTridharma = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createDosenTridharma,
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["dosens"] });
      qc.invalidateQueries({ queryKey: ["dosens", variables.dosenId] });
    },
  });
};

// UPDATE DOSEN TRIDHARMA
export const useUpdateDosenTridharma = (dosenId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateDosenTridharma(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dosens"] });
      qc.invalidateQueries({ queryKey: ["dosens", dosenId] });
    },
  });
};

// DELETE DOSEN TRIDHARMA
export const useDeleteDosenTridharma = (dosenId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteDosenTridharma,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dosens"] });
      qc.invalidateQueries({ queryKey: ["dosens", dosenId] });
    },
  });
};