import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();

  return NextResponse.json({
    status: "stubbed",
    received: body.length > 0,
    nextStep: "Verify Stripe signature from raw body, settle payment, insert ledger credit idempotently."
  });
}
