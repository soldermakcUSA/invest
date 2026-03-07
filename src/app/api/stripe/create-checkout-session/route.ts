import { NextResponse } from "next/server";
import { depositSchema } from "@/lib/validations/deposit";

export async function POST(request: Request) {
  const json = await request.json();
  const payload = depositSchema.parse({ ...json, provider: "stripe" });

  return NextResponse.json({
    status: "stubbed",
    provider: payload.provider,
    nextStep: "Create payment_transaction, build Stripe Checkout Session, return hosted URL."
  });
}
