import type { Metadata } from 'next'
import { FormAddBerita } from '@/components/dashboard/berita/FormAddBerita'

export const metadata: Metadata = {
  title: 'Tambah Berita - Sistem Manajemen Konten',
  description: 'Buat berita baru di sistem',
}

export default function TambahBeritaPage() {
  return <FormAddBerita />
}
