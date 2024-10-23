import { config } from "@/config";
import { isSubscriptionType } from "@/models/Subscription";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import { createCheckoutSession } from "@/services/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = new URL(req.url!).searchParams;
  const type = params.get("type");

  const onboardingSessionId = new ReadonlySession(
    req
  ).getExistingSessionIfExists();
  if (onboardingSessionId == null) {
    return NextResponse.redirect(new URL("/error", req.url));
  }

  if (!type || !isSubscriptionType(type)) {
    return NextResponse.redirect(new URL("/error", req.url));
  }

  const onboardingDocRef = db.doc(
    [config.firebase.collectionPath, onboardingSessionId].join("/")
  );

  const onboardingDoc = await onboardingDocRef.get();
  if (onboardingDoc.exists) {
    const existingSessionUrl = onboardingDoc.data()?.cart?.session_url;
    if (existingSessionUrl != null) {
      return NextResponse.redirect(existingSessionUrl);
    }
  }

  const checkoutSession = await createCheckoutSession(
    type,
    onboardingSessionId
  );

  await onboardingDocRef.update({
    cart: {
      session_id: checkoutSession.id,
      session_url: checkoutSession.url,
      subscription_type: type,
      timestamp: new Date(checkoutSession.created * 1000).toISOString(),
    },
  });

  return NextResponse.redirect(checkoutSession.url!);
}
