import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function AuthCard({
  title,
  description,
  footer,
  children
}: {
  title: string;
  description: string;
  footer: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12 lg:px-10">
      <div className="grid w-full gap-8 overflow-hidden rounded-[2rem] border border-line bg-white shadow-haze lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden bg-[#183039] p-8 text-white md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,129,92,0.35),_transparent_40%),linear-gradient(135deg,_transparent,_rgba(255,255,255,0.06))]" />
          <div className="relative">
            <Link href="/" className="text-sm uppercase tracking-[0.28em] text-white/76">
              Meridiem
            </Link>
            <h1 className="mt-10 max-w-md text-5xl font-semibold tracking-[-0.05em]">
              Capital allocation with an institutional operating layer.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/72">
              This first version ships the investor experience, internal ledger structure and payment rails scaffold.
            </p>
          </div>
        </section>
        <section className="p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.26em] text-ink/45">Access</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-ink">{title}</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-ink/62">{description}</p>
          <div className="mt-10 space-y-4">{children}</div>
          <Button className="mt-8 w-full">Continue</Button>
          <div className="mt-6 text-sm text-ink/58">{footer}</div>
        </section>
      </div>
    </div>
  );
}
