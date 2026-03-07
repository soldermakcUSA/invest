import { AppShell } from "@/components/ui/shell";

export default function AdminUsersPage() {
  return (
    <AppShell eyebrow="Admin users" title="User review queue">
      <div className="rounded-[1.75rem] border border-line bg-[#faf6ef] p-6">
        <p className="max-w-2xl text-sm leading-7 text-ink/66">
          This route is reserved for KYC review, risk profile verification, restriction flags and operator notes.
          Connect Supabase queries and role-protected server actions here next.
        </p>
      </div>
    </AppShell>
  );
}
