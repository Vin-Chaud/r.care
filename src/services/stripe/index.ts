import { config } from "@/config";
import { SubscriptionType } from "@/models/Subscription";
import assert from "assert";

const stripeConfig = config.stripe;
const serverConfig = config.server;

import Stripe from "stripe";

export async function createCheckoutSession(
  productKind: SubscriptionType,
  onboardingSessionId: string
) {
  const priceId =
    productKind === SubscriptionType.Quarterly
      ? stripeConfig.catalog.quarterlyPriceId
      : stripeConfig.catalog.annualPriceId;

  const stripe = new Stripe(stripeConfig.apiSecret);
  const priceInfo = await stripe.prices.retrieve(priceId);
  const priceAmountCents = priceInfo.unit_amount;
  const productInfo =
    typeof priceInfo.product === "string"
      ? await stripe.products.retrieve(priceInfo.product)
      : priceInfo.product;
  assert(!productInfo.deleted);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    ...(productKind === SubscriptionType.Yearly && {
      subscription_data: {
        trial_period_days: 7,
      },
    }),
    metadata: {
      onboarding_session_id: onboardingSessionId,
      subscription_price: priceAmountCents && priceAmountCents * 0.01,
      product_id: productInfo.id,
      product_name: productInfo.name,
    },
    success_url:
      serverConfig.baseUrl +
      "/api/checkout_complete?checkout_session_id={CHECKOUT_SESSION_ID}",
    cancel_url: serverConfig.baseUrl + "/paywall",
    ui_mode: "hosted",
  });

  return session;
}

export async function isCheckoutSessionValid(
  sessionId: string,
  offsetInSeconds = 0
) {
  const stripe = new Stripe(stripeConfig.apiSecret);
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session.expires_at - offsetInSeconds > Date.now() / 1000;
}

export async function invalidateSession(sessionId: string) {
  const stripe = new Stripe(stripeConfig.apiSecret);
  await stripe.checkout.sessions.expire(sessionId);
}
