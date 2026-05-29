"use client";

import { useState, useEffect } from "react";
import { FormHeader } from "@/components/FormHeader";
import {
  useChatbotFiles,
  useUploadChatbotFile,
  useDeleteChatbotFile,
  useChatbotContext,
  useUpdateChatbotContext,
} from "@/app/dashboard/chatbot-files/queries";
import { ChatbotFile } from "@/app/dashboard/chatbot-files/types";
import {
  FileText,
  Trash2,
  Eye,
  Download,
  Search,
  Upload,
  AlertCircle,
  Clock,
  ExternalLink,
  Bot,
  Edit3,
  AlertTriangle,
  Save,
  Info
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export function ChatbotFilesContent() {
  const { data: files, isLoading: loadingFiles, isError: filesError } = useChatbotFiles();
  const uploadMutation = useUploadChatbotFile();
  const deleteMutation = useDeleteChatbotFile();

  // Manual Context queries
  const { data: chatbotContext, isLoading: loadingContext, isError: contextError } = useChatbotContext("pmb");
  const updateContextMutation = useUpdateChatbotContext();

  const [contextType, setContextType] = useState<"manual" | "file">("manual");
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [manualContext, setManualContext] = useState("");
  const [search, setSearch] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileForPreview, setSelectedFileForPreview] = useState<ChatbotFile | null>(null);
  const [fileToDelete, setFileToDelete] = useState<ChatbotFile | null>(null);

  // Sync manual context when loaded
  useEffect(() => {
    if (chatbotContext?.context) {
      setManualContext(chatbotContext.context);
    }
  }, [chatbotContext]);

  // Tab change handler
  const handleTabChange = (type: "manual" | "file") => {
    if (type === "file") {
      setShowWarningModal(true);
    } else {
      setContextType("manual");
    }
  };

  const confirmSwitchToFile = () => {
    setContextType("file");
    setShowWarningModal(false);
  };

  // Manual Context Save Handler
  const handleSaveManualContext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualContext.trim()) {
      toast.error("Instruksi konteks manual tidak boleh kosong.");
      return;
    }

    try {
      await toast.promise(
        updateContextMutation.mutateAsync({
          name: "pmb",
          context: manualContext,
        }),
        {
          loading: "Menyimpan konteks chatbot...",
          success: "Konteks manual berhasil diperbarui!",
          error: (err: any) => {
            let msg = "Gagal menyimpan konteks.";
            if (axios.isAxiosError(err)) {
              msg = err.response?.data?.message || msg;
            }
            return msg;
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  // File Upload Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "pdf" && ext !== "xls" && ext !== "xlsx") {
      toast.error("Format tidak didukung! Hanya file PDF (.pdf) atau Excel (.xls, .xlsx) yang diperbolehkan.");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("file", file);

      await toast.promise(uploadMutation.mutateAsync(fd), {
        loading: `Mengunggah & memproses "${file.name}"...`,
        success: `File "${file.name}" berhasil diunggah dan diekstrak!`,
        error: (err: any) => {
          let msg = "Gagal mengunggah file.";
          if (axios.isAxiosError(err)) {
            msg = err.response?.data?.message || msg;
          }
          return msg;
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Handler
  const handleDelete = async () => {
    if (!fileToDelete) return;
    try {
      await toast.promise(deleteMutation.mutateAsync(fileToDelete.id), {
        loading: `Menghapus "${fileToDelete.filename}"...`,
        success: `File "${fileToDelete.filename}" berhasil dihapus!`,
        error: (err: any) => {
          let msg = "Gagal menghapus file.";
          if (axios.isAxiosError(err)) {
            msg = err.response?.data?.message || msg;
          }
          return msg;
        },
      });
      setFileToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered files based on search
  const filteredFiles = (files || []).filter(
    (f) =>
      f.filename.toLowerCase().includes(search.toLowerCase()) ||
      f.content.toLowerCase().includes(search.toLowerCase())
  );

  const formatBytes = (bytes: number = 245000) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <FormHeader
          title="Chatbot Context"
          description="Kelola instruksi dasar dan dokumen tambahan untuk melatih AI Chatbot Anda."
        />
        <div className="flex items-center gap-2 self-start bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-semibold">
          <Bot className="w-4 h-4" />
          <span>Groq LLM Context Sync</span>
        </div>
      </div>

      {/* Modern Context Type Switcher Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => handleTabChange("manual")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all border-b-2 -mb-[2px] ${
            contextType === "manual"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Manual Context (Teks)</span>
        </button>
        <button
          onClick={() => handleTabChange("file")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all border-b-2 -mb-[2px] ${
            contextType === "file"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>File Context (Dokumen)</span>
        </button>
      </div>

      {/* Render based on contextType */}
      {contextType === "manual" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {/* Main Manual Context Form */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-bold text-foreground flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-primary" />
                Instruksi & Kepribadian Asisten Virtual (PMB)
              </h3>
            </div>
            
            {loadingContext ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-4 border-t-primary border-r-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-muted-foreground mt-2">Memuat data konteks...</p>
              </div>
            ) : contextError ? (
              <div className="text-center py-16 border border-border rounded-xl bg-destructive/5 text-destructive">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-semibold">Gagal memuat data konteks manual</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Silakan hubungi administrator atau refresh halaman.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSaveManualContext} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="context" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Sistem Prompt & Aturan Respon
                  </label>
                  <textarea
                    id="context"
                    value={manualContext}
                    onChange={(e) => setManualContext(e.target.value)}
                    placeholder="Tulis instruksi dasar untuk asisten virtual di sini..."
                    className="w-full h-[320px] p-4 border border-border rounded-xl bg-muted/10 text-foreground font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring focus:bg-card transition-all"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={updateContextMutation.isPending}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/95 transition-colors disabled:opacity-50 text-sm shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>{updateContextMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Quick Guide and Status */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h3 className="text-md font-bold text-foreground flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                Petunjuk Penulisan
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Konteks manual mendefinisikan kepribadian, gaya bicara, dan batasan asisten AI.
              </p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <strong className="text-foreground block mb-1">🎭 Tentukan Peran</strong>
                  Contoh: &quot;Kamu adalah asisten resmi PMB Universitas Muhammadiyah Cirebon yang ramah.&quot;
                </div>
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <strong className="text-foreground block mb-1">📌 Tambah Informasi Statis</strong>
                  Berikan rincian penting seperti nomor kontak, alamat pendaftaran, dan email resmi.
                </div>
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <strong className="text-foreground block mb-1">🛑 Aturan & Batasan</strong>
                  Sebutkan hal yang tidak boleh dijawab, misalnya &quot;Jangan memberikan asumsi harga jika tidak tertera di data.&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {/* Upload Panel */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4 h-fit">
            <h3 className="text-md font-bold text-foreground flex items-center gap-2">
              <Upload className="w-4 h-4 text-primary" />
              Unggah Dokumen Baru
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sistem secara otomatis akan mengekstrak semua isi teks dari file yang Anda unggah dan menjadikannya referensi jawaban chatbot.
            </p>

            <form
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                dragActive
                  ? "border-primary bg-primary/5 scale-[0.99]"
                  : "border-border hover:border-foreground/20 bg-muted/20"
              }`}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.xls,.xlsx"
                onChange={handleFileChange}
                disabled={uploadMutation.isPending}
              />
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Upload className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Tarik & lepas file Anda di sini
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    atau klik untuk memilih file dari komputer
                  </p>
                </div>
                <div className="pt-2 flex justify-center gap-1.5 flex-wrap">
                  <span className="text-[10px] bg-secondary text-secondary-foreground font-bold px-2 py-0.5 rounded">
                    PDF
                  </span>
                  <span className="text-[10px] bg-secondary text-secondary-foreground font-bold px-2 py-0.5 rounded">
                    EXCEL (.xlsx, .xls)
                  </span>
                </div>
              </div>
            </form>

            <div className="bg-muted/50 rounded-lg p-3 border border-border flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                <strong>Catatan:</strong> Pastikan format tabel terstruktur dengan rapi untuk Excel agar hasil ekstraksi teks optimal.
              </p>
            </div>
          </div>

          {/* List Files Panel */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-md font-bold text-foreground">
                Dokumen Knowledge Base ({filteredFiles.length})
              </h3>
              {/* Search */}
              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari nama atau konten file..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 border border-border rounded-lg bg-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {loadingFiles ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-4 border-t-primary border-r-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-muted-foreground mt-2">Loading documents...</p>
              </div>
            ) : filesError ? (
              <div className="text-center py-16 border border-border rounded-xl bg-destructive/5 text-destructive">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-semibold">Gagal memuat data dokumen</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Silakan hubungi administrator atau refresh halaman.
                </p>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-xl">
                <FileText className="w-10 h-10 text-muted-foreground/60 mx-auto mb-3" />
                <p className="text-sm font-semibold text-foreground">Tidak ada dokumen</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {search ? "Hasil pencarian tidak ditemukan." : "Mulai dengan mengunggah dokumen PDF atau Excel pertama Anda."}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border border border-border rounded-xl overflow-hidden bg-muted/10">
                {filteredFiles.map((file) => {
                  const isExcel =
                    file.filename.endsWith(".xlsx") || file.filename.endsWith(".xls");
                  return (
                    <div
                      key={file.id}
                      className="p-4 hover:bg-muted/40 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          isExcel ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                        }`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <h4 className="font-semibold text-sm text-foreground truncate" title={file.filename}>
                            {file.filename}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(file.createdAt).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                            <span>•</span>
                            <span>{formatBytes()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                          onClick={() => setSelectedFileForPreview(file)}
                          className="p-2 border border-border hover:border-foreground/20 rounded-lg hover:bg-card text-muted-foreground hover:text-foreground transition-all flex items-center gap-1.5 text-xs font-semibold"
                          title="Lihat Ekstraksi Teks"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Isi Teks</span>
                        </button>
                        <a
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border border-border hover:border-foreground/20 rounded-lg hover:bg-card text-muted-foreground hover:text-foreground transition-all flex items-center gap-1.5 text-xs font-semibold"
                          title="Unduh File"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setFileToDelete(file)}
                          className="p-2 border border-destructive/20 hover:border-destructive/40 rounded-lg hover:bg-destructive/5 text-destructive transition-all"
                          title="Hapus Dokumen"
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
        </div>
      )}

      {/* PREVIEW MODAL */}
      {selectedFileForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card rounded-xl shadow-xl max-w-2xl w-full border border-border flex flex-col h-[80vh] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/30">
              <div className="min-w-0">
                <h2 className="text-base font-bold text-foreground truncate pr-4">
                  {selectedFileForPreview.filename}
                </h2>
                <p className="text-xs text-muted-foreground">Isi teks ter-ekstrak oleh sistem</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFileForPreview(null)}
                className="text-muted-foreground hover:text-foreground text-sm font-semibold px-2.5 py-1 rounded hover:bg-muted"
              >
                Tutup
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-muted/10 font-mono text-xs leading-relaxed whitespace-pre-wrap select-all">
              {selectedFileForPreview.content || "Dokumen kosong / tidak ada teks yang berhasil diekstrak."}
            </div>
            <div className="p-4 border-t border-border bg-card flex justify-between items-center text-xs text-muted-foreground">
              <span>Klik di dalam kolom teks untuk menyalin semua konten.</span>
              <a
                href={selectedFileForPreview.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Unduh File Asli</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card rounded-xl shadow-xl max-w-sm w-full border border-border overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Hapus Dokumen Chatbot?</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Tindakan ini akan menghapus file <strong>{fileToDelete.filename}</strong> secara permanen dari server dan database. AI Chatbot tidak lagi mereferensikan file ini.
              </p>
            </div>
            <div className="p-6 bg-muted/20 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted font-medium text-sm text-foreground transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 font-medium text-sm shadow-sm transition-colors"
              >
                Hapus Permanen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOKEN EXHAUSTION WARNING MODAL */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card rounded-xl shadow-xl max-w-md w-full border border-border overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-500">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Peringatan: Token Limit</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mengaktifkan <strong>File Context (Dokumen)</strong> akan menyebabkan penggunaan token API Groq/LLM Anda membengkak jauh lebih cepat. 
              </p>
              <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/10 text-xs text-amber-600 dark:text-amber-400 space-y-1">
                <p>💡 <strong>Bagaimana cara kerjanya?</strong></p>
                <p>Seluruh teks dari semua dokumen yang diunggah akan dipindai dan dikirimkan ke dalam payload LLM pada setiap kali user mengajukan pertanyaan baru.</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Apakah Anda ingin melanjutkan pengisian konteks berbasis file dokumen?
              </p>
            </div>
            <div className="p-4 bg-muted/20 border-t border-border flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowWarningModal(false)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted font-semibold text-sm text-foreground transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmSwitchToFile}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg text-sm shadow-sm transition-colors animate-pulse"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
