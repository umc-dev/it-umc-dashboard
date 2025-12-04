"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import { Category } from "@/app/dashboard/kategori/types";
import {
  useCategory,
  useDeleteCategory,
} from "@/app/dashboard/kategori/queries";
import { toast } from "sonner";
import axios from "axios";

export function DashboardKategoriContent() {
  const router = useRouter();

  // Hook API
  const { data, isLoading } = useCategory();
  const deleteCategory = useDeleteCategory();

  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: Category | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleDeleteClick = (item: Category) => {
    setDeleteAlert({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    if (!deleteAlert.item) return;

    deleteCategory.mutate(deleteAlert.item.slug, {
      onSuccess: () => {
        setDeleteAlert({ isOpen: false, item: null });

        toast.success("Kategori berhasil dihapus!", {
          description: `${deleteAlert.item?.name}`,
        });
      },

      onError: (error) => {
        let message = "Terjadi kesalahan pada server";

        if (axios.isAxiosError(error)) {
          message = error.response?.data?.message || message;
        }

        toast.error("Gagal menghapus kategori", {
          description: message,
        });
      },
    });
  };

  if (isLoading) return <h1> Loading... </h1>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Manajemen Kategori
        </h1>
        <p className="text-muted-foreground mt-2">Kelola kategori berita</p>
      </div>

      <DataTable
        data={data ?? []}
        columns={[
          { key: "name", label: "Name", sortable: true },
          { key: "slug", label: "Slug", sortable: true },
        ]}
        onAdd={() => router.push("/dashboard/kategori/tambah")}
        onEdit={(item) => router.push(`/dashboard/kategori/${item.slug}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={["name", "slug"]}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Kategori"
        description="Pastikan anda ingin menghapus kategori ini"
        itemName={deleteAlert.item?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}
