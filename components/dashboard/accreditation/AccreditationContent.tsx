"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import { useAccreditations, useDeleteAccreditation } from "@/app/dashboard/accreditation/queries";
import { Accreditation } from "@/app/dashboard/accreditation/types";
import { toast } from "sonner";
import { ExternalLink, FileText } from "lucide-react";

export function AccreditationContent() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedProdi, setSelectedProdi] = useState<string>("ALL");

  const queryParams = {
    ...(selectedCategory !== "ALL" ? { category: selectedCategory } : {}),
    ...(selectedProdi !== "ALL" ? { prodi: selectedProdi } : {}),
  };

  const { data, isLoading } = useAccreditations(queryParams);
  const deleteMutation = useDeleteAccreditation();

  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: Accreditation | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleDeleteClick = (item: Accreditation) => {
    setDeleteAlert({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    if (!deleteAlert.item) return;

    deleteMutation.mutate(deleteAlert.item.id, {
      onSuccess: () => {
        setDeleteAlert({ isOpen: false, item: null });
        toast.success("Akreditasi berhasil dihapus!", {
          description: deleteAlert.item?.title,
        });
      },
      onError: () => {
        toast.error("Gagal menghapus data akreditasi", {
          description: "Terjadi kesalahan pada server",
        });
      },
    });
  };

  if (isLoading) return <div className="text-center py-10 text-muted-foreground">Loading....</div>;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Akreditasi Kampus & Prodi</h1>
          <p className="text-muted-foreground mt-2">Kelola data dan dokumen SK akreditasi</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Category Filter */}
          <div className="flex rounded-lg border bg-muted p-1">
            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSelectedProdi("ALL");
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                selectedCategory === "ALL"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => {
                setSelectedCategory("KAMPUS");
                setSelectedProdi("ALL");
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                selectedCategory === "KAMPUS"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Kampus
            </button>
            <button
              onClick={() => setSelectedCategory("PRODI")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                selectedCategory === "PRODI"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Prodi
            </button>
          </div>

          {/* Prodi Filter if Category PRODI */}
          {selectedCategory === "PRODI" && (
            <div className="flex rounded-lg border bg-muted p-1">
              <button
                onClick={() => setSelectedProdi("ALL")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                  selectedProdi === "ALL"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Semua Prodi
              </button>
              <button
                onClick={() => setSelectedProdi("S1")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                  selectedProdi === "S1"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                S1 TI
              </button>
              <button
                onClick={() => setSelectedProdi("D3")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                  selectedProdi === "D3"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                D3 TI
              </button>
            </div>
          )}
        </div>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={[
          { key: "title", label: "Judul", sortable: true },
          {
            key: "category",
            label: "Kategori",
            render: (_, item) => (
              <span className="px-2 py-1 text-xs rounded font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                {item.category} {item.prodi ? `(${item.prodi})` : ""}
              </span>
            ),
          },
          {
            key: "grade",
            label: "Akreditasi",
            render: (value) => (
              <span className="px-2.5 py-1 text-xs rounded-full font-bold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
                {value}
              </span>
            ),
          },
          { key: "skNumber", label: "No. SK" },
          { key: "institution", label: "Lembaga", render: (val) => val || "-" },
          {
            key: "validFrom",
            label: "Masa Berlaku",
            render: (_, item) => (
              <span className="text-xs text-muted-foreground">
                {formatDate(item.validFrom)} - {formatDate(item.validUntil)}
              </span>
            ),
          },
          {
            key: "certificateFile",
            label: "Berkas / SK",
            render: (_, item) => (
              <div className="flex flex-col gap-1 text-xs">
                {item.certificateFile && (
                  <a
                    href={item.certificateFile}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    <FileText className="w-3.5 h-3.5" /> Sertifikat
                  </a>
                )}
                {item.skLink && (
                  <a
                    href={item.skLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Link SK
                  </a>
                )}
                {!item.certificateFile && !item.skLink && <span className="text-muted-foreground">-</span>}
              </div>
            ),
          },
        ]}
        onAdd={() => router.push("/dashboard/accreditation/tambah")}
        onEdit={(item) => router.push(`/dashboard/accreditation/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={["title", "skNumber", "grade", "institution"]}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Akreditasi"
        description="Pastikan Anda ingin menghapus data akreditasi ini"
        itemName={deleteAlert.item?.title || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}
