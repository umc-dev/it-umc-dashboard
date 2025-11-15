import Image from "next/image"

export function LoginBranding() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary to-primary/80 flex-col justify-between p-12 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={64}
            height={64}
            className="w-16 h-16"
            />
          <div>
            <h1 className="text-4xl font-bold">Teknik Informatika</h1>
            <p className="text-lg text-white/90">Universitas Muhammadiyah Cirebon</p>
          </div>
        </div>
        <p className="text-xl text-white/90 mb-8">Sistem Manajemen Konten</p>
      </div>

      <div className="relative z-10">
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center shrink-0 mt-1">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Kelola Konten</h3>
              <p className="text-white/80">Atur berita, dosen, dan mata kuliah dengan mudah</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center shrink-0 mt-1">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Dashboard Analitik</h3>
              <p className="text-white/80">Monitor statistik mahasiswa dan performa real-time</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-white/60">© 2025 Universitas Muhammadiyah Cirebon</p>
      </div>
    </div>
  )
}
