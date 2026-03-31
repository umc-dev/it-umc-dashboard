import type { Metadata } from 'next'
import { DashboardLectureshipContent } from '@/components/dashboard/lectureships/LectureshipContent'

export const metadata: Metadata = {
  title: 'Manajemen Jabatan Dosen - Sistem Manajemen Konten',
  description: 'Kelola data program studi dan jabatan dosen',
}

export default function LectureshipsPage() {
  return <DashboardLectureshipContent />
}
