// Dummy data for dashboard

export interface Admin {
  id: number;
  nama: string;
  email: string;
  password: string;
  avatar: string;
}

export interface Kategori {
  id: number;
  nama: string;
  slug: string;
}

export interface Berita {
  id: number;
  judul: string;
  body: string;
  thumbnail: string;
  kategori_id: number;
  admin_id: number;
}

export interface Dosen {
  id: number;
  nama: string;
  spesialis: string;
  link_pengabdian: string;
  link_penelitian: string;
  link_pengajaran: string;
  avatar: string;
}

export interface MataKuliah {
  id: number;
  nama: string;
  semester: number;
  pilihan: boolean;
  sks: number;
  kode: string;
}

export interface StatistikMahasiswa {
  id: number;
  tahun: number;
  total: number;
}

export interface KerjaSama {
  id: number;
  namaMitra: string;
  logoUrl: string;
  tahun: number;
  jangkaWaktu: string;
  tanggalMulai: string;
  tanggalBerakhir: string;
  fileDownloadUrl: string;
}

export const admins: Admin[] = [
  {
    id: 1,
    nama: "Admin Utama",
    email: "admin@teknik.ac.id",
    password: "password123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin1",
  },
  {
    id: 2,
    nama: "Admin Backup",
    email: "admin.backup@teknik.ac.id",
    password: "password456",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin2",
  },
];

export const kategoris: Kategori[] = [
  { id: 1, nama: "Pengumuman", slug: "pengumuman" },
  { id: 2, nama: "Berita", slug: "berita" },
  { id: 3, nama: "Event", slug: "event" },
  { id: 4, nama: "Penelitian", slug: "penelitian" },
  { id: 5, nama: "Prestasi", slug: "prestasi" },
];

export const beritas: Berita[] = [
  {
    id: 1,
    judul: "Peluncuran Program Magang 2025",
    body: "Program magang terbuka untuk semua mahasiswa tahun ke-3 dan ke-4...",
    thumbnail: "/internship-office.webp",
    kategori_id: 1,
    admin_id: 1,
  },
  {
    id: 2,
    judul: "Workshop Artificial Intelligence",
    body: "Kami dengan bangga mempersembahkan workshop AI yang diisi oleh praktisi industri...",
    thumbnail: "/abstract-ai-network.webp",
    kategori_id: 3,
    admin_id: 1,
  },
  {
    id: 3,
    judul: "Mahasiswa Raih Juara Kompetisi Programming",
    body: "Tim programming kami berhasil meraih juara pertama dalam kompetisi nasional...",
    thumbnail: "/programming-concept.webp",
    kategori_id: 5,
    admin_id: 2,
  },
];

export const dosens: Dosen[] = [
  {
    id: 1,
    nama: "Dr. Ahmad Kusuma",
    spesialis: "Artificial Intelligence",
    link_pengabdian: "https://example.com/ahmad-pengabdian",
    link_penelitian: "https://example.com/ahmad-penelitian",
    link_pengajaran: "https://example.com/ahmad-pengajaran",
    avatar: "/ahmad.svg",
  },
  {
    id: 2,
    nama: "Prof. Siti Nurhaliza",
    spesialis: "Database & System Design",
    link_pengabdian: "https://example.com/siti-pengabdian",
    link_penelitian: "https://example.com/siti-penelitian",
    link_pengajaran: "https://example.com/siti-pengajaran",
    avatar: "/siti.svg",
  },
  {
    id: 3,
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
    id: 1,
    nama: "Matematika",
    semester: 1,
    pilihan: false,
    sks: 3,
    kode: "TI101",
  },
  {
    id: 2,
    nama: "Bahasa Inggris",
    semester: 1,
    pilihan: false,
    sks: 4,
    kode: "TI102",
  },
  {
    id: 3,
    nama: "Pemrograman Web",
    semester: 2,
    pilihan: false,
    sks: 3,
    kode: "TI201",
  },
  {
    id: 4,
    nama: "Pemrograman Mobile",
    semester: 3,
    pilihan: true,
    sks: 2,
    kode: "TI301",
  },
  {
    id: 5,
    nama: "Pemrograman Desktop",
    semester: 4,
    pilihan: false,
    sks: 3,
    kode: "TI401",
  },
  {
    id: 6,
    nama: "Pemrograman Game",
    semester: 5,
    pilihan: true,
    sks: 2,
    kode: "TI501",
  },
];

export const kerjaSamaList: KerjaSama[] = [
  {
    id: 1,
    namaMitra: "PT Teknologi Nusantara",
    logoUrl: "/logos/teknologi-nusantara.png",
    tahun: 2023,
    jangkaWaktu: "2 Tahun",
    tanggalMulai: "2023-01-10",
    tanggalBerakhir: "2025-01-10",
    fileDownloadUrl: "/docs/mou-teknologi-nusantara.pdf",
  },
  {
    id: 2,
    namaMitra: "SMK Negeri 1 Cirebon",
    logoUrl: "/logos/smk1.png",
    tahun: 2022,
    jangkaWaktu: "3 Tahun",
    tanggalMulai: "2022-08-01",
    tanggalBerakhir: "2025-08-01",
    fileDownloadUrl: "/docs/mou-smk1.pdf",
  },
  {
    id: 3,
    namaMitra: "Universitas Budi Luhur",
    logoUrl: "/logos/budi-luhur.png",
    tahun: 2024,
    jangkaWaktu: "1 Tahun",
    tanggalMulai: "2024-03-15",
    tanggalBerakhir: "2025-03-15",
    fileDownloadUrl: "/docs/mou-budi-luhur.pdf",
  },
  {
    id: 4,
    namaMitra: "PT Mitra Digital Solusi",
    logoUrl: "/logos/mitra-digital.png",
    tahun: 2021,
    jangkaWaktu: "5 Tahun",
    tanggalMulai: "2021-05-20",
    tanggalBerakhir: "2026-05-20",
    fileDownloadUrl: "/docs/mou-mitra-digital.pdf",
  },
  {
    id: 5,
    namaMitra: "Pemerintah Daerah Cirebon",
    logoUrl: "/logos/pemda-cirebon.png",
    tahun: 2020,
    jangkaWaktu: "4 Tahun",
    tanggalMulai: "2020-11-01",
    tanggalBerakhir: "2024-11-01",
    fileDownloadUrl: "/docs/mou-pemda.pdf",
  },
];

export const statistikMahasiswas: StatistikMahasiswa[] = [
  { id: 1, tahun: 2020, total: 120 },
  { id: 2, tahun: 2021, total: 145 },
  { id: 3, tahun: 2022, total: 168 },
  { id: 4, tahun: 2023, total: 192 },
  { id: 5, tahun: 2024, total: 215 },
  { id: 6, tahun: 2025, total: 240 },
];
