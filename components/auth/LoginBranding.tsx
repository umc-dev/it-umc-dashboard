import Image from "next/image";
import { BookOpen } from "lucide-react";

export function LoginBranding() {
  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white relative overflow-hidden bg-login">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Blur orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl" />

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <Image src="/logo.svg" alt="Logo UMC" width={64} height={64} className="w-16 h-16" />
          <div>
            <h1 className="text-4xl font-bold">Teknik Informatika</h1>
            <p className="text-lg text-white/90">Universitas Muhammadiyah Cirebon</p>
          </div>
        </div>
        <p className="text-xl text-white/90 mb-8">Sistem Manajemen Konten</p>
      </div>

      {/* Penjelasan Utama */}
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center shrink-0 mt-1">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Kelola Konten Website</h3>
            <p className="text-white/80">
              Sistem ini digunakan untuk mengatur berita, profil dosen, mata kuliah, dan semua konten pada website Prodi Teknik Informatika Universitas Muhammadiyah Cirebon.
            </p>
          </div>
        </div>

        <p className="text-sm text-white/60">© 2025 Universitas Muhammadiyah Cirebon</p>
      </div>
    </div>
  );
}