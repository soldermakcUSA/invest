"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Bell,
  Bot,
  BrainCircuit,
  ChartColumnIncreasing,
  ChevronRight,
  Home,
  Radar,
  ShieldCheck,
  Sparkles,
  Wallet
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { OrbitalBrand } from "@/components/orbital-brand";

type MobileNavItem = {
  id: string;
  icon: LucideIcon;
  label: string;
};

const mobileNavItems: MobileNavItem[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "signals", icon: BrainCircuit, label: "Signals" },
  { id: "portfolio", icon: Wallet, label: "Portfolio" },
  { id: "ventures", icon: Radar, label: "Ventures" }
];

const quickActions = [
  { label: "AI Brief", value: "12 new", icon: Bot },
  { label: "Scam Scan", value: "3 alerts", icon: ShieldCheck },
  { label: "Quant Pulse", value: "Bullish", icon: ChartColumnIncreasing }
];

const mobileSignals = [
  {
    title: "Majors gaining liquidity",
    detail: "BTC, SOL and infra names continue to lead in internal models.",
    emphasis: "+14.8%"
  },
  {
    title: "Private dealflow improving",
    detail: "Seed pipeline quality rose without a matching spike in pricing.",
    emphasis: "8 live"
  },
  {
    title: "Risk layer stable",
    detail: "Protocol screening reduced high-risk candidates this cycle.",
    emphasis: "Low"
  }
];

const positions = [
  { ticker: "BTC", weight: "18%", change: "+2.6%" },
  { ticker: "SOL", weight: "14%", change: "+4.1%" },
  { ticker: "NVDA", weight: "12%", change: "+1.8%" },
  { ticker: "AVDX", weight: "9%", change: "+3.3%" }
];

export function MobileAppShell() {
  const { signOut, user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [isPending, startTransition] = useTransition();
  const displayName = user?.user_metadata?.full_name || "AlphaForge Member";
  const firstName = displayName.split(" ")[0] || "Member";

  function handleSignOut() {
    startTransition(async () => {
      await signOut();
      router.replace("/?auth=login");
    });
  }

  return (
    <main className="mobile-app-page">
      <div className="mobile-app">
        <div className="mobile-app__glow mobile-app__glow--top" />
        <div className="mobile-app__glow mobile-app__glow--bottom" />

        <header className="mobile-app__header">
          <div className="mobile-app__status">
            <span className="mobile-app__eyebrow">Live workspace</span>
            <strong>Good evening, {firstName}</strong>
          </div>

          <div className="mobile-app__header-actions">
            <button className="mobile-app__icon-button" type="button" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <button className="mobile-app__icon-button" disabled={isPending} onClick={handleSignOut} type="button">
              {isPending ? "..." : "Exit"}
            </button>
          </div>
        </header>

        <section className="mobile-app__brand-card">
          <OrbitalBrand compact />
          <p>Private AlphaForge intelligence layer tuned for mobile monitoring and rapid decision flow.</p>

          <div className="mobile-app__hero-metrics">
            <div>
              <span>Net mandate</span>
              <strong>$1.45M</strong>
              <em>+12.86%</em>
            </div>
            <div>
              <span>Signal bias</span>
              <strong>Very bullish</strong>
              <em>12 active queues</em>
            </div>
          </div>
        </section>

        <section className="mobile-app__panel mobile-app__panel--highlight">
          <div className="mobile-app__panel-head">
            <div>
              <span>Today&apos;s brief</span>
              <h1>Monitor positions, signals and venture opportunities like an actual app.</h1>
            </div>
            <Link className="mobile-app__link-chip" href="/dashboard">
              Full dashboard
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="mobile-app__mini-chart" aria-hidden="true">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </section>

        <section className="mobile-app__action-grid">
          {quickActions.map(({ icon: Icon, label, value }) => (
            <article className="mobile-app__action-card" key={label}>
              <span className="mobile-app__action-icon">
                <Icon size={18} />
              </span>
              <strong>{label}</strong>
              <p>{value}</p>
            </article>
          ))}
        </section>

        <section className="mobile-app__panel">
          <div className="mobile-app__section-title">
            <div>
              <span>Signals</span>
              <h2>Priority feed</h2>
            </div>
            <Sparkles size={16} />
          </div>

          <div className="mobile-app__signal-stack">
            {mobileSignals.map((signal) => (
              <article className="mobile-app__signal-card" key={signal.title}>
                <div>
                  <strong>{signal.title}</strong>
                  <span>{signal.emphasis}</span>
                </div>
                <p>{signal.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mobile-app__panel">
          <div className="mobile-app__section-title">
            <div>
              <span>Portfolio</span>
              <h2>Top allocations</h2>
            </div>
            <Wallet size={16} />
          </div>

          <div className="mobile-app__position-list">
            {positions.map((position) => (
              <article className="mobile-app__position-row" key={position.ticker}>
                <div>
                  <strong>{position.ticker}</strong>
                  <span>{position.weight} weight</span>
                </div>
                <em>{position.change}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="mobile-app__panel mobile-app__panel--media">
          <div className="mobile-app__section-title">
            <div>
              <span>Presence</span>
              <h2>Team layer</h2>
            </div>
            <ChevronRight size={16} />
          </div>

          <div className="mobile-app__media-card">
            <Image alt="AlphaForge team" height={768} src="/brand/showcase-team.jpeg" width={1376} />
            <div className="mobile-app__media-overlay">
              <strong>{displayName}</strong>
              <p>Secure mobile workspace connected to the same AlphaForge identity graph.</p>
            </div>
          </div>
        </section>

        <nav className="mobile-app__tabbar" aria-label="Mobile navigation">
          {mobileNavItems.map(({ id, icon: Icon, label }) => (
            <button
              className={`mobile-app__tab ${activeTab === id ? "is-active" : ""}`}
              key={id}
              onClick={() => setActiveTab(id)}
              type="button"
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </main>
  );
}
