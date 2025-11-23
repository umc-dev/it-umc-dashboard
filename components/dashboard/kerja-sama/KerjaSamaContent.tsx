"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import { kerjaSamaList, type KerjaSama } from "@/lib/data";
import Image from "next/image";

export function DashboardKerjaSamaContent() {
  const router = useRouter();
  const [data, setData] = useState<KerjaSama[]>(kerjaSamaList);
  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: KerjaSama | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleDeleteClick = (item: KerjaSama) => {
    setDeleteAlert({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    if (deleteAlert.item) {
      setData(data.filter((ks) => ks.id !== deleteAlert.item!.id));
      setDeleteAlert({ isOpen: false, item: null });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Manajemen Kerja Sama
        </h1>
        <p className="text-muted-foreground mt-2">
          Kelola daftar kerja sama antara kampus dan mitra
        </p>
      </div>

      <DataTable
        data={data}
        columns={[
          {
            key: "logoUrl",
            label: "Logo",
            render: (val) => (
              <Image
                src={val}
                alt="Logo Mitra"
                width={40}
                height={40}
                className="rounded"
              />
            ),
          },
          { key: "namaMitra", label: "Mitra", sortable: true },
          { key: "tahun", label: "Tahun", sortable: true },
          { key: "jangkaWaktu", label: "Jangka Waktu", sortable: true },
          { key: "tanggalMulai", label: "Mulai", sortable: true },
          { key: "tanggalBerakhir", label: "Berakhir", sortable: true },
          {
            key: "fileDownloadUrl",
            label: "Dokumen",
            render: (val) => (
              <a
                href={val}
                target="_blank"
                className="text-blue-600 underline text-sm"
              >
                Download
              </a>
            ),
          },
        ]}
        onAdd={() => router.push("/dashboard/kerja-sama/tambah")}
        onEdit={(item) => router.push(`/dashboard/kerja-sama/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={[
          "namaMitra",
          "tahun",
          "jangkaWaktu",
          "tanggalMulai",
          "tanggalBerakhir",
        ]}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Kerja Sama"
        description="Pastikan anda ingin menghapus kerja sama ini"
        itemName={deleteAlert.item?.namaMitra || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}
