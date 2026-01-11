import Image from "next/image";

export function LoginBranding() {
  return (
    // Container: justify-between akan melempar konten ke ATAS dan ke BAWAH (tengah kosong)
    <div className="hidden lg:flex lg:w-1/2 flex-col justify-between relative overflow-hidden bg-login bg-cover bg-center">
      {/* 1. CINEMATIC GRADIENT OVERLAY */}
      {/* Ini kuncinya: Atas gelap, Tengah bening, Bawah gelap. Gambar di tengah tidak tertutup warna hitam. */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-transparent to-black/80 z-0" />

      {/* 2. HEADER (POJOK KIRI ATAS) */}
      <div className="relative z-10 p-12">
        <div className="flex items-center gap-4">
          {/* Logo tanpa background kotak, biar menyatu dengan alam/gambar */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />{" "}
            {/* Glow halus di belakang logo */}
            <Image
              src="/logo.svg"
              alt="Logo UMC"
              width={64}
              height={64}
              className="w-14 h-14 relative drop-shadow-md"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg tracking-wide">
              Teknik Informatika
            </h1>
            <p className="text-sm font-medium text-white/80 drop-shadow-md">
              Universitas Muhammadiyah Cirebon
            </p>
          </div>
        </div>
      </div>

      {/* 3. FOOTER INFO (POJOK KIRI BAWAH) */}
      <div className="relative z-10 p-12">
        {/* Garis aksen kecil */}
        <div className="w-12 h-1 bg-cyan-500 mb-6 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />

        <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg leading-tight">
          Sistem Manajemen <br /> Konten
        </h2>

        <div className="flex items-center justify-between mt-6 border-t border-white/20 pt-6">
          <p className="text-sm text-white/60 font-light">
            © 2025 Universitas Muhammadiyah Cirebon
          </p>
          {/* Indikator visual kecil bahwa ini area aman/resmi */}
          <div className="text-xs text-white/40 tracking-widest uppercase border border-white/20 px-3 py-1 rounded-full">
            Secure Access
          </div>
        </div>
      </div>
    </div>
  );
}
