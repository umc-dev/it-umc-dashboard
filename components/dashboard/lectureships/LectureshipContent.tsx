"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import {
  useLectureships,
  useDeleteLectureship,
} from "@/app/dashboard/lectureships/queries";
import { LectureshipResponse } from "@/app/dashboard/lectureships/types";
import { toast } from "sonner";
import axios from "axios";

export function DashboardLectureshipContent() {
  const router = useRouter();

  const { data, isLoading } = useLectureships();
  const deleteLectureship = useDeleteLectureship();

  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: LectureshipResponse | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleDeleteClick = (item: LectureshipResponse) => {
    setDeleteAlert({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    if (!deleteAlert.item) return;

    deleteLectureship.mutate(deleteAlert.item.id, {
      onSuccess: () => {
        setDeleteAlert({ isOpen: false, item: null });

        toast.success("Jabatan dosen berhasil dihapus!", {
          description: `${deleteAlert.item?.name}`,
        });
      },

      onError: (error) => {
        let message = "Terjadi kesalahan pada server";

        if (axios.isAxiosError(error)) {
          message = error.response?.data?.message || message;
        }

        toast.error("Gagal menghapus jabatan dosen", {
          description: message,
        });
      },
    });
  };

  if (isLoading) return <h1>Loading....</h1>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Jabatan Dosen</h1>
        <p className="text-muted-foreground mt-2">
          Kelola data jabatan dosen
        </p>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={[
            { key: "name", label: "Nama Jabatan Dosen", sortable: true },
        ]}
        onAdd={() => router.push("/dashboard/lectureships/tambah")}
        onEdit={(item) =>
          router.push(`/dashboard/lectureships/${item.id}/ubah`)
        }
        onDeleteClick={handleDeleteClick}
        searchFields={["name"]}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Jabatan Dosen"
        description="Pastikan anda ingin menghapus jabatan dosen ini"
        itemName={deleteAlert.item?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}
