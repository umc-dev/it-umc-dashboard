"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { useCreateAccreditation } from "@/app/dashboard/accreditation/queries";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddAccreditation() {
  const router = useRouter();
  const createMutation = useCreateAccreditation();

  const [category, setCategory] = useState<"KAMPUS" | "PRODI">("PRODI");
  const [prodi, setProdi] = useState<"S1" | "D3">("S1");
  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState("Unggul");
  const [skNumber, setSkNumber] = useState("");
  const [skLink, setSkLink] = useState("");
  const [institution, setInstitution] = useState("BAN-PT");
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

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

      await createMutation.mutateAsync(fd);
      toast.success("Akreditasi berhasil ditambahkan!");
      router.push("/dashboard/accreditation");
    } catch (error: unknown) {
      let message = "Gagal membuat data akreditasi.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      toast.error("Terjadi kesalahan!", { description: message });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader
        title="Tambah Akreditasi"
        description="Tambah data akreditasi kampus atau prodi baru"
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
            placeholder="Contoh: Akreditasi Program Studi Teknik Informatika S1"
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
              placeholder="Contoh: Unggul / Baik Sekali / A"
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
              placeholder="Contoh: BAN-PT / LAM INFOKOM"
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
            placeholder="Contoh: 123/SK/BAN-PT/Akred/S/VI/2024"
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
            placeholder="https://..."
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
            File Sertifikat / SK (PDF / Gambar)
          </label>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => setCertificateFile(e.target.files?.[0] || null)}
            className={inputClassName}
          />
        </div>

        <FormButtons isLoading={createMutation.isPending} />
      </form>
    </div>
  );
}
