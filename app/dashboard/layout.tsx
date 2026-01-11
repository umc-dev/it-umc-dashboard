
import type React from "react"

import { DashboardLayout } from "@/components/layouts/DashboardLayout"
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = getSession();

  if (!session) {
    redirect("/login");
  }
  return <DashboardLayout>{children}</DashboardLayout>
}
