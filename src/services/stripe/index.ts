import { config } from "@/config";
import { SubscriptionType } from "@/models/Subscription";
import assert from "assert";
import { NextRequest } from "next/server";

const stripeConfig = config.stripe;

import Stripe from "stripe";

export async function createCheckoutSession(
  productKind: SubscriptionType,
  onboardingSessionId: string,
  signupEmail: string,
  req: NextRequest
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
  const baseUrl = getRequestHost(req);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      onboarding_session_id: onboardingSessionId,
      subscription_price: priceAmountCents && priceAmountCents * 0.01,
      product_id: productInfo.id,
      product_name: productInfo.name,
    },
    subscription_data: {
      metadata: {
        onboarding_session_id: onboardingSessionId,
        signup_email: signupEmail,
      },
      ...(productKind === SubscriptionType.Yearly && {
      //  trial_period_days: 0,
      }),
    },
    success_url:
      baseUrl +
      "/api/checkout_complete?checkout_session_id={CHECKOUT_SESSION_ID}",
    cancel_url: baseUrl + "/paywall",
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

export function getRequestHost(req: NextRequest): string {
  const host =
    typeof req === "object" && "headers" in req && req.headers.get?.("host");

  const protocol =
    typeof host === "string"
      ? host?.startsWith("localhost")
        ? "http"
        : "https"
      : "http";

  return host ? `${protocol}://${host}` : "";
}
