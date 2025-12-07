"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import { alumni, type Alumni } from "@/lib/data";

export function AlumniContent() {
  const router = useRouter();
  const [data, setData] = useState<Alumni[]>(alumni);
  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: Alumni | null;
  }>({ isOpen: false, item: null });

  const handleDeleteClick = (item: Alumni) => {
    setDeleteAlert({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    if (deleteAlert.item) {
      setData(data.filter((a) => a.id !== deleteAlert.item!.id));
      setDeleteAlert({ isOpen: false, item: null });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Alumni</h1>
        <p className="text-muted-foreground mt-2">
          Kelola data alumni sekolah
        </p>
      </div>

      <DataTable
        data={data}
        columns={[
          { key: "name", label: "Nama", sortable: true },
          { key: "thn_lulus", label: "Tahun Lulus", sortable: true },
          {
            key: "messages",
            label: "Pesan",
            render: (value) => (
              <p className="max-w-xs truncate">{value || "-"}</p>
            ),
          },
          {
            key: "video",
            label: "Video",
            render: (value) => (
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
              )
            ),
          },
        ]}
        onAdd={() => router.push("/dashboard/alumni/tambah")}
        onEdit={(item) => router.push(`/dashboard/alumni/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={["name", "messages"]}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Alumni"
        description="Data alumni ini akan dihapus permanen"
        itemName={deleteAlert.item?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}