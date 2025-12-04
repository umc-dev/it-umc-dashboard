"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import Image from "next/image";
import { useDeleteNews, useNews } from "@/app/dashboard/berita/queries";
import { NewsResponse } from "@/app/dashboard/berita/types";
import { toast } from "sonner";

export function DashboardBeritaContent() {
  const router = useRouter();

  const { data, isLoading } = useNews();
  const deleteNews = useDeleteNews();

  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: NewsResponse | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleDeleteClick = (item: NewsResponse) => {
    setDeleteAlert({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    if (!deleteAlert.item) return;

    deleteNews.mutate(deleteAlert.item.slug, {
      onSuccess: () => {
        setDeleteAlert({ isOpen: false, item: null });

        toast.success("Berita berhasil dihapus!", {
          description: `${deleteAlert.item?.title}`,
        });
      },

      onError: () => {
        toast.error("Gagal menghapus berita", {
          description: "Terjadi kesalahan pada server",
        });
      },
    });
  };

  if (isLoading) return <h1>Loading....</h1>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Berita</h1>
        <p className="text-muted-foreground mt-2">
          Kelola berita dan pengumuman
        </p>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={[
          {
            key: "thumbnail",
            label: "Thumbnail",
            render: (value) => (
              <Image
                src={value}
                alt="Thumbnail"
                width={100}
                height={100}
                className="w-16 h-10 object-cover rounded-md"
                unoptimized
              />
            ),
          },
          { key: "title", label: "Title", sortable: true },

          {
            key: "category",
            label: "Kategori",
            render: (value) => <span>{value?.name || "-"}</span>,
          },
        ]}
        onAdd={() => router.push("/dashboard/berita/tambah")}
        onEdit={(item) => router.push(`/dashboard/berita/${item.slug}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={["title"]}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Berita"
        description="Pastikan anda ingin menghapus berita ini"
        itemName={deleteAlert.item?.title || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}
