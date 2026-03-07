import type Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe/client";

export function verifyStripeWebhook(signature: string, payload: string): Stripe.Event {
  return getStripeClient().webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET ?? ""
  );
}
