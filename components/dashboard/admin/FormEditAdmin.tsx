"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import { useAdminById, useUpdateAdmin } from "@/app/dashboard/admin/queries";
import { UpdateAdminDto } from "@/app/dashboard/admin/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateAdminSchema } from "@/app/dashboard/admin/validator";
import { useForm, useWatch } from "react-hook-form";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormEditAdmin() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: admin, isLoading } = useAdminById(id);
  const updateAdmin = useUpdateAdmin();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm<UpdateAdminDto>({
    resolver: zodResolver(UpdateAdminSchema),
  });

  useEffect(() => {
    if (admin) {
      reset({
        name: admin.name || "",
        email: admin.email,
        role: admin.role,
      });
    }
  }, [admin, reset]);

  const avatar = useWatch({ control, name: "avatar" }) as File | undefined;

  const onSubmit = async (data: UpdateAdminDto) => {
    try {
      const fd = new FormData();
      if (data.name) fd.append("name", data.name);
      if (data.email) fd.append("email", data.email);
      if (data.password) fd.append("password", data.password);
      if (data.role) fd.append("role", data.role);
      if (avatar instanceof File && avatar.size > 0) {
        fd.append("avatar", avatar);
      }

      if (fd.entries().next().done) {
        toast.info("Tidak ada perubahan");
        return;
      }

      await updateAdmin.mutateAsync({ id, data: fd });
      toast.success("Admin diperbarui!");
      router.push("/dashboard/admin");
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Gagal update"
        : "Terjadi kesalahan";
      toast.error("Gagal!", { description: message });
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (!admin) return <p className="text-center py-10 text-destructive">Admin tidak ditemukan</p>;

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader title="Edit Admin" description="Perbarui data admin" />

      <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Foto Profil Saat Ini</label>
          {admin.avatar ? (
            <Image src={admin.avatar} alt="Avatar" width={128} height={128} className="rounded-full mb-4 object-cover" unoptimized />
          ) : (
            <p className="text-muted-foreground mb-4">Tidak ada foto</p>
          )}

          <ImageUpload
            label="Ganti Foto (Opsional)"
            value={avatar ?? null}
            onChange={(file) => setValue("avatar", file ?? undefined, { shouldValidate: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Nama</label>
          <input {...register("name")} placeholder="Nama" className={inputClassName} defaultValue={admin.name ?? ""} />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input type="email" {...register("email")} className={inputClassName} defaultValue={admin.email} />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password Baru (kosongkan jika tidak ubah)</label>
          <input type="password" {...register("password")} placeholder="Minimal 6 karakter" className={inputClassName} />
          {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <select {...register("role")} className={inputClassName} defaultValue={admin.role}>
            <option value="ADMIN">ADMIN</option>
            <option value="EDITOR">EDITOR</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
          </select>
        </div>

        <FormButtons isLoading={updateAdmin.isPending} />
      </form>
    </div>
  );
}