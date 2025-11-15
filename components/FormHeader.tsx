"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface FormHeaderProps {
  title: string
  description: string
}

export function FormHeader({ title, description }: FormHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex items-center gap-4 mb-8">
      <button
        onClick={() => router.back()}
        className="p-2 hover:bg-muted rounded-lg transition-colors"
        aria-label="Kembali"
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </button>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  )
}
