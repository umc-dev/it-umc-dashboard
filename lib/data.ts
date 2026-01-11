// Dummy data for dashboard

export interface Admin {
  id: string;
  nama: string;
  email: string;
  password: string;
  avatar: string;
}

export interface Kategori {
  id: string;
  nama: string;
  slug: string;
}

export interface Berita {
  id: string;
  judul: string;
  body: string;
  thumbnail: string;
  kategori_id: number;
  admin_id: number;
}

export interface Dosen {
  id: string;
  nama: string;
  spesialis: string;
  link_pengabdian: string;
  link_penelitian: string;
  link_pengajaran: string;
  avatar: string;
}

export interface MataKuliah {
  id: string;
  nama: string;
  semester: number;
  pilihan: boolean;
  sks: number;
  kode: string;
}

export interface StatistikMahasiswa {
  id: string;
  tahun: number;
  masuk: number;
  keluar: number;
  total: number;
}

export interface KerjaSama {
  id: string;
  namaMitra: string;
  logoUrl: string;
  tahun: number;
  jangkaWaktu: string;
  tanggalMulai: string;
  tanggalBerakhir: string;
}

export interface VisiMisi {
  id: string;
  visi: string;
  misi: string;
}

export interface Alumni {
  id: string;
  name: string;
  thn_lulus: number;
  messages?: string;
  video?: string;
}

export const alumni: Alumni[] = [
  {
    id: "1",
    name: "Ahmad Rizki Pratama",
    thn_lulus: 2015,
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    messages:
      "Alhamdulillah bangga menjadi bagian dari SMA Negeri 7 Jakarta. Banyak ilmu dan kenangan indah yang sampai sekarang masih terus dikenang. Semoga sekolah semakin jaya!",
  },
  {
    id: "2",
    name: "Siti Nurhaliza",
    thn_lulus: 2017,
    video: "https://youtu.be/9bZkp7q19f0",
    messages:
      "Guru-guru yang sabar dan teman-teman yang solid membuat masa SMA saya sangat berkesan. Sekarang saya sedang menempuh S2 di Jepang berkat bekal dari sekolah ini.",
  },
  {
    id: "3",
    name: "Muhammad Fajar Siddiq",
    thn_lulus: 2019,
    video: "",
    messages:
      "Meski pandemi datang di kelas 12, tetap bersyukur bisa lulus dengan nilai memuaskan. Terima kasih kepada semua bapak/ibu guru yang tetap mengajar secara daring dengan penuh dedikasi.",
  },
  {
    id: "4",
    name: "Aisyah Putri Ramadhani",
    thn_lulus: 2021,
    video: "https://www.youtube.com/watch?v=ZgQ9v3Q9e9U",
    messages:
      "Dari sini saya belajar pentingnya disiplin dan kerja keras. Kini saya bekerja di salah satu perusahaan unicorn di Indonesia. Sukses selalu untuk adik-adik kelas!",
  },
  {
    id: "5",
    name: "Rendi Kurniawan",
    thn_lulus: 2013,
    video: "",
    messages:
      "Sudah 10 tahun berlalu, tapi kenangan OSIS, pramuka, dan lomba-lomba antar kelas masih terasa seperti kemarin. Semoga sekolah terus melahirkan generasi hebat.",
  },
  {
    id: "6",
    name: "Nadia Lestari",
    thn_lulus: 2023,
    video: "https://youtu.be/X123abc456",
    messages:
      "Baru lulus tahun lalu, sekarang kuliah di UI jurusan Teknik Informatika. Terima kasih atas bimbingan para guru, terutama Bu Wulan dan Pak Budi!",
  },
  {
    id: "7",
    name: "Dr. Hasan Basri, Sp.PD",
    thn_lulus: 2008,
    video: "",
    messages:
      "Dari SMA Negeri 7 sampai menjadi dokter spesialis penyakit dalam. Semua berawal dari sini. Bangga menjadi bagian dari keluarga besar alumni!",
  },
];

export const visiMisiData: VisiMisi = {
  id: "1",
  visi: "Menjadi institusi pendidikan unggul yang berdaya saing global.",
  misi: "1. Mengembangkan kualitas pendidikan.\n2. Meningkatkan kerja sama dengan industri.\n3. Mendorong riset dan inovasi.\n4. Memberikan layanan terbaik kepada masyarakat.",
};

export const admins: Admin[] = [
  {
    id: "1",
    nama: "Admin Utama",
    email: "admin@umc.ac.id",
    password: "password123",
    avatar: "/avatar.svg",
  },
  {
    id: "2",
    nama: "Admin Backup",
    email: "admin.backup@umc.ac.id",
    password: "password456",
    avatar: "/avatar.svg",
  },
];

export const kategoris: Kategori[] = [
  { id: "1", nama: "Pengumuman", slug: "pengumuman" },
  { id: "2", nama: "Berita", slug: "berita" },
  { id: "3", nama: "Event", slug: "event" },
  { id: "4", nama: "Penelitian", slug: "penelitian" },
  { id: "5", nama: "Prestasi", slug: "prestasi" },
];

