"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import { useDeleteAlumni, useAlumni } from "@/app/dashboard/alumni/queries";
import { AlumniResponse } from "@/app/dashboard/alumni/types";
import { toast } from "sonner";
import Image from "next/image";

export function AlumniContent() {
  const router = useRouter();
  const [selectedProdi, setSelectedProdi] = useState<"S1" | "D3">("S1");

  const { data, isLoading } = useAlumni(selectedProdi);
  const deleteAlumni = useDeleteAlumni();

  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: AlumniResponse | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleDeleteClick = (item: AlumniResponse) => {
    setDeleteAlert({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    if (!deleteAlert.item) return;

    deleteAlumni.mutate(deleteAlert.item.id, {
      onSuccess: () => {
        setDeleteAlert({ isOpen: false, item: null });

        toast.success("Alumni berhasil dihapus!", {
          description: `${deleteAlert.item?.name}`,
        });
      },

      onError: () => {
        toast.error("Gagal menghapus alumni", {
          description: "Terjadi kesalahan pada server",
        });
      },
    });
  };

  if (isLoading) return <div className="text-center py-10 text-muted-foreground">Loading....</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manajemen Alumni</h1>
          <p className="text-muted-foreground mt-2">Kelola data alumni</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-lg border bg-muted p-1">
          <button
            onClick={() => setSelectedProdi("S1")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
              selectedProdi === "S1"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            S1 Teknik Informatika
          </button>
          <button
            onClick={() => setSelectedProdi("D3")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
              selectedProdi === "D3"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            D3 Teknik Informatika
          </button>
        </div>
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
                  alt="Foto Alumni"
                  width={80}
                  height={80}
                  className="w-10 h-10 rounded-full object-cover"
                  unoptimized
                />
              ) : (
                "-"
              ),
          },
          { key: "name", label: "Nama", sortable: true },
          { key: "year", label: "Tahun Lulus", sortable: true },
          {
            key: "message",
            label: "Pesan",
            render: (value) => (
              <span className="truncate max-w-xs block">{value || "-"}</span>
            ),
          },
          {
            key: "video",
            label: "Video",
            render: (value) =>
              value ? (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Lihat Video
                </a>
              ) : (
                "-"
              ),
          },
        ]}
        onAdd={() => router.push(`/dashboard/alumni/tambah?prodi=${selectedProdi}`)}
        onEdit={(item) => router.push(`/dashboard/alumni/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={["name", "year", "message"]}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Alumni"
        description="Pastikan anda ingin menghapus alumni ini"
        itemName={deleteAlert.item?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}
