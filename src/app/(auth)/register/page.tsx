import Link from "next/link";
import { AuthCard } from "@/components/forms/auth-card";

export default function RegisterPage() {
  return (
    <AuthCard
      title="Open an investor account"
      description="This page will host onboarding, country selection, risk profile and KYC-prep fields once live auth is enabled."
      footer={
        <>
          Already registered? <Link href="/login" className="text-ember">Sign in</Link>
        </>
      }
    >
      <div className="rounded-[1.5rem] border border-line bg-[#faf6ef] p-4 text-sm text-ink/68">
        Current focus is the product shell and domain architecture. Auth forms can now be layered on without restructuring the app.
      </div>
    </AuthCard>
  );
}
