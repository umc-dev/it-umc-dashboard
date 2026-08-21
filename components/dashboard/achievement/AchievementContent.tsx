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
  const [selectedProdi, setSelectedProdi] = useState<"S1" | "D3">("S1");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const { data, isLoading } = useAchievements(
    selectedProdi,
    selectedCategory === "ALL" ? undefined : selectedCategory
  );
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Manajemen Prestasi
          </h1>
          <p className="text-muted-foreground mt-2">
            Kelola data prestasi mahasiswa beserta sertifikatnya
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Switcher */}
          <div className="flex rounded-lg border bg-muted p-1">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                selectedCategory === "ALL"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setSelectedCategory("AKADEMIK")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                selectedCategory === "AKADEMIK"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Akademik
            </button>
            <button
              onClick={() => setSelectedCategory("NON_AKADEMIK")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                selectedCategory === "NON_AKADEMIK"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Non-Akademik
            </button>
          </div>

          {/* Prodi Switcher */}
          <div className="flex rounded-lg border bg-muted p-1">
            <button
              onClick={() => setSelectedProdi("S1")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
                selectedProdi === "S1"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              S1
            </button>
            <button
              onClick={() => setSelectedProdi("D3")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
                selectedProdi === "D3"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              D3
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground">Loading...</div>
      ) : (
        <DataTable
          data={data?.data ?? []}
          columns={[
            { key: "name", label: "Nama Mahasiswa", sortable: true },
            { key: "achievementName", label: "Prestasi", sortable: true },
            {
              key: "category",
              label: "Kategori",
              sortable: true,
              render: (value) => (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    value === "AKADEMIK"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                      : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                  }`}
                >
                  {value === "AKADEMIK" ? "Akademik" : "Non-Akademik"}
                </span>
              ),
            },
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
          onAdd={() => router.push(`/dashboard/achievement/tambah?prodi=${selectedProdi}`)}
          onEdit={(item) => router.push(`/dashboard/achievement/${item.id}/ubah`)}
          onDeleteClick={(item) => setDeleteAlert({ isOpen: true, item })}
          searchFields={["name", "achievementName"]}
        />
      )}

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
