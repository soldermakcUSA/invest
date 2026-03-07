import { NextResponse } from "next/server";
import { depositSchema } from "@/lib/validations/deposit";

export async function POST(request: Request) {
  const json = await request.json();
  const payload = depositSchema.parse({ ...json, provider: "heleket" });

  return NextResponse.json({
    status: "stubbed",
    provider: payload.provider,
    nextStep: "Create pending transaction, request Heleket invoice, persist provider invoice id."
  });
}
