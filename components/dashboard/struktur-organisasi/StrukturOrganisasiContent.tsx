"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useStrukturOrganisasi } from "@/app/dashboard/struktur-organisasi/queries";

export function StrukturOrganisasiContent() {
  const router = useRouter();
  const [selectedProdi, setSelectedProdi] = useState<"S1" | "D3">("S1");
  const { data, isLoading } = useStrukturOrganisasi(selectedProdi);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manajemen Struktur Organisasi</h1>
          <p className="text-muted-foreground mt-2">Kelola struktur organisasi institusi</p>
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
          {!data && (
            <div className="border border-border rounded-lg p-6 bg-card">
              <p className="text-muted-foreground mb-4">
                Belum ada data struktur organisasi untuk prodi {selectedProdi}.
              </p>
              <button
                onClick={() => router.push(`/dashboard/struktur-organisasi/tambah?prodi=${selectedProdi}`)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
              >
                Tambah Struktur Organisasi
              </button>
            </div>
          )}

          {data && (
            <div className="rounded-lg border border-border p-6 space-y-6 bg-card">
              <div>
                <h2 className="text-xl font-semibold mb-3">Gambar Struktur ({selectedProdi})</h2>
                <div className="relative w-full aspect-video md:aspect-21/9 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                  <Image
                    src={data.image}
                    alt="Struktur Organisasi"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Keterangan</h2>
                <div 
                  className="prose prose-sm dark:prose-invert max-w-none text-foreground"
                  dangerouslySetInnerHTML={{ __html: data.description }} 
                />
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-3">
                <button
                  onClick={() => router.push(`/dashboard/struktur-organisasi/ubah?prodi=${selectedProdi}`)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
                >
                  Ubah Data
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
