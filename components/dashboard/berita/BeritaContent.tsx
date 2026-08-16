"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import Image from "next/image";
import { useApproveNews, useDeleteNews, useNews } from "@/app/dashboard/berita/queries";
import { NewsResponse } from "@/app/dashboard/berita/types";
import { toast } from "sonner";
import { useMe } from "@/app/login/queries";
import { Check, X } from "lucide-react";

export function DashboardBeritaContent() {
  const router = useRouter();
  const { data: me } = useMe();

  const { data, isLoading } = useNews();
  const deleteNews = useDeleteNews();
  const approveNews = useApproveNews();

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

  const handleApprove = (slug: string, status: "PUBLISHED" | "REJECTED") => {
    approveNews.mutate(
      { slug, status },
      {
        onSuccess: () => {
          toast.success(
            status === "PUBLISHED" ? "Berita berhasil disetujui & dipublikasikan!" : "Berita ditolak"
          );
        },
        onError: () => {
          toast.error("Gagal mengubah status berita");
        },
      }
    );
  };

  if (isLoading) return <h1 className="text-center py-10 text-muted-foreground">Loading....</h1>;

  const isSuperAdminOrAdmin = me?.role === "SUPER_ADMIN" || me?.role === "ADMIN";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Berita</h1>
        <p className="text-muted-foreground mt-2">
          Kelola berita, pengumuman, dan persetujuan publikasi
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
          { key: "title", label: "Judul", sortable: true },
          {
            key: "category",
            label: "Kategori",
            render: (value) => <span>{value?.name || "-"}</span>,
          },
          {
            key: "status",
            label: "Status",
            render: (value, item) => {
              const status = value || "PUBLISHED";
              return (
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      status === "PUBLISHED"
                        ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                        : status === "PENDING"
                        ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300"
                        : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {status}
                  </span>

                  {isSuperAdminOrAdmin && status === "PENDING" && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleApprove(item.slug, "PUBLISHED")}
                        title="Approve / Publikasikan"
                        className="p-1 rounded bg-green-600 text-white hover:bg-green-700 transition"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleApprove(item.slug, "REJECTED")}
                        title="Reject / Tolak"
                        className="p-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            },
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
