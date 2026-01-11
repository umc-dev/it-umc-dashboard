"use client";

import { useRouter } from "next/navigation";
import { useVisionMissions } from "@/app/dashboard/visi-misi/queries";

export function DashboardVisiMisiContent() {
  const router = useRouter();
  const { data, isLoading } = useVisionMissions();

  // Ambil data pertama (asumsi hanya satu record)
  const visionMission = data?.data[0];

  if (isLoading) {
    return <div className="text-center py-10 text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Visi & Misi</h1>
        <p className="text-muted-foreground mt-2">Kelola visi dan misi institusi</p>
      </div>

      {/* Belum ada data */}
      {!visionMission && (
        <div className="border rounded-lg p-6 bg-card">
          <p className="text-muted-foreground mb-4">
            Belum ada data visi & misi.
          </p>
          <button
            onClick={() => router.push("/dashboard/visi-misi/tambah")}
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
    </div>
  );
}