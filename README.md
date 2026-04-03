# IT-UMC Dashboard

Content Management System (CMS) untuk website Program Studi Teknik Informatika, Universitas Muhammadiyah Cirebon.

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** — styling
- **TanStack Query** — server state management
- **React Hook Form + Zod** — form handling & validasi
- **Tiptap** — WYSIWYG editor (konten berita)
- **Recharts** — chart statistik
- **Axios** — HTTP client
- **Sonner** — toast notification

## Fitur

- **Dashboard** — ringkasan statistik & chart
- **Dosen** — CRUD data dosen (NIDN, spesialisasi, avatar, link tri dharma)
- **Jabatan Dosen** — kelola jabatan/lectureship
- **Berita** — CRUD artikel dengan WYSIWYG editor & thumbnail
- **Kategori Berita** — kelola kategori
- **Distribusi Mata Kuliah** — data kurikulum
- **Statistik Mahasiswa** — data mahasiswa masuk & lulus per tahun
- **Testimoni Alumni** — kelola testimoni & video YouTube
- **Prestasi** — data achievement
- **Kerja Sama** — data mitra kerja sama
- **Fasilitas** — data fasilitas kampus
- **Visi & Misi** — edit visi dan misi prodi
- **Struktur Organisasi** — gambar & deskripsi
- **Manajemen Pengguna** — kelola admin (khusus Super Admin)

### Autentikasi

- Login email/password dan Google OAuth (`@umc.ac.id`)
- Role-based access: **Super Admin** (full), **Admin** (tanpa user management), **Editor** (berita & kategori saja)

## Menjalankan Project

### Prasyarat

- Node.js ≥ 18
- Backend API (`it-umc-be`) berjalan di `http://localhost:9090`

### Setup

```bash
npm install
cp .env.example .env
```

Isi `.env`:

```env
NEXT_PUBLIC_API_URL="http://localhost:9090/api/v1"
```

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## Struktur Folder

```
app/
├── login/                      # Halaman login
└── dashboard/                  # Layout + auth guard
    ├── dosen/                  # CRUD Dosen
    ├── lectureships/           # CRUD Jabatan Dosen
    ├── berita/                 # CRUD Berita
    ├── kategori/               # CRUD Kategori
    ├── matakuliah/             # CRUD Mata Kuliah
    ├── statistik-mahasiswa/    # CRUD Statistik
    ├── alumni/                 # CRUD Alumni
    ├── achievement/            # CRUD Prestasi
    ├── kerja-sama/             # CRUD Kerja Sama
    ├── fasilitas/              # CRUD Fasilitas
    ├── visi-misi/              # Edit Visi & Misi
    ├── struktur-organisasi/    # Struktur Organisasi
    └── admin/                  # Manajemen Pengguna
components/
├── layouts/DashboardLayout.tsx # Sidebar + topbar
├── auth/LoginForm.tsx          # Form login
├── dashboard/                  # Komponen per modul
├── DataTable.tsx               # Tabel reusable
├── TiptapEditor.tsx            # WYSIWYG editor
├── ImageUpload.tsx             # Upload gambar
└── DeleteAlert.tsx             # Dialog konfirmasi hapus
lib/
├── api.ts                      # Axios instance
├── getSession.ts               # Server-side session
└── upload.ts                   # Upload helper
providers/
└── QueryProviders.tsx          # TanStack Query provider
```
