import type { PortfolioMetric } from "@/types/domain";

export function MetricCard({ label, value, detail, tone = "default" }: PortfolioMetric) {
  return (
    <article
      className={`rounded-[1.75rem] border p-5 ${
        tone === "accent"
          ? "border-[#d78e71] bg-[#fff1e7]"
          : "border-line bg-[#fcfaf6]"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.22em] text-ink/45">{label}</p>
      <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-ink">{value}</p>
      <p className="mt-2 text-sm text-ink/60">{detail}</p>
    </article>
  );
}
