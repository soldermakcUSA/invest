import { AppShell } from "@/components/ui/shell";

export default function AdminTransactionsPage() {
  return (
    <AppShell eyebrow="Admin transactions" title="Payment and ledger monitoring">
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-[1.75rem] border border-line bg-[#faf6ef] p-6">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-ink">Webhook events</h2>
          <p className="mt-4 text-sm leading-7 text-ink/66">
            Stripe and Heleket callbacks should surface here with idempotency state, provider identifiers and ledger outcome.
          </p>
        </article>
        <article className="rounded-[1.75rem] border border-line bg-[#faf6ef] p-6">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-ink">Manual actions</h2>
          <p className="mt-4 text-sm leading-7 text-ink/66">
            Ledger corrections, failure retries and reconciliation notes belong in this workspace once admin mutations are added.
          </p>
        </article>
      </div>
    </AppShell>
  );
}
