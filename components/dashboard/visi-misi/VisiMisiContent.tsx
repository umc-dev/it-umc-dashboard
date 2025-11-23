"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { visiMisiData, type VisiMisi } from "@/lib/data";

export function DashboardVisiMisiContent() {
  const router = useRouter();

  // Bisa null kalau belum ada data
  const [data] = useState<VisiMisi | null>(visiMisiData ?? null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Manajemen Visi & Misi
        </h1>
        <p className="text-muted-foreground mt-2">
          Kelola visi dan misi institusi
        </p>
      </div>

      {/* Kalau belum ada data */}
      {!data && (
        <div className="border rounded-lg p-6">
          <p className="text-muted-foreground mb-4">
            Belum ada data visi & misi.
          </p>

          <button
            onClick={() => router.push("/dashboard/visimisi/tambah")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Tambah Visi & Misi
          </button>
        </div>
      )}

      {/* Kalau data sudah ada */}
      {data && (
        <div className="rounded-lg border p-6 space-y-4 bg-white">
          <div>
            <h2 className="text-xl font-semibold">Visi</h2>
            <p className="text-muted-foreground mt-2 whitespace-pre-line">
              {data.visi}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Misi</h2>
            <p className="text-muted-foreground mt-2 whitespace-pre-line">
              {data.misi}
            </p>
          </div>

          <button
            onClick={() => router.push(`/dashboard/visi-misi/${data.id}/ubah`)}
            className="mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
