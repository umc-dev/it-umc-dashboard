import type { Metadata } from 'next'
import { FormAddKategori } from '@/components/dashboard/kategori/FormAddKategori'

export const metadata: Metadata = {
  title: 'Tambah Kategori - Sistem Manajemen Konten',
  description: 'Buat kategori berita baru',
}

export default function TambahKategoriPage() {
  return <FormAddKategori />
}
