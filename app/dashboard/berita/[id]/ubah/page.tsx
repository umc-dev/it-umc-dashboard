import type { Metadata } from 'next'
import { FormEditBerita } from '@/components/dashboard/berita/FormEditBerita'

export const metadata: Metadata = {
  title: 'Ubah Berita - Sistem Manajemen Konten',
  description: 'Edit data berita di sistem',
}

export default function UbahBeritaPage() {
  return <FormEditBerita />
}
