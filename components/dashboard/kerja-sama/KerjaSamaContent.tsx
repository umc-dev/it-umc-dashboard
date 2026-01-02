"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import Image from "next/image";
import {
  useDeletePartnership,
  usePartnerships,
} from "@/app/dashboard/kerja-sama/queries";
import { PartnershipResponse } from "@/app/dashboard/kerja-sama/types";
import { toast } from "sonner";

export function DashboardKerjaSamaContent() {
  const router = useRouter();

  const { data, isLoading } = usePartnerships();
  const deletePartnership = useDeletePartnership();

  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: PartnershipResponse | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleDeleteClick = (item: PartnershipResponse) => {
    setDeleteAlert({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    if (!deleteAlert.item) return;

    deletePartnership.mutate(deleteAlert.item.id, {
      onSuccess: () => {
        setDeleteAlert({ isOpen: false, item: null });

        toast.success("Kerja sama berhasil dihapus!", {
          description: `${deleteAlert.item?.name}`,
        });
      },

      onError: () => {
        toast.error("Gagal menghapus kerja sama", {
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
          Manajemen Kerja Sama
        </h1>
        <p className="text-muted-foreground mt-2">
          Kelola kerja sama dan mitra
        </p>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={[
          {
            key: "photo",
            label: "Logo",
            render: (value) =>
              value ? (
                <Image
                  src={value}
                  alt="Logo Mitra"
                  width={100}
                  height={100}
                  className="w-16 h-10 object-cover rounded-md"
                  unoptimized
                />
              ) : (
                <span>-</span>
              ),
          },
          { key: "name", label: "Nama Mitra", sortable: true },
          { key: "startDate", label: "Tanggal Mulai", sortable: true },
          { key: "endDate", label: "Tanggal Berakhir", sortable: true },
        ]}
        onAdd={() => router.push("/dashboard/kerja-sama/tambah")}
        onEdit={(item) => router.push(`/dashboard/kerja-sama/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={["name"]}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Kerja Sama"
        description="Pastikan anda ingin menghapus kerja sama ini"
        itemName={deleteAlert.item?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}