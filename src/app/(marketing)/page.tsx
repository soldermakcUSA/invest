import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Wallet, Waves } from "lucide-react";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/utils/mock-data";

const pillars = [
  {
    title: "Internal ledger first",
    description: "Balances are modeled as immutable ledger movements instead of mutable counters.",
    icon: Wallet
  },
  {
    title: "Compliance-aware onboarding",
    description: "The product scaffold already accounts for KYC states, restricted flows and role separation.",
    icon: ShieldCheck
  },
  {
    title: "Dual deposit rails",
    description: "Stripe and Heleket flows are prepared as separate, idempotent payment pipelines.",
    icon: Waves
  }
];

export default function HomePage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <section className="grid gap-8 pb-16 pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-ink/50">Investment operating system</p>
            <h1 className="mt-6 max-w-4xl text-6xl font-semibold leading-[0.95] tracking-[-0.05em] text-ink md:text-8xl">
              Structured capital access with a measured, audit-ready core.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-ink/66">
              Meridiem is the first implementation pass of an investment platform focused on internal balance
              accounting, operator visibility and phased payment integrations.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/dashboard">
                <Button>View Dashboard</Button>
              </Link>
              <Link href="/projects">
                <Button variant="secondary">Browse Projects</Button>
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-line bg-[#183039] p-8 text-white shadow-haze">
            <p className="text-xs uppercase tracking-[0.28em] text-white/48">MVP scope</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Client dashboard", "Balance, positions and deposit history"],
                ["Admin layer", "Project ops, KYC state and transaction review"],
                ["Stripe deposit", "Checkout session plus webhook settlement"],
                ["Crypto deposit", "Invoice flow via Heleket callback model"]
              ].map(([title, description]) => (
                <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/62">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {pillars.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-[1.8rem] border border-line bg-[#fbf7f0] p-6">
              <Icon className="h-5 w-5 text-ember" />
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-ink">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-ink/66">{description}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-[2rem] border border-line bg-[rgba(255,255,255,0.62)] p-8 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-ink/45">Active sleeves</p>
              <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-ink">Initial project catalog</h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-ink/70">
              Full investment universe <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.id} className="rounded-[1.75rem] border border-line bg-mist p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-ink/45">{project.category}</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-ink">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/64">{project.thesis}</p>
                <div className="mt-6 flex items-center justify-between text-sm text-ink/62">
                  <span>{project.targetReturn.toFixed(1)}% target</span>
                  <span>{project.minInvestment} USD minimum</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
