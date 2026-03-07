import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-8 lg:px-10">
      <Link href="/" className="text-lg font-semibold uppercase tracking-[0.3em] text-ink">
        Meridiem
      </Link>
      <nav className="hidden items-center gap-6 text-sm text-ink/70 md:flex">
        <Link href="/projects">Projects</Link>
        <Link href="/about">About</Link>
        <Link href="/login">Sign in</Link>
      </nav>
      <Link href="/register">
        <Button>Open Account</Button>
      </Link>
    </header>
  );
}
