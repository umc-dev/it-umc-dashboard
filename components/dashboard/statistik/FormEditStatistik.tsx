'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { statistikMahasiswas, type StatistikMahasiswa } from '@/lib/data'
import { FormHeader } from '@/components/FormHeader'
import { FormButtons } from '@/components/FormButtons'

export function FormEditStatistik() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const statistik = statistikMahasiswas.find((s) => s.id === id)

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<StatistikMahasiswa>>(
    statistik || { tahun: new Date().getFullYear(), total: 0 },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'tahun' ? Number(value) : Number(value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push('/dashboard/statistik')
  }

  if (!statistik) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Statistik tidak ditemukan</p>
      </div>
    )
  }

  const inputClassName = 'w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors'

  return (
    <div className="max-w-2xl mx-auto py-6">
      <FormHeader title="Ubah Statistik" description="Ubah data statistik mahasiswa yang ada" />
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Tahun <span className="text-destructive">*</span></label>
          <input type="number" name="tahun" value={formData.tahun || ''} onChange={handleChange} placeholder="Masukkan tahun" min="2000" max={new Date().getFullYear() + 10} required className={inputClassName} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Mahasiswa Masuk <span className="text-destructive">*</span></label>
          <input type="number" name="masuk" value={formData.masuk || ''} onChange={handleChange} placeholder="Masukkan jumlah mahasiswa masuk" min="0" required className={inputClassName} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Mahasiswa Keluar <span className="text-destructive">*</span></label>
          <input type="number" name="keluar" value={formData.keluar || ''} onChange={handleChange} placeholder="Masukkan jumlah mahasiswa keluar" min="0" required className={inputClassName} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Total Mahasiswa <span className="text-destructive">*</span></label>
          <input type="number" name="total" value={formData.total || ''} onChange={handleChange} placeholder="Masukkan total mahasiswa" min="0" required className={inputClassName} />
        </div>
        <FormButtons isLoading={isLoading} />
      </form>
    </div>
  )
}
