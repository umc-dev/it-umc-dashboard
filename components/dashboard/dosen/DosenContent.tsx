"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import Image from "next/image";
import { useDosens } from "@/app/dashboard/dosen/queries";
import { DosenResponse } from "@/app/dashboard/dosen/types";
import { useMe } from "@/app/login/queries";

function getPositionSummary(dosen: DosenResponse) {
  if (!dosen.positions.length) return "-";

  const activePosition = dosen.positions.find((position) => !position.endDate);
  const latestPosition = activePosition ?? dosen.positions[0];

  if (!latestPosition) return "-";

  const period = latestPosition.endDate
    ? `${latestPosition.startDate.slice(0, 10)} s/d ${latestPosition.endDate.slice(0, 10)}`
    : `${latestPosition.startDate.slice(0, 10)} - sekarang`;

  return `${latestPosition.lectureship.name} (${period})`;
}

export function DashboardDosenContent() {
  const router = useRouter();
  const [selectedProdi, setSelectedProdi] = useState<"S1" | "D3">("S1");

  const { data, isLoading } = useDosens(selectedProdi);
  const { data: me } = useMe();

  const isDosen = me?.role === "DOSEN";

  const filteredDosenData = useMemo(() => {
    const list = data?.data ?? [];
    if (isDosen && me) {
      return list.filter(
        (dosen: DosenResponse) =>
          (dosen.email && dosen.email === me.email) ||
          dosen.name === me.name
      );
    }
    return list;
  }, [data?.data, isDosen, me]);

  if (isLoading) return <h1>Loading....</h1>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isDosen ? "Profil Dosen" : "Manajemen Dosen"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isDosen
              ? "Kelola data profil dan riwayat Anda"
              : "Kelola data dosen dan riwayat jabatan mereka"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-lg border bg-muted p-1">
          <button
            onClick={() => setSelectedProdi("S1")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
              selectedProdi === "S1"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            S1 Teknik Informatika
          </button>
          <button
            onClick={() => setSelectedProdi("D3")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
              selectedProdi === "D3"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            D3 Teknik Informatika
          </button>
        </div>
      </div>

      <DataTable
        data={filteredDosenData}
        columns={[
          {
            key: "photo",
            label: "Foto",
            render: (value) =>
              value ? (
                <Image
                  src={value}
                  alt="Foto Dosen"
                  width={100}
                  height={100}
                  className="w-10 h-10 rounded-full object-cover"
                  unoptimized
                />
              ) : (
                <span>-</span>
              ),
          },
          { key: "nidn", label: "NIDN", sortable: true },
          { key: "name", label: "Nama", sortable: true },
          { key: "expertise", label: "Spesialisasi", sortable: true },
          {
            key: "positions",
            label: "Jabatan Terbaru",
            render: (_, row) => (
              <span className="text-sm">{getPositionSummary(row)}</span>
            ),
          },
          {
            key: "positionsCount",
            label: "Total Jabatan",
            render: (_, row) => row.positions.length,
          },
        ]}
        onAdd={
          isDosen
            ? undefined
            : () => router.push(`/dashboard/admin/tambah?role=DOSEN&prodi=${selectedProdi}`)
        }
        onEdit={(item) => router.push(`/dashboard/dosen/${item.id}/ubah`)}
        searchFields={["name", "expertise"]}
      />
    </div>
  );
}
