import { AppShell } from "@/components/ui/shell";

export default function SettingsPage() {
  return (
    <AppShell eyebrow="Settings" title="Profile and controls">
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["Profile", "Country, preferred currency, investor profile and contact data."],
          ["Compliance", "KYC status, accreditation flags and restricted actions."],
          ["Security", "Password recovery, session management and alerts."],
          ["Notifications", "Deposit confirmations, project updates and admin outreach."]
        ].map(([title, copy]) => (
          <article key={title} className="rounded-[1.75rem] border border-line bg-[#faf6ef] p-6">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-ink">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-ink/66">{copy}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
