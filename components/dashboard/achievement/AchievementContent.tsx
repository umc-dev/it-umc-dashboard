"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import {
  useAchievements,
  useDeleteAchievement,
} from "@/app/dashboard/achievement/queries";
import { AchievementResponse } from "@/app/dashboard/achievement/types";
import { toast } from "sonner";

export function AchievementContent() {
  const router = useRouter();
  const { data, isLoading } = useAchievements();
  const deleteAchievement = useDeleteAchievement();

  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: AchievementResponse | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleConfirmDelete = () => {
    if (!deleteAlert.item) return;

    deleteAchievement.mutate(deleteAlert.item.id, {
      onSuccess: () => {
        toast.success("Prestasi berhasil dihapus", {
          description: deleteAlert.item?.achievementName,
        });
        setDeleteAlert({ isOpen: false, item: null });
      },
      onError: () => {
        toast.error("Gagal menghapus prestasi", {
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
          Manajemen Prestasi
        </h1>
        <p className="text-muted-foreground mt-2">
          Kelola data prestasi mahasiswa beserta sertifikatnya
        </p>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={[
          { key: "name", label: "Nama Mahasiswa", sortable: true },
          { key: "achievementName", label: "Prestasi", sortable: true },
          {
            key: "achievedAt",
            label: "Tanggal",
            sortable: true,
            render: (value) => value?.slice?.(0, 10) || "-",
          },
          {
            key: "link",
            label: "Sertifikat",
            render: (value) => (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Buka Link
              </a>
            ),
          },
        ]}
        onAdd={() => router.push("/dashboard/achievement/tambah")}
        onEdit={(item) => router.push(`/dashboard/achievement/${item.id}/ubah`)}
        onDeleteClick={(item) => setDeleteAlert({ isOpen: true, item })}
        searchFields={["name", "achievementName"]}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Prestasi"
        description="Pastikan anda ingin menghapus data prestasi ini"
        itemName={deleteAlert.item?.achievementName || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}
