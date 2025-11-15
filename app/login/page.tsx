
import type { Metadata } from "next"
import { LoginBranding } from "@/components/auth/LoginBranding"
import { LoginForm } from "@/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "Login - Sistem Manajemen Konten Teknik Informatika",
  description: "Masuk ke Sistem Manajemen Konten Teknik Informatika",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-linear-to-br from-background via-background to-muted">
      <LoginBranding />
      <LoginForm />
    </div>
  )
}
