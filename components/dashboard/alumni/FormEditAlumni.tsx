"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { alumni, type Alumni } from "@/lib/data";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormEditAlumni() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const alumnus = alumni.find((a) => a.id === id);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Alumni>>(
    alumnus || { name: "", thn_lulus: 0, video: "", messages: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/dashboard/alumni");
  };

  if (!alumnus) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Data alumni tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader
        title="Ubah Alumni"
        description="Perbarui informasi data alumni"
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
            value={formData.name || ""}
            onChange={handleChange}
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
            value={formData.thn_lulus || ""}
            onChange={handleChange}
            required
            min="1900"
            max="2100"
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Link Video
          </label>
          <input
            type="url"
            name="video"
            value={formData.video || ""}
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
            value={formData.messages || ""}
            onChange={handleChange}
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