import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Bot,
  BriefcaseBusiness,
  ChartColumnIncreasing,
  Gauge,
  LayoutDashboard,
  Radar,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Wallet
} from "lucide-react";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { OrbitalBrand } from "@/components/orbital-brand";

type NavItem = {
  label: string;
  icon: LucideIcon;
};

type AllocationItem = {
  label: string;
  value: number;
  color: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Portfolio View", icon: Wallet },
  { label: "AI Tools", icon: Bot },
  { label: "Quant Analysis", icon: ChartColumnIncreasing },
  { label: "Ventures", icon: Radar },
  { label: "Scam Check", icon: ShieldCheck },
  { label: "Settings", icon: Settings }
];

const allocation: AllocationItem[] = [
  { label: "Technology", value: 35, color: "#e6c15d" },
  { label: "Crypto", value: 25, color: "#c4973f" },
  { label: "Commodities", value: 15, color: "#8f6b2d" },
  { label: "Ventures", value: 15, color: "#5b441f" },
  { label: "Cash", value: 10, color: "#f2dd9f" }
];

const signalItems = [
  {
    title: "Liquidity expansion on majors",
    detail: "Momentum models increased conviction across BTC, SOL and exchange infrastructure.",
    age: "19m ago"
  },
  {
    title: "Venture sentiment widening",
    detail: "Seed software dealflow improved while valuation discipline remained intact.",
    age: "1h ago"
  },
  {
    title: "Scam exposure falling",
    detail: "Protocol screening reduced high-risk candidates in the current pipeline.",
    age: "2h ago"
  }
];

const ventures = [
  {
    title: "AI Infrastructure",
    stage: "Seed / Series A",
    score: "89/100"
  },
  {
    title: "Web3 Analytics",
    stage: "Token + equity exposure",
    score: "76/100"
  },
  {
    title: "Fintech API",
    stage: "Revenue traction",
    score: "84/100"
  },
  {
    title: "Defense / Deep Tech",
    stage: "High upside",
    score: "91/100"
  }
];

const watchlist = [
  { ticker: "AVDX", price: "$9.30", spark: [18, 23, 22, 29, 35, 33, 41], change: "+13.38%", target: "+3.29%" },
  { ticker: "ALDM", price: "$2.70", spark: [11, 14, 13, 17, 16, 21, 24], change: "+7.29%", target: "+2.53%" },
  { ticker: "CRYPO", price: "$13.70", spark: [21, 22, 24, 23, 27, 29, 34], change: "+3.36%", target: "+5.98%" },
  { ticker: "BR6C", price: "$3.50", spark: [13, 18, 17, 16, 18, 23, 26], change: "+1.35%", target: "+9.60%" },
  { ticker: "F3RN", price: "$3.00", spark: [12, 13, 11, 15, 18, 17, 20], change: "+3.38%", target: "+4.89%" }
];

const candleSeries = [42, 60, 51, 78, 64, 55, 82, 71, 88, 76, 92, 96];
const comparisonA = [18, 46, 63, 72, 81, 91];
const comparisonB = [11, 34, 54, 60, 71, 82];

function buildPolyline(values: number[], width: number, height: number) {
  const step = width / (values.length - 1);
  return values
    .map((value, index) => {
      const x = index * step;
      const y = height - (value / 100) * height;
      return `${x},${y}`;
    })
    .join(" ");
}

function buildSpark(values: number[]) {
  return buildPolyline(values.map((value) => value * 3), 120, 36);
}

