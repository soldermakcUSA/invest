import Link from "next/link";
import { AuthCard } from "@/components/forms/auth-card";

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Use Supabase email authentication here once environment variables and project settings are connected."
      footer={
        <>
          No account yet? <Link href="/register" className="text-ember">Create one</Link>
        </>
      }
    >
      <div className="rounded-[1.5rem] border border-line bg-[#faf6ef] p-4 text-sm text-ink/68">
        Email/password form intentionally omitted for now. The auth shell is in place for Supabase SSR wiring.
      </div>
    </AuthCard>
  );
}
