"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, FileText, Folder, BookOpen, BarChart3, LogOut, Menu, X } from 'lucide-react'
import Image from "next/image"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Dosen", href: "/dashboard/dosen", icon: Users },
    { label: "Berita", href: "/dashboard/berita", icon: FileText },
    { label: "Kategori", href: "/dashboard/kategori", icon: Folder },
    { label: "Mata Kuliah", href: "/dashboard/matakuliah", icon: BookOpen },
    { label: "Statistik Mahasiswa", href: "/dashboard/statistik", icon: BarChart3 },
  ]

  const handleNavClick = () => {
    const isDesktop = window.innerWidth >= 1024
    if (!isDesktop) {
      setSidebarOpen(false)
    }
  }

  const handleLogout = () => {
    setShowLogoutDialog(false)
    window.location.href = "/login"
  }

  return (
    <div className="flex h-screen flex-col lg:flex-row bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-40 flex flex-col bg-sidebar border-r border-sidebar-border h-screen w-64 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Image
              src="/logo.svg" 
              alt="Logo" 
              className="w-8 h-8 shrink-0"
              width={32}
              height={32}
              />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-sidebar-foreground leading-tight">Teknik Informatika</p>
              <p className="text-xs text-sidebar-foreground/70 leading-tight truncate">Universitas Muhammadiyah Cirebon</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors lg:hidden shrink-0"
            aria-label="Toggle sidebar"
          >
            <X className="w-5 h-5 text-sidebar-foreground" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-200"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="bg-card border-b border-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Admin Panel</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Kelola konten website jurusan</p>
          </div>

          <div className="flex items-center gap-3">
            <Image
              src="avatar.svg"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full shrink-0"
              width={40}
              height={40}
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">Admin Utama</p>
              <p className="text-xs text-muted-foreground">admin@umc.ac.id</p>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </div>
      </div>

      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card rounded-lg shadow-lg max-w-sm w-full border border-border">
            {/* Header */}
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Logout?</h2>
              <p className="text-sm text-muted-foreground mt-2">Anda akan keluar dari sistem admin. Lanjutkan?</p>
            </div>

            {/* Actions */}
            <div className="p-6 flex gap-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
