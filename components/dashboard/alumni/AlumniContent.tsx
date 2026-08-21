"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import { useApproveAlumni, useDeleteAlumni, useAlumni } from "@/app/dashboard/alumni/queries";
import { AlumniResponse } from "@/app/dashboard/alumni/types";
import { toast } from "sonner";
import Image from "next/image";
import { Check, X, Linkedin, Instagram } from "lucide-react";

export function AlumniContent() {
  const router = useRouter();
  const [selectedProdi, setSelectedProdi] = useState<"S1" | "D3">("S1");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "approved" | "pending">("all");

  const { data, isLoading } = useAlumni(selectedProdi, selectedStatus);
  const deleteAlumni = useDeleteAlumni();
  const approveAlumni = useApproveAlumni();

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

  const handleApproveToggle = (id: string, isApproved: boolean) => {
    approveAlumni.mutate(
      { id, isApproved },
      {
        onSuccess: () => {
          toast.success(
            isApproved ? "Data alumni berhasil disetujui!" : "Status alumni diubah ke Pending"
          );
        },
        onError: () => {
          toast.error("Gagal mengubah status alumni");
        },
      }
    );
  };

  if (isLoading) return <div className="text-center py-10 text-muted-foreground">Loading....</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manajemen Alumni</h1>
          <p className="text-muted-foreground mt-2">Kelola data alumni dan persetujuan testimoni mandiri</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Prodi Switcher */}
          <div className="flex rounded-lg border bg-muted p-1">
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

          {/* Status Filter Switcher */}
          <div className="flex rounded-lg border bg-muted p-1">
            <button
              onClick={() => setSelectedStatus("all")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                selectedStatus === "all"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setSelectedStatus("approved")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                selectedStatus === "approved"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Disetujui
            </button>
            <button
              onClick={() => setSelectedStatus("pending")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                selectedStatus === "pending"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Pending
            </button>
          </div>
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
          {
            key: "name",
            label: "Nama & Pekerjaan",
            sortable: true,
            render: (val, item) => (
              <div>
                <p className="font-medium text-foreground">{val}</p>
                {(item.position || item.workplace) && (
                  <p className="text-xs text-muted-foreground">
                    {item.position ? `${item.position}` : ""}
                    {item.position && item.workplace ? ` at ` : ""}
                    {item.workplace ? `${item.workplace}` : ""}
                  </p>
                )}
              </div>
            ),
          },
          {
            key: "year",
            label: "Angkatan / Lulus",
            sortable: true,
            render: (val, item) => (
              <span className="text-xs">
                Angkatan {val}
                {item.graduationYear ? ` (Lulus ${item.graduationYear})` : ""}
              </span>
            ),
          },
          {
            key: "message",
            label: "Pesan",
            render: (value) => (
              <span className="truncate max-w-xs block text-xs">{value || "-"}</span>
            ),
          },
          {
            key: "linkedin",
            label: "Sosmed",
            render: (_, item) => (
              <div className="flex items-center gap-2">
                {item.linkedin && (
                  <a
                    href={item.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {item.instagram && (
                  <a
                    href={item.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-600 hover:text-pink-800"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {!item.linkedin && !item.instagram && <span className="text-muted-foreground">-</span>}
              </div>
            ),
          },
          {
            key: "isApproved",
            label: "Status",
            render: (value, item) => (
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    value
                      ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                      : "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300"
                  }`}
                >
                  {value ? "Approved" : "Pending"}
                </span>

                <button
                  onClick={() => handleApproveToggle(item.id, !value)}
                  title={value ? "Set Pending" : "Approve Alumni"}
                  className={`p-1 rounded transition text-white ${
                    value ? "bg-amber-600 hover:bg-amber-700" : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {value ? <X className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                </button>
              </div>
            ),
          },
        ]}
        onAdd={() => router.push(`/dashboard/alumni/tambah?prodi=${selectedProdi}`)}
        onEdit={(item) => router.push(`/dashboard/alumni/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={["name", "year", "workplace", "position", "message"]}
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
