import Link from "next/link";
import { AuthCard } from "@/components/forms/auth-card";

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset access"
      description="Supabase recovery flow belongs here. The page already exists in the route map so recovery can be wired later without revisiting navigation."
      footer={
        <>
          Return to <Link href="/login" className="text-ember">sign in</Link>
        </>
      }
    >
      <div className="rounded-[1.5rem] border border-line bg-[#faf6ef] p-4 text-sm text-ink/68">
        Password recovery is not wired yet.
      </div>
    </AuthCard>
  );
}
