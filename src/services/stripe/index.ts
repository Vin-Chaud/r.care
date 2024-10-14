import { config } from "@/config";

const stripeConfig = config.stripe;
const serverConfig = config.server;

import Stripe from "stripe";

export async function createCheckoutSession(
  productKind: "quarterly" | "annual"
) {
  const stripe = new Stripe(stripeConfig.apiSecret);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price:
          productKind === "quarterly"
            ? stripeConfig.catalog.quarterlyPriceId
            : stripeConfig.catalog.annualPriceId,
        quantity: 1,
      },
    ],
    success_url:
      serverConfig.baseUrl +
      "/onboarding_complete?checkout_session_id={CHECKOUT_SESSION_ID}",
    cancel_url: serverConfig.baseUrl,
  });

  return session;
}
