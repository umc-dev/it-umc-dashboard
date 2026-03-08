export interface AdminResponse {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR";
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}