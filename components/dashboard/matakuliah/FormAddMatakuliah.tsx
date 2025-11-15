'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormHeader } from '@/components/FormHeader'
import { FormButtons } from '@/components/FormButtons'

export function FormAddMatakuliah() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ semester: '', kode: '', nama: '', sks: '', pilihan: false })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push('/dashboard/matakuliah')
  }

  const inputClassName = 'w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors'

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader title="Tambah Mata Kuliah" description="Tambahkan mata kuliah baru ke sistem" />
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Semester <span className="text-destructive">*</span></label>
          <select name="semester" value={formData.semester} onChange={handleChange} required className={inputClassName}>
            <option value="">Pilih Semester</option>
            {Array.from({ length: 8 }, (_, i) => (
              <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Kode Mata Kuliah <span className="text-destructive">*</span></label>
          <input type="text" name="kode" value={formData.kode} onChange={handleChange} placeholder="Masukkan kode mata kuliah" required className={inputClassName} />
        </div>
        <div>
            <label className="block text-sm font-medium text-foreground mb-2">Nama Mata Kuliah <span className="text-destructive">*</span></label>
            <input type="text" name="nama" value={formData.nama} onChange={handleChange} placeholder="Masukkan nama mata kuliah" required className={inputClassName} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">SKS <span className="text-destructive">*</span></label>
          <input type="number" name="sks" value={formData.sks} onChange={handleChange} placeholder="Masukkan jumlah SKS" min="1" max="6" required className={inputClassName} />
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" name="pilihan" checked={formData.pilihan} onChange={handleChange} className="w-4 h-4 border border-border rounded accent-primary cursor-pointer" />
          <label className="text-sm font-medium text-foreground cursor-pointer">Mata Kuliah Pilihan</label>
        </div>
        <FormButtons isLoading={isLoading} />
      </form>
    </div>
  )
}
