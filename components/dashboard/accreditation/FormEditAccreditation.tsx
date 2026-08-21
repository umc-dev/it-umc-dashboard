"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { useAccreditationById, useUpdateAccreditation } from "@/app/dashboard/accreditation/queries";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormEditAccreditation({ id }: { id: string }) {
  const router = useRouter();
  const { data: item, isLoading } = useAccreditationById(id);
  const updateMutation = useUpdateAccreditation();

  const [category, setCategory] = useState<"KAMPUS" | "PRODI">("PRODI");
  const [prodi, setProdi] = useState<"S1" | "D3">("S1");
  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState("");
  const [skNumber, setSkNumber] = useState("");
  const [skLink, setSkLink] = useState("");
  const [institution, setInstitution] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  useEffect(() => {
    if (item) {
      setCategory(item.category);
      if (item.prodi) setProdi(item.prodi);
      setTitle(item.title || "");
      setGrade(item.grade || "");
      setSkNumber(item.skNumber || "");
      setSkLink(item.skLink || "");
      setInstitution(item.institution || "");
      setValidFrom(item.validFrom ? item.validFrom.split("T")[0] : "");
      setValidUntil(item.validUntil ? item.validUntil.split("T")[0] : "");
    }
  }, [item]);

  if (isLoading) return <div className="text-center py-10 text-muted-foreground">Loading....</div>;
  if (!item) return <div className="text-center py-10 text-destructive">Data akreditasi tidak ditemukan.</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !skNumber || !validFrom || !validUntil || !grade) {
      toast.error("Mohon lengkapi semua field yang wajib diisi!");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("category", category);
      if (category === "PRODI") {
        fd.append("prodi", prodi);
      }
      fd.append("title", title);
      fd.append("grade", grade);
      fd.append("skNumber", skNumber);
      if (skLink) fd.append("skLink", skLink);
      if (institution) fd.append("institution", institution);
      fd.append("validFrom", validFrom);
      fd.append("validUntil", validUntil);
      if (certificateFile) {
        fd.append("certificateFile", certificateFile);
      }

      await updateMutation.mutateAsync({ id, data: fd });
      toast.success("Akreditasi berhasil diperbarui!");
      router.push("/dashboard/accreditation");
    } catch (error: unknown) {
      let message = "Gagal mengupdate data akreditasi.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      toast.error("Terjadi kesalahan!", { description: message });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader
        title="Ubah Akreditasi"
        description="Edit data akreditasi kampus atau prodi"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Kategori <span className="text-destructive">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as "KAMPUS" | "PRODI")}
              className={inputClassName}
            >
              <option value="PRODI">Program Studi (PRODI)</option>
              <option value="KAMPUS">Perguruan Tinggi / Kampus</option>
            </select>
          </div>

          {category === "PRODI" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Program Studi <span className="text-destructive">*</span>
              </label>
              <select
                value={prodi}
                onChange={(e) => setProdi(e.target.value as "S1" | "D3")}
                className={inputClassName}
              >
                <option value="S1">S1 Teknik Informatika</option>
                <option value="D3">D3 Teknik Informatika</option>
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Judul Akreditasi <span className="text-destructive">*</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClassName}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Peringkat / Nilai <span className="text-destructive">*</span>
            </label>
            <input
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className={inputClassName}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Lembaga Akreditasi
            </label>
            <input
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nomor SK <span className="text-destructive">*</span>
          </label>
          <input
            value={skNumber}
            onChange={(e) => setSkNumber(e.target.value)}
            className={inputClassName}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Link SK (URL Dokumen Online)
          </label>
          <input
            type="url"
            value={skLink}
            onChange={(e) => setSkLink(e.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Berlaku Mulai <span className="text-destructive">*</span>
            </label>
            <input
              type="date"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              className={inputClassName}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Berlaku Sampai <span className="text-destructive">*</span>
            </label>
            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className={inputClassName}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            File Sertifikat / SK Baru (PDF / Gambar) - opsional
          </label>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => setCertificateFile(e.target.files?.[0] || null)}
            className={inputClassName}
          />
          {item.certificateFile && (
            <p className="text-xs text-muted-foreground mt-1">
              File saat ini: <a href={item.certificateFile} target="_blank" rel="noreferrer" className="text-primary hover:underline">{item.certificateFile}</a>
            </p>
          )}
        </div>

        <FormButtons isLoading={updateMutation.isPending} />
      </form>
    </div>
  );
}
