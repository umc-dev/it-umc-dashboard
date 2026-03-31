import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStrukturOrganisasi, deleteStrukturOrganisasi, getStrukturOrganisasi, updateStrukturOrganisasi } from "./api";

const QUERY_KEY = ["struktur-organisasi"];

export const useStrukturOrganisasi = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getStrukturOrganisasi,
  });
};

export const useCreateStrukturOrganisasi = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createStrukturOrganisasi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};

export const useUpdateStrukturOrganisasi = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateStrukturOrganisasi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};

export const useDeleteStrukturOrganisasi = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteStrukturOrganisasi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};
