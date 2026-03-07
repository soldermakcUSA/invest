import type { PropsWithChildren } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function AppShell({
  children,
  eyebrow,
  title,
  className
}: PropsWithChildren<{ eyebrow: string; title: string; className?: string }>) {
  return (
    <div className={cn("min-h-screen bg-shell text-ink", className)}>
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-6 lg:px-10">
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-72 rounded-[2rem] border border-line bg-[#183039] p-6 text-white shadow-haze lg:flex lg:flex-col">
          <Link href="/" className="text-xl font-semibold tracking-[0.2em] text-[#f7f1e7] uppercase">
            Meridiem
          </Link>
          <p className="mt-4 text-sm leading-6 text-white/68">
            Operating shell for deposits, allocations, compliance and performance review.
          </p>
          <nav className="mt-10 space-y-2 text-sm">
            {[
              ["/dashboard", "Dashboard"],
              ["/dashboard/deposits", "Deposits"],
              ["/dashboard/investments", "Investments"],
              ["/dashboard/portfolio", "Portfolio"],
              ["/admin", "Admin"]
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="block rounded-full border border-white/10 px-4 py-3 text-white/72 transition hover:border-white/25 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto rounded-[1.6rem] border border-white/12 bg-white/6 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/48">Control state</p>
            <p className="mt-3 text-sm text-white/80">KYC engine connected. Payment providers still in scaffold mode.</p>
          </div>
        </aside>
        <main className="flex-1">
          <div className="rounded-[2rem] border border-line bg-white/80 p-6 shadow-haze backdrop-blur md:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-ink/45">{eyebrow}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-ink">{title}</h1>
            <div className="mt-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
