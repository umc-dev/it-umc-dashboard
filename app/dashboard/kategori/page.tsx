import type { Metadata } from 'next'
import { DashboardKategoriContent } from '@/components/dashboard/kategori/KategoriContent'

export const metadata: Metadata = {
  title: 'Manajemen Kategori - TI CMS',
  description: 'Kelola kategori berita',
}

export default function KategoriPage() {
  return <DashboardKategoriContent />
}
