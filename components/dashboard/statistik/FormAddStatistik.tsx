'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormHeader } from '@/components/FormHeader'
import { FormButtons } from '@/components/FormButtons'

export function FormAddStatistik() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ tahun: new Date().getFullYear(), total: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'tahun' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push('/dashboard/statistik')
  }

  const inputClassName = 'w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors'

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader title="Tambah Statistik" description="Tambahkan data statistik mahasiswa baru" />
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Tahun <span className="text-destructive">*</span></label>
          <input type="number" name="tahun" value={formData.tahun} onChange={handleChange} placeholder="Masukkan tahun" min="2000" max={new Date().getFullYear() + 10} required className={inputClassName} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Total Mahasiswa <span className="text-destructive">*</span></label>
          <input type="number" name="total" value={formData.total} onChange={handleChange} placeholder="Masukkan total mahasiswa" min="0" required className={inputClassName} />
        </div>
        <FormButtons isLoading={isLoading} />
      </form>
    </div>
  )
}
