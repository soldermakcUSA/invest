import { AppShell } from "@/components/ui/shell";
import { investments } from "@/lib/utils/mock-data";
import { formatCurrency, formatPercent } from "@/lib/utils/format";

export default function InvestmentsPage() {
  return (
    <AppShell eyebrow="Investments" title="Open positions">
      <div className="grid gap-4">
        {investments.map((investment) => (
          <article key={investment.id} className="rounded-[1.75rem] border border-line bg-[#faf6ef] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-ink/45">{investment.status}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink">{investment.projectTitle}</h2>
              </div>
              <p className="text-lg text-ink">{formatPercent(investment.roiPercent)}</p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Allocated</p>
                <p className="mt-2 text-sm text-ink">{formatCurrency(investment.amountAllocated)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Current value</p>
                <p className="mt-2 text-sm text-ink">{formatCurrency(investment.currentValue)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Position ID</p>
                <p className="mt-2 text-sm text-ink/68">{investment.id}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
