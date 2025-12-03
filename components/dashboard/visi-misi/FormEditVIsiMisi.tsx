"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { visiMisiData, type VisiMisi } from "@/lib/data";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";

export function FormEditVisiMisi() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // Karena cuma 1 data, kita langsung cek dari constant
  const visiMisi: VisiMisi | null =
    visiMisiData?.id === id ? visiMisiData : null;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<VisiMisi>>(
    visiMisi || { visi: "", misi: "" }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // simulasi delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    router.push("/dashboard/visimisi");
  };

  if (!visiMisi) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">
          Data visi & misi tidak ditemukan
        </p>
      </div>
    );
  }

  const inputClassName =
    "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader
        title="Ubah Visi & Misi"
        description="Perbarui visi dan misi institusi"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Visi <span className="text-destructive">*</span>
          </label>
          <textarea
            name="visi"
            value={formData.visi || ""}
            onChange={handleChange}
            required
            placeholder="Tulis visi institusi..."
            className={inputClassName + " min-h-20"}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Misi <span className="text-destructive">*</span>
          </label>
          <textarea
            name="misi"
            value={formData.misi || ""}
            onChange={handleChange}
            required
            placeholder="Tulis misi institusi..."
            className={inputClassName + " min-h-[120px]"}
          />
        </div>

        <FormButtons isLoading={isLoading} />
      </form>
    </div>
  );
}
