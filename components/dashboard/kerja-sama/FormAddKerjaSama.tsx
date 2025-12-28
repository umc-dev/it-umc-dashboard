"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";

export function FormAddKerjaSama() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    namaMitra: "",
    logoUrl: "",
    tahun: "",
    jangkaWaktu: "",
    tanggalMulai: "",
    tanggalBerakhir: "",
    fileDownloadUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    router.push("/dashboard/kerja-sama");
  };

  const inputClassName =
    "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader
        title="Tambah Kerja Sama"
        description="Tambahkan data kerja sama baru ke sistem"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Mitra <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="namaMitra"
            value={formData.namaMitra}
            onChange={handleChange}
            placeholder="Masukkan nama mitra"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            URL Logo <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="logoUrl"
            value={formData.logoUrl}
            onChange={handleChange}
            placeholder="Masukkan URL logo"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tahun <span className="text-destructive">*</span>
          </label>
          <input
            type="number"
            name="tahun"
            value={formData.tahun}
            onChange={handleChange}
            placeholder="Masukkan tahun kerja sama"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Jangka Waktu <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="jangkaWaktu"
            value={formData.jangkaWaktu}
            onChange={handleChange}
            placeholder="Contoh: 2 Tahun"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tanggal Mulai <span className="text-destructive">*</span>
          </label>
          <input
            type="date"
            name="tanggalMulai"
            value={formData.tanggalMulai}
            onChange={handleChange}
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tanggal Berakhir <span className="text-destructive">*</span>
          </label>
          <input
            type="date"
            name="tanggalBerakhir"
            value={formData.tanggalBerakhir}
            onChange={handleChange}
            required
            className={inputClassName}
          />
        </div>

        <FormButtons isLoading={isLoading} />
      </form>
    </div>
  );
}