export const beritas: Berita[] = [
  {
    id: "1",
    judul: "Peluncuran Program Magang 2025",
    body: "Program magang terbuka untuk semua mahasiswa tahun ke-3 dan ke-4...",
    thumbnail: "/internship-office.webp",
    kategori_id: 1,
    admin_id: 1,
  },
  {
    id: "2",
    judul: "Workshop Artificial Intelligence",
    body: "Kami dengan bangga mempersembahkan workshop AI yang diisi oleh praktisi industri...",
    thumbnail: "/abstract-ai-network.webp",
    kategori_id: 3,
    admin_id: 1,
  },
  {
    id: "3",
    judul: "Mahasiswa Raih Juara Kompetisi Programming",
    body: "Tim programming kami berhasil meraih juara pertama dalam kompetisi nasional...",
    thumbnail: "/programming-concept.webp",
    kategori_id: 5,
    admin_id: 2,
  },
];

export const dosens: Dosen[] = [
  {
    id: "1",
    nama: "Dr. Ahmad Kusuma",
    spesialis: "Artificial Intelligence",
    link_pengabdian: "https://example.com/ahmad-pengabdian",
    link_penelitian: "https://example.com/ahmad-penelitian",
    link_pengajaran: "https://example.com/ahmad-pengajaran",
    avatar: "/ahmad.svg",
  },
  {
    id: "2",
    nama: "Prof. Siti Nurhaliza",
    spesialis: "Database & System Design",
    link_pengabdian: "https://example.com/siti-pengabdian",
    link_penelitian: "https://example.com/siti-penelitian",
    link_pengajaran: "https://example.com/siti-pengajaran",
    avatar: "/siti.svg",
  },
  {
    id: "3",
    nama: "Ir. Bambang Suryanto",
    spesialis: "Web Development",
    link_pengabdian: "https://example.com/bambang-pengabdian",
    link_penelitian: "https://example.com/bambang-penelitian",
    link_pengajaran: "https://example.com/bambang-pengajaran",
    avatar: "/bambang.svg",
  },
];

export const mataKuliahs: MataKuliah[] = [
  {
    id: "1",
    nama: "Matematika",
    semester: 1,
    pilihan: false,
    sks: 3,
    kode: "TI101",
  },
  {
    id: "2",
    nama: "Bahasa Inggris",
    semester: 1,
    pilihan: false,
    sks: 4,
    kode: "TI102",
  },
  {
    id: "3",
    nama: "Pemrograman Web",
    semester: 2,
    pilihan: false,
    sks: 3,
    kode: "TI201",
  },
  {
    id: "4",
    nama: "Pemrograman Mobile",
    semester: 3,
    pilihan: true,
    sks: 2,
    kode: "TI301",
  },
  {
    id: "5",
    nama: "Pemrograman Desktop",
    semester: 4,
    pilihan: false,
    sks: 3,
    kode: "TI401",
  },
  {
    id: "6",
    nama: "Pemrograman Game",
    semester: 5,
    pilihan: true,
    sks: 2,
    kode: "TI501",
  },
];

export const kerjaSamaList: KerjaSama[] = [
  {
    id: "1",
    namaMitra: "PT Teknologi Nusantara",
    logoUrl: "/logos/teknologi-nusantara.png",
    tahun: 2023,
    jangkaWaktu: "2 Tahun",
    tanggalMulai: "2023-01-10",
    tanggalBerakhir: "2025-01-10",
  },
  {
    id: "2",
    namaMitra: "SMK Negeri 1 Cirebon",
    logoUrl: "/logos/smk1.png",
    tahun: 2022,
    jangkaWaktu: "3 Tahun",
    tanggalMulai: "2022-08-01",
    tanggalBerakhir: "2025-08-01",
  },
  {
    id: "3",
    namaMitra: "Universitas Budi Luhur",
    logoUrl: "/logos/budi-luhur.png",
    tahun: 2024,
    jangkaWaktu: "1 Tahun",
    tanggalMulai: "2024-03-15",
    tanggalBerakhir: "2025-03-15",
  },
  {
    id: "4",
    namaMitra: "PT Mitra Digital Solusi",
    logoUrl: "/logos/mitra-digital.png",
    tahun: 2021,
    jangkaWaktu: "5 Tahun",
    tanggalMulai: "2021-05-20",
    tanggalBerakhir: "2026-05-20",
  },
  {
    id: "5",
    namaMitra: "Pemerintah Daerah Cirebon",
    logoUrl: "/logos/pemda-cirebon.png",
    tahun: 2020,
    jangkaWaktu: "4 Tahun",
    tanggalMulai: "2020-11-01",
    tanggalBerakhir: "2024-11-01",
  },
];

export const statistikMahasiswas: StatistikMahasiswa[] = [
  { id: "1", tahun: 2020, masuk: 130, keluar: 10, total: 120 },
  { id: "2", tahun: 2021, masuk: 140, keluar: 15, total: 245 },
  { id: "3", tahun: 2022, masuk: 155, keluar: 52, total: 348 },
  { id: "4", tahun: 2023, masuk: 170, keluar: 98, total: 420 },
  { id: "5", tahun: 2024, masuk: 185, keluar: 135, total: 470 },
  { id: "6", tahun: 2025, masuk: 200, keluar: 160, total: 510 },
];
