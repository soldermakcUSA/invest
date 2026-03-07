import { AppShell } from "@/components/ui/shell";
import { transactions } from "@/lib/utils/mock-data";
import { formatCurrency } from "@/lib/utils/format";

export default function DepositsPage() {
  return (
    <AppShell eyebrow="Deposits" title="Funding history">
      <div className="rounded-[1.75rem] border border-line bg-[#faf6ef] p-6">
        <div className="grid gap-4">
          {transactions.map((transaction) => (
            <article key={transaction.id} className="grid gap-3 rounded-[1.5rem] border border-line bg-white px-5 py-5 md:grid-cols-4 md:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Provider</p>
                <p className="mt-2 text-sm text-ink">{transaction.provider}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Amount</p>
                <p className="mt-2 text-sm text-ink">{formatCurrency(transaction.amount, transaction.currency === "USDT" ? "USD" : transaction.currency)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Status</p>
                <p className="mt-2 text-sm capitalize text-ink">{transaction.status}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Reference</p>
                <p className="mt-2 text-sm text-ink/68">{transaction.id}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
