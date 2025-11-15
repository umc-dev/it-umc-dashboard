// Dummy data for dashboard

export interface Admin {
  id: number
  nama: string
  email: string
  password: string
  avatar: string
}

export interface Kategori {
  id: number
  nama: string
  slug: string
}

export interface Berita {
  id: number
  judul: string
  body: string
  thumbnail: string
  kategori_id: number
  admin_id: number
}

export interface Dosen {
  id: number
  nama: string
  spesialis: string
  link_pengabdian: string
  link_penelitian: string
  link_pengajaran: string
  avatar: string
}

export interface MataKuliah {
  id: number
  semester: number
  pilihan: boolean
  sks: number
  kode: string
}

export interface StatistikMahasiswa {
  id: number
  tahun: number
  total: number
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
]

export const kategoris: Kategori[] = [
  { id: 1, nama: "Pengumuman", slug: "pengumuman" },
  { id: 2, nama: "Berita", slug: "berita" },
  { id: 3, nama: "Event", slug: "event" },
  { id: 4, nama: "Penelitian", slug: "penelitian" },
  { id: 5, nama: "Prestasi", slug: "prestasi" },
]

export const beritas: Berita[] = [
  {
    id: 1,
    judul: "Peluncuran Program Magang 2025",
    body: "Program magang terbuka untuk semua mahasiswa tahun ke-3 dan ke-4...",
    thumbnail: "/internship-office.png",
    kategori_id: 1,
    admin_id: 1,
  },
  {
    id: 2,
    judul: "Workshop Artificial Intelligence",
    body: "Kami dengan bangga mempersembahkan workshop AI yang diisi oleh praktisi industri...",
    thumbnail: "/abstract-ai-network.png",
    kategori_id: 3,
    admin_id: 1,
  },
  {
    id: 3,
    judul: "Mahasiswa Raih Juara Kompetisi Programming",
    body: "Tim programming kami berhasil meraih juara pertama dalam kompetisi nasional...",
    thumbnail: "/programming-concept.png",
    kategori_id: 5,
    admin_id: 2,
  },
]

export const dosens: Dosen[] = [
  {
    id: 1,
    nama: "Dr. Ahmad Kusuma",
    spesialis: "Artificial Intelligence",
    link_pengabdian: "https://example.com/ahmad-pengabdian",
    link_penelitian: "https://example.com/ahmad-penelitian",
    link_pengajaran: "https://example.com/ahmad-pengajaran",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad",
  },
  {
    id: 2,
    nama: "Prof. Siti Nurhaliza",
    spesialis: "Database & System Design",
    link_pengabdian: "https://example.com/siti-pengabdian",
    link_penelitian: "https://example.com/siti-penelitian",
    link_pengajaran: "https://example.com/siti-pengajaran",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=siti",
  },
  {
    id: 3,
    nama: "Ir. Bambang Suryanto",
    spesialis: "Web Development",
    link_pengabdian: "https://example.com/bambang-pengabdian",
    link_penelitian: "https://example.com/bambang-penelitian",
    link_pengajaran: "https://example.com/bambang-pengajaran",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bambang",
  },
]

export const mataKuliahs: MataKuliah[] = [
  { id: 1, semester: 1, pilihan: false, sks: 3, kode: "TI101" },
  { id: 2, semester: 1, pilihan: false, sks: 4, kode: "TI102" },
  { id: 3, semester: 2, pilihan: false, sks: 3, kode: "TI201" },
  { id: 4, semester: 3, pilihan: true, sks: 2, kode: "TI301" },
  { id: 5, semester: 4, pilihan: false, sks: 3, kode: "TI401" },
  { id: 6, semester: 5, pilihan: true, sks: 2, kode: "TI501" },
]

export const statistikMahasiswas: StatistikMahasiswa[] = [
  { id: 1, tahun: 2020, total: 120 },
  { id: 2, tahun: 2021, total: 145 },
  { id: 3, tahun: 2022, total: 168 },
  { id: 4, tahun: 2023, total: 192 },
  { id: 5, tahun: 2024, total: 215 },
  { id: 6, tahun: 2025, total: 240 },
]