export default function DashboardPage() {
  const allocationGradient = `conic-gradient(${allocation
    .map((item, index) => {
      const start = allocation.slice(0, index).reduce((sum, current) => sum + current.value, 0);
      const end = start + item.value;
      return `${item.color} ${start}% ${end}%`;
    })
    .join(", ")})`;

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <Link className="brand-link brand-link--sidebar" href="/">
          <OrbitalBrand compact />
        </Link>

        <nav className="dashboard-nav" aria-label="Dashboard">
          {navItems.map(({ label, icon: Icon }, index) => (
            <a className={`dashboard-nav__item ${index === 0 ? "is-active" : ""}`} href="#" key={label}>
              <Icon size={18} />
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="status-chip">
            <span />
            API status: online
          </div>
          <Link className="button button--ghost button--wide" href="/login">
            Sign in
          </Link>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-topbar__brand">
            <OrbitalBrand />
          </div>

          <div className="dashboard-topbar__actions">
            <label className="search-shell">
              <Search size={16} />
              <input placeholder="Search projects, tickers, sectors" type="search" />
            </label>
            <button className="icon-button" type="button" aria-label="Notifications">
              <Bell size={18} />
              <span>3</span>
            </button>
            <div className="avatar-chip">
              <Image alt="Team member" height={48} src="/brand/team.jpeg" width={48} />
            </div>
          </div>
        </header>

        <div className="dashboard-hero">
          <div>
            <span className="eyebrow">Private workspace</span>
            <h1>Portfolio intelligence, AI signals and venture diligence in one view.</h1>
          </div>
          <div className="dashboard-hero__meta">
            <div>
              <strong>June cycle</strong>
              <span>Very bullish</span>
            </div>
            <div>
              <strong>12 active</strong>
              <span>research queues</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <article className="panel panel--portfolio">
            <div className="panel__header">
              <div>
                <span>Portfolio overview</span>
                <h2>Invest</h2>
              </div>
              <span className="panel-tag">Invest</span>
            </div>

            <div className="portfolio-layout">
              <div className="metric-stack">
                <div className="metric-card">
                  <span>Total value</span>
                  <strong>$1,45,891.87</strong>
                  <em>+$3,900 (+12.86%)</em>
                </div>
                <div className="metric-card">
                  <span>Daily change</span>
                  <strong>+1,764</strong>
                  <em>+1.19%</em>
                </div>
              </div>

              <div className="allocation-chart">
                <div className="allocation-chart__ring" style={{ "--allocation-gradient": allocationGradient } as CSSProperties}>
                  <span>35%</span>
                </div>
                <div className="allocation-legend">
                  {allocation.map((item) => (
                    <div key={item.label}>
                      <span style={{ backgroundColor: item.color }} />
                      <strong>{item.label}</strong>
                      <em>{item.value}%</em>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="panel">
            <div className="panel__header">
              <div>
                <span>AI powered insights</span>
                <h2>Sentiment + signals</h2>
              </div>
              <span className="panel-tag">AI</span>
            </div>

            <div className="insights-layout">
              <div className="gauge-card">
                <div className="gauge">
                  <div className="gauge__needle" />
                </div>
                <strong>Very bullish</strong>
                <p>Current market sentiment remains constructive across core mandate areas.</p>
              </div>

              <div className="signal-feed">
                {signalItems.map((item) => (
                  <article key={item.title}>
                    <div>
                      <h3>{item.title}</h3>
                      <span>{item.age}</span>
                    </div>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </article>

          <article className="panel">
            <div className="panel__header">
              <div>
                <span>Quant lab</span>
                <h2>Candidate chart</h2>
              </div>
              <span className="panel-tag">Quant</span>
            </div>

            <div className="quant-layout">
              <div className="chart-card">
                <svg viewBox="0 0 420 200" role="img" aria-label="Candidate chart">
                  <defs>
                    <linearGradient id="candle-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="rgba(233, 197, 106, 0.9)" />
                      <stop offset="100%" stopColor="rgba(233, 197, 106, 0.08)" />
                    </linearGradient>
                  </defs>
                  {candleSeries.map((value, index) => {
                    const x = 18 + index * 32;
                    const barHeight = value * 1.4;
                    return (
                      <g key={x}>
                        <line className="chart-grid-line" x1={x + 10} x2={x + 10} y1="28" y2="176" />
                        <rect
                          fill="url(#candle-fill)"
                          height={barHeight}
                          rx="6"
                          width="18"
                          x={x}
                          y={176 - barHeight}
                        />
                      </g>
                    );
                  })}
                  <polyline
                    className="chart-line"
                    fill="none"
                    points={buildPolyline(candleSeries, 372, 150)
                      .split(" ")
                      .map((pair) => {
                        const [x, y] = pair.split(",").map(Number);
                        return `${x + 24},${y + 26}`;
                      })
                      .join(" ")}
                  />
                </svg>
              </div>

              <div className="chart-card chart-card--comparison">
                <svg viewBox="0 0 220 160" role="img" aria-label="Model comparison">
                  <polyline className="chart-line" fill="none" points={buildPolyline(comparisonA, 180, 110)} />
                  <polyline className="chart-line chart-line--soft" fill="none" points={buildPolyline(comparisonB, 180, 110)} />
                </svg>
                <div className="algo-table">
                  <div>
                    <span>Algorithm perf.</span>
                    <strong>54.5%</strong>
                  </div>
                  <div>
                    <span>Algorithm 1</span>
                    <strong>0.25%</strong>
                  </div>
                  <div>
                    <span>Algorithm 2</span>
                    <strong>0.25%</strong>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="panel">
            <div className="panel__header">
              <div>
                <span>Risk alerts</span>
                <h2>Scam detector</h2>
              </div>
              <span className="panel-tag">Risk</span>
            </div>

            <div className="risk-layout">
              <div className="risk-summary">
                <div className="risk-summary__card risk-summary__card--critical">
                  <span>Critical</span>
                  <strong>3</strong>
                  <em>projects</em>
                </div>
                <div className="risk-summary__card risk-summary__card--high">
                  <span>High risk</span>
                  <strong>2</strong>
                  <em>projects</em>
                </div>
                <div className="risk-summary__card risk-summary__card--low">
                  <span>Low risk</span>
                  <strong>1</strong>
                  <em>project</em>
                </div>
              </div>

              <div className="risk-bars">
                {[
                  ["Critical", "27/23", 82],
                  ["High risk", "58/55", 71],
                  ["Low risk", "1/34", 22]
                ].map(([label, value, width]) => (
                  <div key={label}>
                    <div className="risk-bars__label">
                      <span>{label}</span>
                      <em>{value}</em>
                    </div>
                    <div className="risk-bars__track">
                      <span style={{ width: `${width}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="risk-list">
                {[
                  "MetaVerse Scam? - High risk",
                  "Bridge exploit exposure - High risk",
                  "Anonymous team allocation - High risk",
                  "Inconsistent treasury wallet - High risk"
                ].map((item) => (
                  <article key={item}>
                    <ShieldCheck size={14} />
                    <span>{item}</span>
                  </article>
                ))}
              </div>
            </div>
          </article>

          <article className="panel panel--ventures">
            <div className="panel__header">
              <div>
                <span>Ventures</span>
                <h2>Scouted pipeline</h2>
              </div>
              <span className="panel-tag">Venture</span>
            </div>

            <div className="venture-grid">
              {ventures.map((venture) => (
                <article className="venture-card" key={venture.title}>
                  <div className="venture-card__icon">
                    <Sparkles size={16} />
                  </div>
                  <h3>{venture.title}</h3>
                  <p>{venture.stage}</p>
                  <strong>{venture.score}</strong>
                  <button type="button">Learn more</button>
                </article>
              ))}
            </div>
          </article>

          <article className="panel panel--watchlist">
            <div className="panel__header">
              <div>
                <span>Active watchlist</span>
                <h2>Live candidates</h2>
              </div>
              <span className="panel-tag">Monitor</span>
            </div>

            <div className="watchlist-table">
              <div className="watchlist-table__head">
                <span>Ticker</span>
                <span>Price</span>
                <span>Sparkline</span>
                <span>Change</span>
                <span>Target</span>
              </div>
              {watchlist.map((item) => (
                <div className="watchlist-table__row" key={item.ticker}>
                  <strong>{item.ticker}</strong>
                  <span>{item.price}</span>
                  <svg viewBox="0 0 120 36" aria-hidden="true">
                    <polyline className="chart-line" fill="none" points={buildSpark(item.spark)} />
                  </svg>
                  <span>{item.change}</span>
                  <em>{item.target}</em>
                </div>
              ))}
            </div>
          </article>
        </div>

        <section className="dashboard-bottom-strip">
          <div className="dashboard-bottom-strip__copy">
            <Gauge size={16} />
            Last updated: 17:13 AM
          </div>
          <div className="dashboard-bottom-strip__copy">
            <Sparkles size={16} />
            AI status: monitoring
          </div>
          <div className="dashboard-bottom-strip__copy">
            <Image alt="Office" height={768} src="/brand/office.jpeg" width={1376} />
            Live operating room
          </div>
        </section>
      </section>
    </main>
  );
}
