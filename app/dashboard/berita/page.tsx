import type { Metadata } from 'next'
import { DashboardBeritaContent } from '@/components/dashboard/berita/BeritaContent'

export const metadata: Metadata = {
  title: 'Manajemen Berita - Sistem Manajemen Konten',
  description: 'Kelola berita dan pengumuman',
}

export default function BeritaPage() {
  return <DashboardBeritaContent />
}
