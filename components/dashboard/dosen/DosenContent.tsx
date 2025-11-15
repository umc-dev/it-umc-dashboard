"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import { dosens, type Dosen } from "@/lib/data";
import Image from "next/image";

export function DashboardDosenContent() {
  const router = useRouter();
  const [data, setData] = useState<Dosen[]>(dosens);
  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: Dosen | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleDeleteClick = (item: Dosen) => {
    setDeleteAlert({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    if (deleteAlert.item) {
      setData(data.filter((d) => d.id !== deleteAlert.item!.id));
      setDeleteAlert({ isOpen: false, item: null });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Dosen</h1>
        <p className="text-muted-foreground mt-2">
          Kelola data dosen dan spesialisasi mereka
        </p>
      </div>

      <DataTable
        data={data}
        columns={[
          {
            key: "avatar",
            label: "Avatar",
            render: (value) => (
              <Image
                src={value}
                alt="Avatar"
                width={100}
                height={100}
                className="w-10 h-10 rounded-full"
              />
            ),
          },
          { key: "nama", label: "Nama", sortable: true },
          { key: "spesialis", label: "Spesialisasi", sortable: true },
          
        ]}
        onAdd={() => router.push("/dashboard/dosen/tambah")}
        onEdit={(item) => router.push(`/dashboard/dosen/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={["nama", "spesialis"]}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Dosen"
        description="Pastikan anda ingin menghapus dosen ini"
        itemName={deleteAlert.item?.nama || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}
