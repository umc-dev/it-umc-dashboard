"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { PdfUpload } from "@/components/PdfUpload";
import { useCreateStudy } from "@/app/dashboard/matakuliah/queries";
import { CreateStudyDto } from "@/app/dashboard/matakuliah/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateStudySchema } from "@/app/dashboard/matakuliah/validator";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useMemo } from "react";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddMatakuliah() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createStudy = useCreateStudy();

  const defaultProdi = (searchParams.get("prodi") as "S1" | "D3") || "S1";

  const {
    handleSubmit,
    setValue,
    control,
    register,
    formState: { errors },
  } = useForm<CreateStudyDto>({
    resolver: zodResolver(CreateStudySchema),
    defaultValues: {
      prodi: defaultProdi,
      source: undefined as File | undefined, 
    },
  });

  const watchedSource = useWatch({ control, name: "source" });
  const source = useMemo(() => watchedSource, [watchedSource]);

  const onSubmit = async (data: CreateStudyDto) => {
    try {
      const fd = new FormData();

      fd.append("prodi", data.prodi);
      fd.append("source", data.source);

      await createStudy.mutateAsync(fd);

      toast.success("Dokumen berhasil dibuat!");
      router.push("/dashboard/matakuliah");
    } catch (error: unknown) {
      let message = "Gagal membuat dokumen.";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      toast.error("Terjadi kesalahan!", {
        description: message,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader
        title="Tambah Dokumen Mata Kuliah"
        description="Tambahkan dokumen baru ke sistem"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Program Studi <span className="text-destructive">*</span>
          </label>
          <select
            {...register("prodi")}
            className={inputClassName}
          >
            <option value="S1">S1 Teknik Informatika</option>
            <option value="D3">D3 Teknik Informatika</option>
          </select>
          {errors.prodi && (
            <p className="text-destructive text-sm">{errors.prodi.message}</p>
          )}
        </div>
        <PdfUpload
          label="Dokumen PDF"
          value={source ?? null} 
          onChange={(file) => {
            if (file) {
              setValue("source", file, { shouldValidate: true });
            } else {
              setValue("source", undefined as unknown as File, { shouldValidate: true });
            }
          }}
          required
        />

        {errors.source && (
          <p className="text-destructive text-sm">{errors.source.message}</p>
        )}

        <FormButtons isLoading={createStudy.isPending} />
      </form>
    </div>
  );
}