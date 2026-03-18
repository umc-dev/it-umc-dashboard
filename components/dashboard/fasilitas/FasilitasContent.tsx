"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import Image from "next/image";
import {
  useDeleteFacility,
  useFacilities,
} from "@/app/dashboard/fasilitas/queries";
import { FacilityResponse } from "@/app/dashboard/fasilitas/types";
import { toast } from "sonner";

export function DashboardFasilitasContent() {
  const router = useRouter();

  const { data, isLoading } = useFacilities();
  const deleteFacility = useDeleteFacility();

  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: FacilityResponse | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleDeleteClick = (item: FacilityResponse) => {
    setDeleteAlert({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    if (!deleteAlert.item) return;

    deleteFacility.mutate(deleteAlert.item.id, {
      onSuccess: () => {
        setDeleteAlert({ isOpen: false, item: null });

        toast.success("Fasilitas berhasil dihapus!", {
          description: `${deleteAlert.item?.name}`,
        });
      },

      onError: () => {
        toast.error("Gagal menghapus fasilitas", {
          description: "Terjadi kesalahan pada server",
        });
      },
    });
  };

  if (isLoading) return <h1>Loading....</h1>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Manajemen Fasilitas
        </h1>
        <p className="text-muted-foreground mt-2">
          Kelola daftar fasilitas kampus
        </p>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={[
          {
            key: "photo",
            label: "Gambar",
            render: (value) => (
              <Image
                  src={value}
                  alt="Gambar Fasilitas"
                  width={100}
                  height={100}
                  className="w-24 h-16 rounded object-cover"
                  unoptimized
                />
              )
          },
          { key: "name", label: "Nama Fasilitas", sortable: true },
          { key: "description", label: "Deskripsi", sortable: true },
        ]}
        onAdd={() => router.push("/dashboard/fasilitas/tambah")}
        onEdit={(item) => router.push(`/dashboard/fasilitas/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={["name", "description"]}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Fasilitas"
        description="Pastikan anda ingin menghapus fasilitas ini"
        itemName={deleteAlert.item?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}
