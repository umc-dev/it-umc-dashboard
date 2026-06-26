"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVisionMissions } from "@/app/dashboard/visi-misi/queries";

export function DashboardVisiMisiContent() {
  const router = useRouter();
  const [selectedProdi, setSelectedProdi] = useState<"S1" | "D3">("S1");
  const { data, isLoading } = useVisionMissions(selectedProdi);

  // Ambil data pertama (asumsi hanya satu record per prodi)
  const visionMission = data?.data[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manajemen Visi & Misi</h1>
          <p className="text-muted-foreground mt-2">Kelola visi dan misi institusi</p>
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

      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground">Loading...</div>
      ) : (
        <>
          {/* Belum ada data */}
          {!visionMission && (
            <div className="border rounded-lg p-6 bg-card">
              <p className="text-muted-foreground mb-4">
                Belum ada data visi & misi untuk prodi {selectedProdi}.
              </p>
              <button
                onClick={() => router.push(`/dashboard/visi-misi/tambah?prodi=${selectedProdi}`)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
              >
                Tambah Visi & Misi
              </button>
            </div>
          )}

          {/* Sudah ada data */}
          {visionMission && (
            <div className="rounded-lg border p-6 space-y-6 bg-card">
              <div>
                <h2 className="text-xl font-semibold mb-2">Visi</h2>
                <p className="text-foreground whitespace-pre-line">{visionMission.vision}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Misi</h2>
                <p className="text-foreground whitespace-pre-line">{visionMission.mission}</p>
              </div>

              <button
                onClick={() => router.push(`/dashboard/visi-misi/${visionMission.id}/ubah`)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
              >
                Edit
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}