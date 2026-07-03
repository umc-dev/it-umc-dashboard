export interface AdminResponse {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "DOSEN";
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}