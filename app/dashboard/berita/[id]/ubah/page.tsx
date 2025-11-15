import type { Metadata } from 'next'
import { FormUpdateBerita } from '@/components/dashboard/berita/FormUpdateBerita'

export const metadata: Metadata = {
  title: 'Ubah Berita - Sistem Manajemen Konten',
  description: 'Edit data berita di sistem',
}

export default function UbahBeritaPage() {
  return <FormUpdateBerita />
}
