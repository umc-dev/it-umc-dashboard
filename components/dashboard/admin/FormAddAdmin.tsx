"use client";

import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import { useCreateAdmin } from "@/app/dashboard/admin/queries";
import { CreateAdminDto } from "@/app/dashboard/admin/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAdminSchema } from "@/app/dashboard/admin/validator";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddAdmin() {
  const router = useRouter();
  const createAdmin = useCreateAdmin();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateAdminDto>({
    resolver: zodResolver(CreateAdminSchema),
    defaultValues: {
      role: "ADMIN",
    },
  });

  const avatar = useWatch({ control, name: "avatar" }) as File | undefined;

  const onSubmit = async (data: CreateAdminDto) => {
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("email", data.email);
      fd.append("password", data.password);
      if (data.role) fd.append("role", data.role);

      // Avatar WAJIB → sudah divalidasi Zod, pasti ada
      fd.append("avatar", data.avatar);

      await createAdmin.mutateAsync(fd);

      toast.success("Admin berhasil dibuat!", { description: data.name });
      router.push("/dashboard/admin");
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Gagal membuat admin"
        : "Terjadi kesalahan";
      toast.error("Gagal!", { description: message });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader title="Tambah Admin" description="Buat akun admin baru" />

      <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6">
        {/* AVATAR - WAJIB */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Foto Profil <span className="text-destructive">*</span>
          </label>
          <ImageUpload
            label="Upload foto profil admin"
            value={avatar ?? null}
            onChange={(file) => setValue("avatar", file as File, { shouldValidate: true })}
          />
          {errors.avatar && (
            <p className="mt-1 text-sm text-destructive">{errors.avatar.message}</p>
          )}
        </div>

        {/* NAMA */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Lengkap <span className="text-destructive">*</span>
          </label>
          <input {...register("name")} placeholder="Masukkan nama" className={inputClassName} />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email <span className="text-destructive">*</span>
          </label>
          <input type="email" {...register("email")} placeholder="admin@example.com" className={inputClassName} />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Password <span className="text-destructive">*</span>
          </label>
          <input type="password" {...register("password")} placeholder="Minimal 6 karakter" className={inputClassName} />
          {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>}
        </div>

        {/* ROLE */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Role</label>
          <select {...register("role")} className={inputClassName} defaultValue="ADMIN">
            <option value="ADMIN">ADMIN</option>
            <option value="EDITOR">EDITOR</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
          </select>
        </div>

        <FormButtons isLoading={createAdmin.isPending} />
      </form>
    </div>
  );
}