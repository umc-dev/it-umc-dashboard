"use client";

import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import { useCreateDosen } from "@/app/dashboard/dosen/queries";
import { useLectureships } from "@/app/dashboard/lectureships/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDosenSchema } from "@/app/dashboard/dosen/validator";
import {
  CreateDosenDto,
  CreateDosenInputDto,
} from "@/app/dashboard/dosen/types";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useMemo } from "react";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddDosen() {
  const router = useRouter();
  const createDosen = useCreateDosen();
  const { data: lectureships } = useLectureships();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateDosenInputDto, unknown, CreateDosenDto>({
    resolver: zodResolver(CreateDosenSchema),
    defaultValues: {
      photo: null,
      positions: [{ lectureshipId: "", startDate: "", endDate: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "positions",
  });

  const watchedPhoto = useWatch({ control, name: "photo" });
  const photo = useMemo(() => watchedPhoto, [watchedPhoto]);

  const onSubmit = async (data: CreateDosenDto) => {
    try {
      const fd = new FormData();
      fd.append("nidn", data.nidn);
      fd.append("name", data.name);
      fd.append("expertise", data.expertise);
      fd.append("research", data.research);
      fd.append("teaching", data.teaching);

      if (!data.photo) {
        toast.error("Foto wajib diupload");
        return;
      }

      fd.append("photo", data.photo);
      fd.append("positions", JSON.stringify(data.positions));

      await createDosen.mutateAsync(fd);

      toast.success("Dosen berhasil dibuat!", {
        description: data.name,
      });

      router.push("/dashboard/dosen");
    } catch (error: unknown) {
      let message = "Gagal membuat dosen.";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      toast.error("Terjadi kesalahan!", {
        description: message,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <FormHeader
        title="Tambah Dosen"
        description="Buat data dosen beserta riwayat jabatan"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            NIDN <span className="text-destructive">*</span>
          </label>
          <input
            {...register("nidn")}
            className={inputClassName}
            placeholder="Masukkan NIDN dosen"
          />
          {errors.nidn && (
            <p className="text-destructive text-sm">{errors.nidn.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Dosen <span className="text-destructive">*</span>
          </label>
          <input
            {...register("name")}
            className={inputClassName}
            placeholder="Masukkan nama dosen"
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Spesialisasi <span className="text-destructive">*</span>
          </label>
          <input
            {...register("expertise")}
            className={inputClassName}
            placeholder="Masukkan spesialisasi"
          />
          {errors.expertise && (
            <p className="text-destructive text-sm">
              {errors.expertise.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Link Penelitian <span className="text-destructive">*</span>
          </label>
          <input
            type="url"
            {...register("research")}
            className={inputClassName}
            placeholder="https://..."
          />
          {errors.research && (
            <p className="text-destructive text-sm">
              {errors.research.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Link Pengajaran <span className="text-destructive">*</span>
          </label>
          <input
            type="url"
            {...register("teaching")}
            className={inputClassName}
            placeholder="https://..."
          />
          {errors.teaching && (
            <p className="text-destructive text-sm">
              {errors.teaching.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">
                Riwayat Jabatan
              </h3>
              <p className="text-sm text-muted-foreground">
                Tambahkan satu atau lebih jabatan dosen beserta periodenya.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                append({ lectureshipId: "", startDate: "", endDate: "" })
              }
              className="px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted"
            >
              Tambah Jabatan
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border border-border rounded-lg p-4 space-y-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-medium text-foreground">
                    Jabatan #{index + 1}
                  </h4>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-sm text-destructive hover:underline"
                    >
                      Hapus
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Jabatan <span className="text-destructive">*</span>
                  </label>
                  <select
                    {...register(`positions.${index}.lectureshipId`)}
                    className={inputClassName}
                  >
                    <option value="">-- Pilih Jabatan Dosen --</option>
                    {lectureships?.data?.map((lectureship) => (
                      <option key={lectureship.id} value={lectureship.id}>
                        {lectureship.name}
                      </option>
                    ))}
                  </select>
                  {errors.positions?.[index]?.lectureshipId && (
                    <p className="text-destructive text-sm">
                      {errors.positions[index]?.lectureshipId?.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tanggal Mulai <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="date"
                      {...register(`positions.${index}.startDate`)}
                      className={inputClassName}
                    />
                    {errors.positions?.[index]?.startDate && (
                      <p className="text-destructive text-sm">
                        {errors.positions[index]?.startDate?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tanggal Selesai
                    </label>
                    <input
                      type="date"
                      {...register(`positions.${index}.endDate`)}
                      className={inputClassName}
                    />
                    {errors.positions?.[index]?.endDate && (
                      <p className="text-destructive text-sm">
                        {errors.positions[index]?.endDate?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ImageUpload
            label="Foto Dosen"
            value={photo ?? null}
            onChange={(value) => setValue("photo", value)}
            required
          />

          {errors.photo && (
            <p className="text-destructive text-sm">{errors.photo.message}</p>
          )}
        </div>

        <FormButtons isLoading={createDosen.isPending} />
      </form>
    </div>
  );
}
