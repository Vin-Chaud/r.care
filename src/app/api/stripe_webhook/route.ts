import { NextRequest, NextResponse } from "next/server";

import { literal, object, string } from "zod";
import { Stripe } from "stripe";

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
  const requestSignature = req.headers.get("stripe-signature");
  if (!requestSignature) {
    return NextResponse.json(
      { error: "No Stripe signature header" },
      { status: 401 }
    );
  }

  if (!req.body) {
    return NextResponse.json({ error: "No request body" }, { status: 400 });
  }

  const secretApiKey = process.env["RCARE__STRIPE__API_SECRET"];
  const webhookSecret = process.env["RCARE__STRIPE__WEBHOOK_SECRET"];
  if (!secretApiKey || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe secret key or webhook secret not set" },
      { status: 500 }
    );
  }

  let verifiedBody;

  try {
    const body = await getRawBody(req.body);
    verifiedBody = new Stripe(secretApiKey).webhooks.constructEvent(
      body,
      requestSignature,
      webhookSecret
    );
  } catch (err) {
    const message = (err as Error).message;
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 401 }
    );
  }

  const parsedBody = StripeSubscriptionEvent.safeParse(verifiedBody);
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

// See: https://github.com/vercel/next.js/discussions/46483#discussioncomment-7197436
async function getRawBody(stream: any): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
