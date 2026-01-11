"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import Image from "next/image";
import {
  useDeleteDosen,
  useDosens,
} from "@/app/dashboard/dosen/queries";
import { DosenResponse } from "@/app/dashboard/dosen/types";
import { toast } from "sonner";

export function DashboardDosenContent() {
  const router = useRouter();

  const { data, isLoading } = useDosens();
  const deleteDosen = useDeleteDosen();

  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: DosenResponse | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleDeleteClick = (item: DosenResponse) => {
    setDeleteAlert({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    if (!deleteAlert.item) return;

    deleteDosen.mutate(deleteAlert.item.id, {
      onSuccess: () => {
        setDeleteAlert({ isOpen: false, item: null });

        toast.success("Dosen berhasil dihapus!", {
          description: `${deleteAlert.item?.name}`,
        });
      },

      onError: () => {
        toast.error("Gagal menghapus dosen", {
          description: "Terjadi kesalahan pada server",
        });
      },
    });
  };

  if (isLoading) return <h1>Loading....</h1>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Dosen</h1>
        <p className="text-muted-foreground mt-2">
          Kelola data dosen dan spesialisasi mereka
        </p>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={[
          {
            key: "photo",
            label: "Foto",
            render: (value) =>
              value ? (
                <Image
                  src={value}
                  alt="Foto Dosen"
                  width={100}
                  height={100}
                  className="w-10 h-10 rounded-full object-cover"
                  unoptimized
                />
              ) : (
                <span>-</span>
              ),
          },
          { key: "name", label: "Nama", sortable: true },
          { key: "expertise", label: "Spesialisasi", sortable: true },
        ]}
        onAdd={() => router.push("/dashboard/dosen/tambah")}
        onEdit={(item) => router.push(`/dashboard/dosen/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={["name", "expertise"]}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Dosen"
        description="Pastikan anda ingin menghapus dosen ini"
        itemName={deleteAlert.item?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}