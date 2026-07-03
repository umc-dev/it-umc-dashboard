import type React from "react"
import { DashboardLayout } from "@/components/layouts/DashboardLayout"
import { AuthGuard } from "@/components/auth/AuthGuard"

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  )
}

