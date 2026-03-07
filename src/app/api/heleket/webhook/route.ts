import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();

  return NextResponse.json({
    status: "stubbed",
    received: body.length > 0,
    nextStep: "Validate Heleket signature and final status, then settle ledger entry exactly once."
  });
}
