import "server-only"; 
import { cookies } from "next/headers";
import { api } from "@/lib/api";
import type { AdminResponse } from "@/app/login/types";

export async function getSession(): Promise<AdminResponse | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const res = await api.get("/auth/me");
    return res.data.data.admin as AdminResponse;
  } catch (error) {
    console.error("[getSession] Failed to fetch admin data:", error);
    return null;
  }
}