import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStrukturOrganisasi, deleteStrukturOrganisasi, getStrukturOrganisasi, updateStrukturOrganisasi } from "./api";

const QUERY_KEY = ["struktur-organisasi"];

export const useStrukturOrganisasi = (prodi?: 'S1' | 'D3') => {
  return useQuery({
    queryKey: [QUERY_KEY[0], prodi],
    queryFn: () => getStrukturOrganisasi(prodi),
  });
};

export const useCreateStrukturOrganisasi = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createStrukturOrganisasi,
    onSuccess: (_, variables) => {
      // Invalidate specific or all structure queries
      qc.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};

export const useUpdateStrukturOrganisasi = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ data, prodi }: { data: FormData; prodi?: 'S1' | 'D3' }) =>
      updateStrukturOrganisasi(data, prodi),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY[0], variables.prodi] });
    },
  });
};

export const useDeleteStrukturOrganisasi = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (prodi?: 'S1' | 'D3') => deleteStrukturOrganisasi(prodi),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY[0], variables] });
    },
  });
};
