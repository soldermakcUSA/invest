import { AppShell } from "@/components/ui/shell";

export default function AdminPage() {
  return (
    <AppShell eyebrow="Admin" title="Operations overview">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Users awaiting KYC", "18", "Manual review queue"],
          ["Pending deposits", "4", "Two card, two crypto"],
          ["Projects in draft", "3", "Need launch approval"],
          ["Ledger adjustments", "1", "Requires dual sign-off"]
        ].map(([label, value, detail]) => (
          <article key={label} className="rounded-[1.75rem] border border-line bg-[#faf6ef] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-ink/45">{label}</p>
            <p className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-ink">{value}</p>
            <p className="mt-2 text-sm text-ink/62">{detail}</p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
