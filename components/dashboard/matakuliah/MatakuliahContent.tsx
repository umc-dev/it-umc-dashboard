"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import { useDeleteStudy, useStudies } from "@/app/dashboard/matakuliah/queries";
import { StudyResponse } from "@/app/dashboard/matakuliah/types";
import { formatDateTimeIndo } from "@/lib/formatDateTimeIndo";
import { toast } from "sonner";
import Link from "next/link";

export function DashboardMatakuliahContent() {
  const router = useRouter();

  const { data, isLoading } = useStudies();
  const deleteStudy = useDeleteStudy();

  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: StudyResponse | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleDeleteClick = (item: StudyResponse) => {
    setDeleteAlert({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    if (!deleteAlert.item) return;

    deleteStudy.mutate(deleteAlert.item.id, {
      onSuccess: () => {
        setDeleteAlert({ isOpen: false, item: null });

        toast.success("Dokumen berhasil dihapus!", {
          description: `Dokumen ID: ${deleteAlert.item?.id}`,
        });
      },

      onError: () => {
        toast.error("Gagal menghapus dokumen", {
          description: "Terjadi kesalahan pada server",
        });
      },
    });
  };

  if (isLoading) return <h1>Loading....</h1>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Dokumen Mata Kuliah</h1>
        <p className="text-muted-foreground mt-2">
          Kelola dokumen mata kuliah
        </p>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={[
          {
            key: "source",
            label: "Dokumen",
            render: (value) => (
              <Link href={value} target="_blank" rel="noopener noreferrer">
                Lihat Dokumen
              </Link>
            ),
          },
          {
            key: "createdAt",
            label: "Dibuat Pada",
            sortable: true,
            render: (value) => formatDateTimeIndo(value),
          },
          {
            key: "updatedAt",
            label: "Diperbarui Pada",
            sortable: true,
            render: (value) => formatDateTimeIndo(value),
          },
        ]}
        onAdd={() => router.push("/dashboard/matakuliah/tambah")}
        onEdit={(item) => router.push(`/dashboard/matakuliah/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={["createdAt"]}
      />


      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Dokumen"
        description="Pastikan anda ingin menghapus dokumen ini"
        itemName={`Dokumen ID: ${deleteAlert.item?.id || ""}`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}