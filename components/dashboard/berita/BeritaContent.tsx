"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import { beritas, kategoris, type Berita } from "@/lib/data";
import Image from "next/image";

export function DashboardBeritaContent() {
  const router = useRouter();
  const [data, setData] = useState<Berita[]>(beritas);
  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: Berita | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleDeleteClick = (item: Berita) => {
    setDeleteAlert({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    if (deleteAlert.item) {
      setData(data.filter((b) => b.id !== deleteAlert.item!.id));
      setDeleteAlert({ isOpen: false, item: null });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Berita</h1>
        <p className="text-muted-foreground mt-2">
          Kelola berita dan pengumuman
        </p>
      </div>

      <DataTable
        data={data}
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
              />
            ),
          },
          { key: "judul", label: "Judul", sortable: true },
          {
            key: "kategori_id",
            label: "Kategori",
            render: (val) => {
              const kategori = kategoris.find((k) => k.id === val);
              return <span>{kategori?.nama || "-"}</span>;
            },
          },
        ]}
        onAdd={() => router.push("/dashboard/berita/tambah")}
        onEdit={(item) => router.push(`/dashboard/berita/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={["judul"]}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Berita"
        description="Pastikan anda ingin menghapus berita ini"
        itemName={deleteAlert.item?.judul || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}
