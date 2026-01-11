"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import Image from "next/image";
import { useAdmins, useDeleteAdmin } from "@/app/dashboard/admin/queries";
import { AdminResponse } from "@/app/dashboard/admin/types";
import { toast } from "sonner";

export function DashboardAdminContent() {
  const router = useRouter();
  const { data, isLoading } = useAdmins();
  const deleteAdmin = useDeleteAdmin();

  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: AdminResponse | null;
  }>({ isOpen: false, item: null });

  const handleDeleteClick = (item: AdminResponse) => {
    setDeleteAlert({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    const item = deleteAlert.item;
    if (!item) return;

    deleteAdmin.mutate(item.id, {
      onSuccess: () => {
        setDeleteAlert({ isOpen: false, item: null });
        toast.success("Admin berhasil dihapus!", {
          description: item.name || item.email,
        });
      },
      onError: () => {
        toast.error("Gagal menghapus admin", {
          description: "Terjadi kesalahan pada server",
        });
      },
    });
  };

  if (isLoading) return <h1 className="text-center py-10">Loading...</h1>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Admin</h1>
        <p className="text-muted-foreground mt-2">
          Kelola akun admin yang dapat mengakses dashboard
        </p>
      </div>

      <DataTable
        data={data?.data ?? []}
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
                unoptimized
              />
            ),
          },
          { key: "name", label: "Nama", sortable: true },
          { key: "email", label: "Email", sortable: true },
          {
            key: "role",
            label: "Role",
            render: (value: string) => {
              const role = value as "SUPER_ADMIN" | "ADMIN" | "EDITOR";

              const badgeStyles = {
                SUPER_ADMIN: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
                ADMIN: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
                EDITOR: "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20",
              };

              const displayText = {
                SUPER_ADMIN: "Super Admin",
                ADMIN: "Admin",
                EDITOR: "Editor",
              };

              return (
                <span
                  className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${badgeStyles[role]}`}
                >
                  {displayText[role]}
                </span>
              );
            },
          },
        ]}
        onAdd={() => router.push("/dashboard/admin/tambah")}
        onEdit={(item) => router.push(`/dashboard/admin/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={["name", "email"]}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Admin"
        description="Akun admin ini akan dihapus secara permanen"
        itemName={deleteAlert.item?.name || deleteAlert.item?.email || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}