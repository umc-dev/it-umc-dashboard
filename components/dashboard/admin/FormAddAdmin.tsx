"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddAdmin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (value: string) => {
    setFormData((prev) => ({ ...prev, avatar: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/dashboard/admin");
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader
        title="Tambah Admin"
        description="Buat akun admin baru untuk mengelola konten"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        <ImageUpload
          label="Foto Profil (Opsional)"
          value={formData.avatar}
          onChange={handleImageChange}
          preview={true}
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Lengkap <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Masukkan nama admin"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@example.com"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Password <span className="text-destructive">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Minimal 6 karakter"
            required
            minLength={6}
            className={inputClassName}
          />
        </div>

        <FormButtons isLoading={isLoading} />
      </form>
    </div>
  );
}