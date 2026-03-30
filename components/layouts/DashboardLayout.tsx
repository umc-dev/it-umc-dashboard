"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, FileText, Folder, BookOpen, UserCog, Briefcase ,
  BarChart3, LogOut, Menu, X, Handshake, Goal, GraduationCap, Trophy, Building, Network
} from "lucide-react";
import Image from "next/image";
import { useMe, useLogout } from "@/app/login/queries";
import type { AdminResponse } from "@/app/login/types";

type Role = AdminResponse["role"];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const pathname = usePathname();

  const { data: admin, isLoading: loadingAdmin } = useMe();
  const { mutate: logout } = useLogout();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Dosen", href: "/dashboard/dosen", icon: Users },
    { label: "Jabatan Dosen", href: "/dashboard/lectureships", icon: Briefcase   },
    { label: "Berita", href: "/dashboard/berita", icon: FileText },
    { label: "Kategori Berita", href: "/dashboard/kategori", icon: Folder },
    { label: "Distribusi Mata Kuliah", href: "/dashboard/matakuliah", icon: BookOpen },
    { label: "Statistik Mahasiswa", href: "/dashboard/statistik-mahasiswa", icon: BarChart3 },
    { label: "Testimoni Alumni", href: "/dashboard/alumni", icon: GraduationCap },
    { label: "Prestasi", href: "/dashboard/achievement", icon: Trophy },
    { label: "Kerja Sama", href: "/dashboard/kerja-sama", icon: Handshake },
    { label: "Fasilitas", href: "/dashboard/fasilitas", icon: Building },
    { label: "Visi & Misi", href: "/dashboard/visi-misi", icon: Goal },
    { label: "Struktur Organisasi", href: "/dashboard/struktur-organisasi", icon: Network },
    { label: "Manajemen Pengguna", href: "/dashboard/admin", icon: UserCog },
  ];

  const visibleNavItems = useMemo(() => {
    const role = admin?.role;

    if (!role) return [];

    if (role === "SUPER_ADMIN") {
      return navItems;
    }

    if (role === "EDITOR") {
      return navItems.filter((item) =>
        ["/dashboard/berita", "/dashboard/kategori"].includes(item.href),
      );
    }

    return navItems.filter((item) => item.href !== "/dashboard/admin");
  }, [admin?.role]);

  const handleLogout = () => {
    setShowLogoutDialog(false);
    logout();
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row bg-background">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:relative z-40 flex flex-col bg-sidebar border-r border-sidebar-border h-screen w-64 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Header Sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} className="w-8 h-8 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-sidebar-foreground">Teknik Informatika</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">Universitas Muhammadiyah Cirebon</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-sidebar-accent rounded-lg lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-card border-b border-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-muted rounded-lg lg:hidden">
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold">Admin Panel</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Kelola konten website jurusan</p>
          </div>

          <div className="flex items-center gap-3">
            <Image
              src={admin?.avatar || "/avatar.svg"}
              alt="Avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full shrink-0"
              unoptimized
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium">
                {loadingAdmin ? "Loading..." : admin?.name || "Admin"}
              </p>
              <p className="text-xs text-muted-foreground">{admin?.email || "-"}</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card rounded-lg shadow-lg max-w-sm w-full border border-border">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-bold">Logout?</h2>
              <p className="text-sm text-muted-foreground mt-2">Anda akan keluar dari sistem admin.</p>
            </div>
            <div className="p-6 flex gap-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
