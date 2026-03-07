export type UserRole = "client" | "admin" | "operator" | "compliance";
export type KycStatus =
  | "not_started"
  | "pending"
  | "in_review"
  | "verified"
  | "rejected"
  | "restricted";

export type RiskLevel = "low" | "moderate" | "high";
export type ProjectCategory =
  | "crypto"
  | "stocks"
  | "startups"
  | "real_estate"
  | "commodities"
  | "mixed";

export type PaymentProvider = "stripe" | "heleket";
export type PaymentStatus = "pending" | "completed" | "failed";
export type LedgerDirection = "credit" | "debit";

export interface PortfolioMetric {
  label: string;
  value: string;
  detail: string;
  tone?: "default" | "accent";
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  riskLevel: RiskLevel;
  targetReturn: number;
  minInvestment: number;
  description: string;
  thesis: string;
  status: "draft" | "active" | "closed";
}

export interface Investment {
  id: string;
  projectId: string;
  projectTitle: string;
  amountAllocated: number;
  currentValue: number;
  roiPercent: number;
  status: "active" | "closed";
}

export interface PaymentTransaction {
  id: string;
  provider: PaymentProvider;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
}

export interface LedgerEntry {
  id: string;
  entryType: "deposit" | "investment_allocation" | "investment_return";
  direction: LedgerDirection;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}
