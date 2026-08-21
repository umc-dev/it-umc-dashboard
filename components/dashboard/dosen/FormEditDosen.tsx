"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import {
  useDosenById,
  useUpdateDosen,
  useCreateDosenTridharma,
  useUpdateDosenTridharma,
  useDeleteDosenTridharma,
} from "@/app/dashboard/dosen/queries";
import { useLectureships } from "@/app/dashboard/lectureships/queries";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateDosenSchema } from "@/app/dashboard/dosen/validator";
import {
  UpdateDosenDto,
  UpdateDosenInputDto,
  DosenTridharma,
} from "@/app/dashboard/dosen/types";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";
import { Plus, Trash2, Edit2, ExternalLink, BookOpen, Microscope, Users, Calendar, Link2, FileText, AlignLeft, Sparkles } from "lucide-react";


const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

const TRIDHARMA_CONFIG = {
  PENGAJARAN: {
    category: "PENGAJARAN" as const,
    label: "Pengajaran",
    shortLabel: "Pengajaran",
    icon: BookOpen,
    badgeBg: "bg-muted text-foreground border border-border",
    modalTitleAdd: "Tambah Data Pengajaran",
    modalTitleEdit: "Edit Data Pengajaran",
    helperTip: "Catatan pengampuan mata kuliah, modul praktikum, atau bahan ajar perkuliahan dosen.",
    titleLabel: "Mata Kuliah / Modul / Bahan Ajar",
    titlePlaceholder: "Contoh: Pemrograman Web Lanjut, Modul Praktikum Lab Jaringan Komputer...",
    yearLabel: "Tahun Akademik / Semester",
    yearPlaceholder: "2024",
    linkLabel: "Link Silabus / RPS / Repository",
    linkPlaceholder: "https://... (Link Google Drive, RPS, Classroom, atau repository)",
    descriptionLabel: "Deskripsi Pengajaran & Capaian",
    descriptionPlaceholder: "Keterangan mengenai mata kuliah, target pembelajaran, atau peran pengampu...",
  },
  PENELITIAN: {
    category: "PENELITIAN" as const,
    label: "Penelitian",
    shortLabel: "Penelitian",
    icon: Microscope,
    badgeBg: "bg-muted text-foreground border border-border",
    modalTitleAdd: "Tambah Data Penelitian",
    modalTitleEdit: "Edit Data Penelitian",
    helperTip: "Publikasi jurnal ilmiah, prosiding konferensi, paten, atau hibah riset.",
    titleLabel: "Judul Penelitian / Jurnal / Artikel Ilmiah",
    titlePlaceholder: "Contoh: Penerapan Algoritma Deep Learning Pada Deteksi Anomali Jaringan...",
    yearLabel: "Tahun Publikasi / Terbit",
    yearPlaceholder: "2024",
    linkLabel: "Link DOI / Jurnal / Google Scholar",
    linkPlaceholder: "https://doi.org/... atau https://scholar.google.com/...",
    descriptionLabel: "Abstrak / Ringkasan Penelitian",
    descriptionPlaceholder: "Abstrak ringkas, nama jurnal / penerbit, akreditasi (SINTA/Scopus)...",
  },
  PENGABDIAN: {
    category: "PENGABDIAN" as const,
    label: "Pengabdian Masyarakat",
    shortLabel: "Pengabdian",
    icon: Users,
    badgeBg: "bg-muted text-foreground border border-border",
    modalTitleAdd: "Tambah Data Pengabdian Masyarakat",
    modalTitleEdit: "Edit Data Pengabdian Masyarakat",
    helperTip: "Kegiatan penyuluhan, pelatihan UMKM, pendampingan teknologi, atau pengabdian desa.",
    titleLabel: "Judul Kegiatan Pengabdian",
    titlePlaceholder: "Contoh: Digitalisasi UMKM Batik Cirebon Berbasis E-Commerce Dan SEO...",
    yearLabel: "Tahun Pelaksanaan",
    yearPlaceholder: "2024",
    linkLabel: "Link Dokumentasi / Laporan / Media",
    linkPlaceholder: "https://... (Link dokumentasi kegiatan, berita media, atau laporan)",
    descriptionLabel: "Deskripsi & Dampak Kegiatan",
    descriptionPlaceholder: "Deskripsi sasaran pengabdian, manfaat bagi masyarakat, serta jumlah mitra...",
  },
};

