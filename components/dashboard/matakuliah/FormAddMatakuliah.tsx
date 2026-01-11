// app/dashboard/matakuliah/FormAddMatakuliah.tsx
"use client";

import { useRouter } from "next/navigation";
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

export function FormAddMatakuliah() {
  const router = useRouter();
  const createStudy = useCreateStudy();

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateStudyDto>({
    resolver: zodResolver(CreateStudySchema),
    defaultValues: {
      source: undefined as File | undefined, 
    },
  });

  const watchedSource = useWatch({ control, name: "source" });
  const source = useMemo(() => watchedSource, [watchedSource]);

  const onSubmit = async (data: CreateStudyDto) => {
    try {
      const fd = new FormData();

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