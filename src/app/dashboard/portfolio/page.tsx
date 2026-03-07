import { AppShell } from "@/components/ui/shell";
import { getPortfolioSummary } from "@/lib/ledger/summary";
import { formatCurrency, formatPercent } from "@/lib/utils/format";

export default function PortfolioPage() {
  const summary = getPortfolioSummary();

  return (
    <AppShell eyebrow="Portfolio" title="Aggregate performance">
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[1.75rem] border border-line bg-[#183039] p-6 text-white">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Snapshot</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm text-white/54">Invested capital</p>
              <p className="mt-2 text-3xl">{formatCurrency(summary.invested)}</p>
            </div>
            <div>
              <p className="text-sm text-white/54">Current value</p>
              <p className="mt-2 text-3xl">{formatCurrency(summary.currentValue)}</p>
            </div>
            <div>
              <p className="text-sm text-white/54">PnL</p>
              <p className="mt-2 text-3xl">{formatCurrency(summary.pnl)}</p>
            </div>
            <div>
              <p className="text-sm text-white/54">ROI</p>
              <p className="mt-2 text-3xl">{formatPercent(summary.roi)}</p>
            </div>
          </div>
        </article>
        <article className="rounded-[1.75rem] border border-line bg-[#faf6ef] p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-ink/45">Interpretation</p>
          <p className="mt-5 max-w-xl text-base leading-8 text-ink/66">
            This page is where server-calculated aggregates, historical chart points and project distribution views can
            be added next. The current implementation already isolates portfolio math in a dedicated ledger utility.
          </p>
        </article>
      </div>
    </AppShell>
  );
}