export function FormEditDosen() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const updateDosen = useUpdateDosen();
  const { data: dosen, isLoading: isLoadingDosen } = useDosenById(id);
  const { data: lectureships } = useLectureships();

  const [activeCategory, setActiveCategory] = useState<"PENGAJARAN" | "PENELITIAN" | "PENGABDIAN">("PENGAJARAN");

  const [isTridharmaModalOpen, setIsTridharmaModalOpen] = useState(false);
  const [editingTridharma, setEditingTridharma] = useState<DosenTridharma | null>(null);
  const [isDeleteTridharmaOpen, setIsDeleteTridharmaOpen] = useState(false);
  const [deleteTridharmaId, setDeleteTridharmaId] = useState<number | null>(null);

  const [tridharmaCategory, setTridharmaCategory] = useState<"PENGAJARAN" | "PENELITIAN" | "PENGABDIAN">("PENGAJARAN");
  const [tridharmaTitle, setTridharmaTitle] = useState("");
  const [tridharmaYear, setTridharmaYear] = useState<number>(new Date().getFullYear());
  const [tridharmaDescription, setTridharmaDescription] = useState("");
  const [tridharmaLink, setTridharmaLink] = useState("");
  const [tridharmaSemester, setTridharmaSemester] = useState("-");
  const [tridharmaCredits, setTridharmaCredits] = useState<number>(3);
  const [tridharmaClass, setTridharmaClass] = useState("-");

  const createTridharma = useCreateDosenTridharma();
  const updateTridharma = useUpdateDosenTridharma(id);
  const deleteTridharma = useDeleteDosenTridharma(id);

  const openAddModal = () => {
    setEditingTridharma(null);
    setTridharmaCategory(activeCategory);
    setTridharmaTitle("");
    setTridharmaYear(new Date().getFullYear());
    setTridharmaDescription("");
    setTridharmaLink("");
    setTridharmaSemester("Ganjil 2025/2026");
    setTridharmaCredits(3);
    setTridharmaClass("A");
    setIsTridharmaModalOpen(true);
  };

  const openEditModal = (item: DosenTridharma) => {
    setEditingTridharma(item);
    setTridharmaCategory(item.category);
    setTridharmaTitle(item.title);
    setTridharmaYear(item.year);
    setTridharmaDescription(item.description);
    setTridharmaLink(item.link);
    setTridharmaSemester(item.semester || "-");
    setTridharmaCredits(item.credits ?? 1);
    setTridharmaClass(item.class || "-");
    setIsTridharmaModalOpen(true);
  };

  const handleTridharmaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tridharmaTitle || tridharmaTitle.length < 3 || tridharmaTitle.length > 100) {
      toast.error("Judul harus berukuran 3-100 karakter!");
      return;
    }
    if (!tridharmaYear || tridharmaYear < 2000) {
      toast.error("Tahun harus >= 2000!");
      return;
    }
    if (!tridharmaDescription || tridharmaDescription.length < 3) {
      toast.error("Deskripsi minimal 3 karakter!");
      return;
    }
    try {
      new URL(tridharmaLink);
    } catch {
      toast.error("Link harus berupa URL valid!");
      return;
    }

    try {
      if (editingTridharma) {
        await updateTridharma.mutateAsync({
          id: editingTridharma.id,
          data: {
            dosenId: id,
            category: tridharmaCategory,
            title: tridharmaTitle,
            year: Number(tridharmaYear),
            description: tridharmaDescription,
            link: tridharmaLink,
            semester: tridharmaSemester,
            credits: Number(tridharmaCredits),
            class: tridharmaClass,
          },
        });
        toast.success("Data Tri Dharma berhasil diperbarui!");
      } else {
        await createTridharma.mutateAsync({
          dosenId: id,
          category: tridharmaCategory,
          title: tridharmaTitle,
          year: Number(tridharmaYear),
          description: tridharmaDescription,
          link: tridharmaLink,
          semester: tridharmaSemester,
          credits: Number(tridharmaCredits),
          class: tridharmaClass,
        });
        toast.success("Data Tri Dharma berhasil ditambahkan!");
      }
      setIsTridharmaModalOpen(false);
    } catch (err: any) {
      let msg = "Gagal memproses data Tri Dharma.";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.message || msg;
      }
      toast.error(msg);
    }
  };

  const handleTridharmaDelete = async () => {
    if (!deleteTridharmaId) return;
    try {
      await deleteTridharma.mutateAsync(deleteTridharmaId);
      toast.success("Data Tri Dharma berhasil dihapus!");
      setIsDeleteTridharmaOpen(false);
      setDeleteTridharmaId(null);
    } catch (err: any) {
      let msg = "Gagal menghapus data Tri Dharma.";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.message || msg;
      }
      toast.error(msg);
    }
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<UpdateDosenInputDto, unknown, UpdateDosenDto>({
    resolver: zodResolver(UpdateDosenSchema),
    defaultValues: {
      positions: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "positions",
  });

  useEffect(() => {
    if (dosen) {
      reset({
        prodi: dosen.prodi,
        nidn: dosen.nidn,
        name: dosen.name,
        expertise: dosen.expertise,
        research: dosen.research,
        teaching: dosen.teaching,
        education: dosen.education,
        description: dosen.description,
        positions: dosen.positions.map((position) => ({
          lectureshipId: String(position.lectureship.id),
          startDate: position.startDate.slice(0, 10),
          endDate: position.endDate ? position.endDate.slice(0, 10) : "",
        })),
      });

      replace(
        dosen.positions.map((position) => ({
          lectureshipId: String(position.lectureship.id),
          startDate: position.startDate.slice(0, 10),
          endDate: position.endDate ? position.endDate.slice(0, 10) : "",
        })),
      );
    }
  }, [dosen, replace, reset]);

  const watchedPhoto = useWatch({ control, name: "photo" });
  const photo = useMemo(() => watchedPhoto, [watchedPhoto]);

  const onSubmit = async (data: UpdateDosenDto) => {
    try {
      const fd = new FormData();
      if (data.prodi) fd.append("prodi", data.prodi);
      if (data.nidn) fd.append("nidn", data.nidn);
      if (data.name) fd.append("name", data.name);
      if (data.expertise) fd.append("expertise", data.expertise);
      if (data.research) fd.append("research", data.research);
      if (data.teaching) fd.append("teaching", data.teaching);
      if (data.education !== undefined) fd.append("education", data.education ?? "");
      if (data.description !== undefined) fd.append("description", data.description ?? "");
      if (data.photo) fd.append("photo", data.photo);
      if (data.positions) {
        fd.append("positions", JSON.stringify(data.positions));
      }

      await updateDosen.mutateAsync({ id, data: fd });

      toast.success("Dosen berhasil diperbarui!", {
        description: data.name || dosen?.name,
      });

      router.push("/dashboard/dosen");
    } catch (err: unknown) {
      let message = "Gagal memperbarui dosen.";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }

      toast.error("Terjadi kesalahan!", { description: message });
    }
  };

  if (isLoadingDosen) {
    return <p className="text-center py-10 text-muted-foreground">Loading...</p>;
  }

  if (!dosen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Dosen tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <FormHeader title="Edit Dosen" description="Perbarui data dosen" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Program Studi
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

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            NIDN
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
            Nama Dosen
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
            Spesialisasi
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
            Link Penelitian
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
            Link Pengajaran
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

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Riwayat Pendidikan
          </label>
          <textarea
            {...register("education")}
            className={`${inputClassName} min-h-[100px] resize-y`}
            placeholder="Contoh: S1 Informatika Universitas UMC, S2 Ilmu Komputer UI"
          />
          {errors.education && (
            <p className="text-destructive text-sm">
              {errors.education.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Deskripsi Singkat Dosen
          </label>
          <textarea
            {...register("description")}
            className={`${inputClassName} min-h-[120px] resize-y`}
            placeholder="Masukkan deskripsi singkat tentang profil dosen..."
          />
          {errors.description && (
            <p className="text-destructive text-sm">
              {errors.description.message}
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
                Edit seluruh daftar jabatan dan periode dosen.
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
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-sm text-destructive hover:underline"
                  >
                    Hapus
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Jabatan
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
                      Tanggal Mulai
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
          <label className="block text-sm font-medium text-foreground mb-2">
            Foto Lama
          </label>

          {dosen.photo && (
            <Image
              src={dosen.photo}
              alt="Foto lama"
              width={200}
              height={120}
              className="rounded mb-3"
              unoptimized
            />
          )}

          <ImageUpload
            label="Foto Dosen"
            value={photo ?? null}
            onChange={(value) => setValue("photo", value)}
          />

          {errors.photo && (
            <p className="text-destructive text-sm">{errors.photo.message}</p>
          )}
        </div>

        <FormButtons isLoading={updateDosen.isPending} />
      </form>

      {/* SECTION: TRI DHARMA DOSEN */}
      <div className="mt-10 bg-card border border-border rounded-lg p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Tri Dharma Perguruan Tinggi</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola data akademik/tri-dharma dosen seperti Pengajaran, Penelitian, dan Pengabdian Masyarakat.
          </p>
        </div>

        {/* Tab Header */}
        <div className="flex border-b border-border gap-2 overflow-x-auto pb-1">
          {(["PENGAJARAN", "PENELITIAN", "PENGABDIAN"] as const).map((key) => {
            const cfg = TRIDHARMA_CONFIG[key];
            const Icon = cfg.icon;
            const tridharmas = dosen.dosenTridharmas || [];
            const count = tridharmas.filter((item) => item.category === key).length;
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveCategory(key)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cfg.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-md font-semibold text-foreground">
              Daftar {TRIDHARMA_CONFIG[activeCategory].label}
            </h3>
            <p className="text-xs text-muted-foreground">
              {TRIDHARMA_CONFIG[activeCategory].helperTip}
            </p>
          </div>
          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-sm transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            Tambah Data {TRIDHARMA_CONFIG[activeCategory].shortLabel}
          </button>
        </div>

        {/* Tab Content List */}
        {(dosen.dosenTridharmas || []).filter((item) => item.category === activeCategory).length === 0 ? (
          <div className="text-center py-10 border border-dashed border-border rounded-lg bg-muted/20">
            <p className="text-muted-foreground text-sm font-medium">
              Belum ada data {TRIDHARMA_CONFIG[activeCategory].label.toLowerCase()} untuk dosen ini.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Klik tombol &quot;Tambah Data {TRIDHARMA_CONFIG[activeCategory].shortLabel}&quot; di atas untuk memasukkan data baru.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {(dosen.dosenTridharmas || [])
              .filter((item) => item.category === activeCategory)
              .map((item) => {
                const itemCfg = TRIDHARMA_CONFIG[item.category];
                return (
                  <div
                    key={item.id}
                    className="group border border-border rounded-lg p-4 bg-card hover:border-primary/40 transition-all shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${itemCfg.badgeBg}`}>
                          {itemCfg.shortLabel} &bull; {item.year}
                        </span>
                        {item.category === "PENGAJARAN" && (
                          <>
                            {item.semester && item.semester !== "-" && (
                              <span className="text-xs font-medium px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                                Sem: {item.semester}
                              </span>
                            )}
                            {item.credits && (
                              <span className="text-xs font-medium px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                                {item.credits} SKS
                              </span>
                            )}
                            {item.class && item.class !== "-" && (
                              <span className="text-xs font-medium px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                                Kelas: {item.class}
                              </span>
                            )}
                          </>
                        )}
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
                        >
                          <Link2 className="w-3 h-3" />
                          <span>Link Bukti / Publikasi</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <h4 className="font-semibold text-foreground text-base group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 pr-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="p-2 border border-border hover:border-foreground/20 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteTridharmaId(item.id);
                          setIsDeleteTridharmaOpen(true);
                        }}
                        className="p-2 border border-destructive/20 hover:border-destructive/40 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* MODAL: ADD / EDIT TRI DHARMA */}
      {isTridharmaModalOpen && (() => {
        const activeConfig = TRIDHARMA_CONFIG[tridharmaCategory];
        const CategoryIcon = activeConfig.icon;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-card rounded-xl shadow-2xl max-w-lg w-full border border-border overflow-hidden animate-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/40">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activeConfig.badgeBg}`}>
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      {editingTridharma ? activeConfig.modalTitleEdit : activeConfig.modalTitleAdd}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Form Dinamis Tri Dharma &bull; {activeConfig.label}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTridharmaModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-sm font-semibold px-2 py-1 rounded hover:bg-muted transition-colors"
                >
                  Tutup
                </button>
              </div>

              <form onSubmit={handleTridharmaSubmit} className="p-6 space-y-4">
                {/* Category Switcher inside Modal */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Kategori Tri Dharma <span className="text-destructive">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2 p-1 bg-muted rounded-lg border border-border">
                    {(["PENGAJARAN", "PENELITIAN", "PENGABDIAN"] as const).map((catKey) => {
                      const cfg = TRIDHARMA_CONFIG[catKey];
                      const Icon = cfg.icon;
                      const isSelected = tridharmaCategory === catKey;
                      return (
                        <button
                          key={catKey}
                          type="button"
                          onClick={() => setTridharmaCategory(catKey)}
                          className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-md transition-all ${
                            isSelected
                              ? "bg-background text-foreground shadow-sm border border-border"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{cfg.shortLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Helper Tip Card */}
                <div className="p-3 rounded-lg flex items-start gap-2.5 text-xs bg-muted/60 text-muted-foreground border border-border">
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-foreground/70" />
                  <span>{activeConfig.helperTip}</span>
                </div>

                {/* Title & Year */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{activeConfig.titleLabel}</span>
                      <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={tridharmaTitle}
                      onChange={(e) => setTridharmaTitle(e.target.value)}
                      className={inputClassName}
                      placeholder={activeConfig.titlePlaceholder}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>Tahun</span>
                      <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="number"
                      value={tridharmaYear}
                      onChange={(e) => setTridharmaYear(Number(e.target.value))}
                      className={inputClassName}
                      placeholder={activeConfig.yearPlaceholder}
                      min={2000}
                      required
                    />
                  </div>
                </div>

                {/* Extra PENGAJARAN Fields */}
                {tridharmaCategory === "PENGAJARAN" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-muted/30 rounded-lg border border-border">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Semester <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={tridharmaSemester}
                        onChange={(e) => setTridharmaSemester(e.target.value)}
                        className={inputClassName}
                        placeholder="Ganjil 2025/2026"
                        required={tridharmaCategory === "PENGAJARAN"}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        SKS (Credits) <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={tridharmaCredits}
                        onChange={(e) => setTridharmaCredits(Number(e.target.value))}
                        className={inputClassName}
                        placeholder="3"
                        required={tridharmaCategory === "PENGAJARAN"}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Kelas <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={tridharmaClass}
                        onChange={(e) => setTridharmaClass(e.target.value)}
                        className={inputClassName}
                        placeholder="TI-3A"
                        required={tridharmaCategory === "PENGAJARAN"}
                      />
                    </div>
                  </div>
                )}

                {/* Link Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{activeConfig.linkLabel}</span>
                    <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="url"
                    value={tridharmaLink}
                    onChange={(e) => setTridharmaLink(e.target.value)}
                    className={inputClassName}
                    placeholder={activeConfig.linkPlaceholder}
                    required
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                    <AlignLeft className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{activeConfig.descriptionLabel}</span>
                    <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    value={tridharmaDescription}
                    onChange={(e) => setTridharmaDescription(e.target.value)}
                    className={`${inputClassName} min-h-[100px] resize-y`}
                    placeholder={activeConfig.descriptionPlaceholder}
                    required
                  />
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-border flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsTridharmaModalOpen(false)}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-muted font-medium text-sm text-foreground transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={createTridharma.isPending || updateTridharma.isPending}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium text-sm shadow-sm transition-colors disabled:opacity-50"
                  >
                    {createTridharma.isPending || updateTridharma.isPending ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      })()}

      {/* MODAL: CONFIRM DELETE */}
      {isDeleteTridharmaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card rounded-xl shadow-xl max-w-sm w-full border border-border overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Hapus Data Tri Dharma?</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Tindakan ini permanen dan tidak dapat dibatalkan.
              </p>
            </div>
            <div className="p-6 bg-muted/20 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteTridharmaOpen(false);
                  setDeleteTridharmaId(null);
                }}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted font-medium text-sm text-foreground transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleTridharmaDelete}
                disabled={deleteTridharma.isPending}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 font-medium text-sm shadow-sm transition-colors disabled:opacity-50"
              >
                {deleteTridharma.isPending ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
