import { MetricCard } from "@/components/dashboard/metric-card";
import { ProjectList } from "@/components/dashboard/project-list";
import { AppShell } from "@/components/ui/shell";
import { portfolioMetrics, transactions } from "@/lib/utils/mock-data";
import { formatCurrency } from "@/lib/utils/format";

export default function DashboardPage() {
  return (
    <AppShell eyebrow="Client workspace" title="Portfolio dashboard">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {portfolioMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-line bg-[#183039] p-6 text-white">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Balance movement</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Phase-one reporting shell</h2>
          <div className="mt-8 grid grid-cols-5 gap-3">
            {[42, 58, 49, 67, 72, 78, 83, 88, 94, 91].map((value, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <div className="w-full rounded-full bg-white/8">
                  <div className="rounded-full bg-[#cf7653]" style={{ height: `${value * 1.4}px` }} />
                </div>
                <span className="text-xs text-white/40">W{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-line bg-[#faf6ef] p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-ink/45">Recent deposits</p>
          <div className="mt-6 space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between rounded-[1.25rem] border border-line px-4 py-4">
                <div>
                  <p className="text-sm font-medium uppercase text-ink">{transaction.provider}</p>
                  <p className="mt-1 text-xs text-ink/48">{transaction.status}</p>
                </div>
                <p className="text-sm text-ink">{formatCurrency(transaction.amount, transaction.currency === "USDT" ? "USD" : transaction.currency)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-ink/45">Allocations</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-ink">Projects open for funding</h2>
          </div>
        </div>
        <ProjectList />
      </section>
    </AppShell>
  );
}
