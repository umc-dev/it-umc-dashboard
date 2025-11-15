'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormHeader } from '@/components/FormHeader'
import { FormButtons } from '@/components/FormButtons'

export function FormAddKategori() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ nama: '', slug: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push('/dashboard/kategori')
  }

  const inputClassName = 'w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors'

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader title="Tambah Kategori" description="Buat kategori berita baru" />
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Nama Kategori <span className="text-destructive">*</span></label>
          <input type="text" name="nama" value={formData.nama} onChange={handleChange} placeholder="Masukkan nama kategori" required className={inputClassName} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Slug <span className="text-destructive">*</span></label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="Masukkan slug (contoh: teknologi)" required className={inputClassName} />
        </div>
        <FormButtons isLoading={isLoading} />
      </form>
    </div>
  )
}
