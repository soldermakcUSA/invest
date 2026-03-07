import { NextResponse } from "next/server";
import { createInvestmentSchema } from "@/lib/validations/investment";

export async function POST(request: Request) {
  const json = await request.json();
  const payload = createInvestmentSchema.parse(json);

  return NextResponse.json({
    status: "stubbed",
    payload,
    nextStep: "Verify wallet balance and KYC, create investment, event and ledger debit in one transaction."
  });
}
