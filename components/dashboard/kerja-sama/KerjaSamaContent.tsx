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
import { formatDateTimeIndo } from "@/lib/formatDateTimeIndo";
import { toast } from "sonner";
import { FileText } from "lucide-react";

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

  if (isLoading) return <h1 className="text-center py-10 text-muted-foreground">Loading....</h1>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Manajemen Kerja Sama
        </h1>
        <p className="text-muted-foreground mt-2">
          Kelola data kerja sama, logo mitra, dan lampiran berkas MOU/MOA
        </p>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={[
          {
            key: "photo",
            label: "Logo Mitra",
            render: (value) =>
              value ? (
                <Image
                  src={value}
                  alt="Logo Mitra"
                  width={64}
                  height={64}
                  className="w-12 h-12 rounded-lg object-contain bg-muted p-1 border border-border"
                  unoptimized
                />
              ) : (
                <span className="text-muted-foreground">-</span>
              ),
          },
          {
            key: "name",
            label: "Nama & Deskripsi",
            sortable: true,
            render: (val, item) => (
              <div>
                <p className="font-semibold text-foreground">{val}</p>
                {item.description && (
                  <p className="text-xs text-muted-foreground truncate max-w-xs">{item.description}</p>
                )}
              </div>
            ),
          },
          {
            key: "startDate",
            label: "Masa Perjanjian",
            sortable: true,
            render: (val, item) => (
              <span className="text-xs text-muted-foreground">
                {formatDateTimeIndo(val)} - {formatDateTimeIndo(item.endDate)}
              </span>
            ),
          },
          {
            key: "files",
            label: "Lampiran Berkas",
            render: (_, item) => (
              <div className="flex flex-col gap-1 max-w-xs text-xs">
                {item.files && item.files.length > 0 ? (
                  item.files.map((file) => (
                    <a
                      key={file.id}
                      href={file.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline truncate"
                      title={file.fileName}
                    >
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{file.fileName}</span>
                    </a>
                  ))
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </div>
            ),
          },
        ]}
        onAdd={() => router.push("/dashboard/kerja-sama/tambah")}
        onEdit={(item) => router.push(`/dashboard/kerja-sama/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={["name", "description"]}
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