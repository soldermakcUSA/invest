import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export default function AboutPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
        <p className="text-xs uppercase tracking-[0.28em] text-ink/45">About the build</p>
        <h1 className="mt-4 text-6xl font-semibold tracking-[-0.05em] text-ink">A financial shell built around traceability</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            [
              "Why ledger-first",
              "The platform treats all monetary changes as event records. That makes webhook retries, auditability and future reconciliation flows materially safer."
            ],
            [
              "Why an internal balance MVP",
              "Starting with a controlled ledger and project allocation model is far more realistic than going straight to brokerage or custody workflows."
            ],
            [
              "Why Stripe and Heleket",
              "They represent the two main deposit rails in the guide: card or fiat top-ups, and crypto invoice-based deposits with callback settlement."
            ],
            [
              "What is still scaffolded",
              "Authentication persistence, payment side effects, RLS enforcement and admin workflows are laid out as code structure and stubs, not production-connected flows yet."
            ]
          ].map(([title, copy]) => (
            <article key={title} className="rounded-[1.75rem] border border-line bg-[#fbf7f0] p-6">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-ink">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-ink/66">{copy}</p>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
