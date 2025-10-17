import { NextRequest, NextResponse } from "next/server";
import { config } from "@/config";
import { Stripe } from "stripe";
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
  const stripeRevenueCatApiKey = config.revenuecat?.stripeApiKey;
  const secretApiKey = config.stripe.apiSecret;
  const webhookSecret = config.stripe.webhookSecret;

  if (!secretApiKey || !webhookSecret || !stripeRevenueCatApiKey) {
    return NextResponse.json(
      { error: "Stripe-RevenueCat integration is not configured." },
      { status: 500 }
    );
  }

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

  let event;
  try {
    const body = await getRawBody(req.body);
    event = new Stripe(secretApiKey).webhooks.constructEvent(
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

  // 🟢 NEW BLOCK #1 – Handle manual-capture checkout sessions
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const paymentIntentId = session.payment_intent as string;
    const onboardingId = session.metadata?.onboarding_session_id;
    const signupEmail = session.metadata?.signup_email;

    console.log("✅ Checkout session completed. Payment authorized:", {
      paymentIntentId,
      onboardingId,
      signupEmail,
    });

    // TODO: Save this to your DB (paymentIntentId, onboardingId, etc.)
    // Example:
    // await db.authorizations.insert({
    //   onboarding_session_id: onboardingId,
    //   payment_intent_id: paymentIntentId,
    //   signup_email: signupEmail,
    //   status: "authorized",
    // });
  }

  // 🟢 EXISTING BLOCK – Your current RevenueCat subscription handler
  const parsedBody = StripeSubscriptionEvent.safeParse(event);
  if (parsedBody.success) {
    const ev = parsedBody.data;

    const revenueCatPayload = {
      app_user_id: ev.data.object.metadata.signup_email,
      fetch_token: ev.data.object.id,
    };

    console.log("Sending subscription to RevenueCat:", revenueCatPayload);

    const revenueCatReceiptResult = await fetch(
      "https://api.revenuecat.com/v1/receipts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Platform": "stripe",
          Authorization: `Bearer ${stripeRevenueCatApiKey}`,
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
  }

  // ✅ Always respond to Stripe
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
