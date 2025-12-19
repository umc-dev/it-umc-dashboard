import { LoginBranding } from "@/components/auth/LoginBranding";
import { LoginOauth } from "@/components/auth/LoginOauth";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default function LoginPage() {

  const session = getSession();

  if (!session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex h-screen flex-col lg:flex-row overflow-hidden bg-background">
      {/* Kiri: Branding (Tetap, tidak berubah) */}
      <LoginBranding />

      {/* Kanan: Oauth Only */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-white">
        <div className="grow flex items-center justify-center p-4">
          <LoginOauth />
        </div>
      </div>
    </div>
  );
}
