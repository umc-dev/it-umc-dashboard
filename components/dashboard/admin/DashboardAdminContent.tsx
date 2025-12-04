"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import { admins, type Admin } from "@/lib/data";
import Image from "next/image";

export function DashboardAdminContent() {
  const router = useRouter();
  const [data, setData] = useState<Admin[]>(admins);
  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: Admin | null;
  }>({ isOpen: false, item: null });

  const handleDeleteClick = (item: Admin) => {
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
        <h1 className="text-3xl font-bold text-foreground">Manajemen Admin</h1>
        <p className="text-muted-foreground mt-2">
          Kelola akun admin yang dapat mengakses dashboard
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
                src={value || "/avatar.svg"}
                alt="Avatar"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            ),
          },
          { key: "nama", label: "Nama", sortable: true },
          { key: "email", label: "Email", sortable: true },
        ]}
        onAdd={() => router.push("/dashboard/admin/tambah")}
        onEdit={(item) => router.push(`/dashboard/admin/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={["nama", "email"]}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Admin"
        description="Akun admin ini akan dihapus permanen"
        itemName={deleteAlert.item?.nama || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}