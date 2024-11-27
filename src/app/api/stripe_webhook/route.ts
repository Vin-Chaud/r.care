import { NextRequest, NextResponse } from "next/server";

import { literal, object, string } from "zod";

const StripeSubscription = object({
  id: string(),
  metadata: object({
    onboarding_session_id: string(),
    signup_email: string(),
  }),
});

const StripeSubscriptionEvent = object({
  type: literal("customer.subscription.created"),
  data: object({ object: StripeSubscription }),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsedBody = StripeSubscriptionEvent.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: "Invalid event payload",
        errors: parsedBody.error.message,
      },
      { status: 400 }
    );
  }
  const ev = parsedBody.data;

  const revenueCatPayload = {
    app_user_id: ev.data.object.metadata.signup_email,
    fetch_token: ev.data.object.id,
  };

  console.log(revenueCatPayload);

  // https://www.revenuecat.com/docs/web/stripe#5-send-stripe-tokens-to-revenuecat
  const revenueCatReceiptResult = await fetch(
    "https://api.revenuecat.com/v1/receipts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Platform": "stripe",
        Authorization: `Bearer ${process.env["RCARE__REVENUECAT__STRIPE_API_KEY"]}`,
      },
      body: JSON.stringify(revenueCatPayload),
    }
  );

  if (!revenueCatReceiptResult.ok) {
    return NextResponse.json(
      {
        error: "Failed to send Stripe token to RevenueCat",
        status: revenueCatReceiptResult.status,
        body: await revenueCatReceiptResult.text(),
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
