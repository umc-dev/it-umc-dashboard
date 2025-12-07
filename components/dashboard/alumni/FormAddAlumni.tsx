"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddAlumni() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    video: "",
    messages: "",
    thn_lulus: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/dashboard/alumni");
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader
        title="Tambah Alumni"
        description="Tambahkan data alumni baru ke dalam sistem"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Lengkap <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama alumni"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tahun Lulus <span className="text-destructive">*</span>
          </label>
          <input
            type="number"
            name="thn_lulus"
            value={formData.thn_lulus}
            onChange={handleChange}
            placeholder="Contoh: 2020"
            required
            min="1900"
            max="2100"
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Link Video (Opsional)
          </label>
          <input
            type="url"
            name="video"
            value={formData.video}
            onChange={handleChange}
            placeholder="https://youtube.com/..."
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Pesan/Kesan <span className="text-destructive">*</span>
          </label>
          <textarea
            name="messages"
            value={formData.messages}
            onChange={handleChange}
            placeholder="Tuliskan kesan dan pesan alumni..."
            required
            rows={5}
            className={inputClassName}
          />
        </div>

        <FormButtons isLoading={isLoading} />
      </form>
    </div>
  );
}