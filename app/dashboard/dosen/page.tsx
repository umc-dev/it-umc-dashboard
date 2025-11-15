import type { Metadata } from 'next'
import { DashboardDosenContent } from '@/components/dashboard/dosen/DosenContent'

export const metadata: Metadata = {
  title: 'Manajemen Dosen - Sistem Manajemen Konten',
  description: 'Kelola data dosen dan spesialisasi mereka',
}

export default function DosenPage() {
  return <DashboardDosenContent />
}
