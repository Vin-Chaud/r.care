import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { config } from "@/config";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";

const stripeConfig = config.stripe;

export async function GET(req: NextRequest) {
  const params = new URL(req.url!).searchParams;
  const checkoutSessionId = params.get("checkout_session_id");
  const onboardingSession = new ReadonlySession(req);
  const onboardingSessionId = onboardingSession.getSessionifExists();

  if (checkoutSessionId == null || onboardingSessionId == null) {
    return NextResponse.redirect(new URL("/error", req.url));
  }

  const stripe = new Stripe(stripeConfig.apiSecret);
  const checkoutSession = await stripe.checkout.sessions.retrieve(
    checkoutSessionId
  );

  if (checkoutSession.status !== "complete") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  await db
    .doc([config.firebase.collectionPath, onboardingSessionId].join("/"))
    .update({
      checkout: {
        timestamp: new Date().toISOString(),
      },
    });

  return NextResponse.redirect(new URL("/onboarding_complete", req.url));
}
