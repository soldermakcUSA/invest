import { investments, transactions } from "@/lib/utils/mock-data";

export function getPortfolioSummary() {
  const invested = investments.reduce((sum, item) => sum + item.amountAllocated, 0);
  const currentValue = investments.reduce((sum, item) => sum + item.currentValue, 0);
  const completedDeposits = transactions
    .filter((item) => item.status === "completed")
    .reduce((sum, item) => sum + item.amount, 0);

  return {
    invested,
    currentValue,
    completedDeposits,
    pnl: currentValue - invested,
    roi: invested === 0 ? 0 : ((currentValue - invested) / invested) * 100
  };
}
