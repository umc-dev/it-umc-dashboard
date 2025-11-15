"use client"

import type React from "react"
import { useState } from "react"
import { Upload } from "lucide-react"

interface ImageUploadProps {
  label: string
  value: string
  onChange: (value: string) => void
  preview?: boolean
  required?: boolean
}

export function ImageUpload({ label, value, onChange, preview = true, required = false }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onChange(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onChange(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 bg-muted/30 hover:bg-muted/50"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          id={`image-upload-${label}`}
          required={required}
        />
        <label htmlFor={`image-upload-${label}`} className="cursor-pointer flex flex-col items-center gap-2">
          <Upload className="w-8 h-8 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Klik atau drag file gambar di sini</p>
            <p className="text-xs text-muted-foreground">PNG, JPG, GIF sampai 10MB</p>
          </div>
        </label>
      </div>

      {/* Image Preview */}
      {preview && value && (
        <div className="mt-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Preview:</p>
          <div className="relative w-32 h-32 bg-muted rounded-lg overflow-hidden border border-border">
            <img src={value || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* URL Input Fallback */}
      {!value && (
        <div className="mt-4">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Atau masukkan URL gambar..."
            className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
        </div>
      )}
    </div>
  )
}
