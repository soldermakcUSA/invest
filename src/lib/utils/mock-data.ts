import type {
  Investment,
  PaymentTransaction,
  PortfolioMetric,
  Project
} from "@/types/domain";
import { formatCurrency, formatPercent } from "@/lib/utils/format";

export const projects: Project[] = [
  {
    id: "p-aurora-credit",
    slug: "aurora-credit",
    title: "Aurora Credit Basket",
    category: "mixed",
    riskLevel: "moderate",
    targetReturn: 14.8,
    minInvestment: 500,
    description:
      "Short-duration credit and structured yield sleeve managed with conservative allocation bands.",
    thesis:
      "Designed for users who want stable carry with strict downside controls and transparent monthly updates.",
    status: "active"
  },
  {
    id: "p-signal-chain",
    slug: "signal-chain",
    title: "Signal Chain Alpha",
    category: "crypto",
    riskLevel: "high",
    targetReturn: 24.2,
    minInvestment: 250,
    description:
      "Directional and market-neutral crypto opportunities with treasury-style risk monitoring.",
    thesis:
      "Focuses on liquid assets and event-driven positioning while limiting platform concentration.",
    status: "active"
  },
  {
    id: "p-harbor-estate",
    slug: "harbor-estate",
    title: "Harbor Estate Income",
    category: "real_estate",
    riskLevel: "low",
    targetReturn: 9.4,
    minInvestment: 1000,
    description:
      "Income-oriented exposure to real estate operators with quarterly distribution targets.",
    thesis:
      "Targets smoother cash-flow characteristics and lower correlation with public market volatility.",
    status: "active"
  }
];

export const investments: Investment[] = [
  {
    id: "i-001",
    projectId: "p-aurora-credit",
    projectTitle: "Aurora Credit Basket",
    amountAllocated: 6400,
    currentValue: 6842,
    roiPercent: 6.91,
    status: "active"
  },
  {
    id: "i-002",
    projectId: "p-harbor-estate",
    projectTitle: "Harbor Estate Income",
    amountAllocated: 4200,
    currentValue: 4375,
    roiPercent: 4.17,
    status: "active"
  },
  {
    id: "i-003",
    projectId: "p-signal-chain",
    projectTitle: "Signal Chain Alpha",
    amountAllocated: 1800,
    currentValue: 1719,
    roiPercent: -4.5,
    status: "active"
  }
];

export const transactions: PaymentTransaction[] = [
  {
    id: "tx-stripe-001",
    provider: "stripe",
    amount: 2500,
    currency: "USD",
    status: "completed",
    createdAt: "2026-03-01T09:10:00.000Z"
  },
  {
    id: "tx-heleket-001",
    provider: "heleket",
    amount: 1200,
    currency: "USDT",
    status: "pending",
    createdAt: "2026-03-04T14:35:00.000Z"
  },
  {
    id: "tx-stripe-002",
    provider: "stripe",
    amount: 900,
    currency: "USD",
    status: "completed",
    createdAt: "2026-03-06T16:02:00.000Z"
  }
];

export const portfolioMetrics: PortfolioMetric[] = [
  {
    label: "Available Balance",
    value: formatCurrency(3685),
    detail: "Ready for new allocations",
    tone: "accent"
  },
  {
    label: "Invested",
    value: formatCurrency(12400),
    detail: "Across 3 active mandates"
  },
  {
    label: "Portfolio Value",
    value: formatCurrency(12936),
    detail: "Marked to latest snapshots"
  },
  {
    label: "Total ROI",
    value: formatPercent(4.32),
    detail: "Net of recorded losses"
  }
];
