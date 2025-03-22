import { config } from "@/config";
import { isSubscriptionType } from "@/models/Subscription";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import {
  createCheckoutSession,
  invalidateSession,
  isCheckoutSessionValid,
} from "@/services/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = new URL(req.url!).searchParams;
  const type = params.get("type");

  const onboardingSessionId = new ReadonlySession(req).getSessionifExists();
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
  if (!onboardingDoc.exists) {
    return NextResponse.redirect(new URL("/error", req.url));
  }

  const onboardingDocData = onboardingDoc.data();
  if (onboardingDocData == null) {
    return NextResponse.redirect(new URL("/error", req.url));
  }

  const signupEmail = onboardingDocData.email;
  if (!signupEmail) {
    return NextResponse.redirect(new URL("/error", req.url));
  }

  const checkoutCart = onboardingDocData.cart;
  if (checkoutCart != null) {
    const existingSessionId = checkoutCart.session_id;
    const isSessionValid =
      existingSessionId != null &&
      (await isCheckoutSessionValid(existingSessionId, 3600));

    const existingSessionUrl = checkoutCart.session_url;
    const isCorrectType = checkoutCart.subscription_type === type;
    const isEmailCorrect = checkoutCart.signup_email === signupEmail;

    if (
      existingSessionUrl != null &&
      isCorrectType &&
      isSessionValid &&
      isEmailCorrect
    ) {
      return NextResponse.redirect(existingSessionUrl);
    }

    // Expires the existing session if it's not the correct type
    if (!isCorrectType && isSessionValid) {
      try {
        invalidateSession(existingSessionId);
      } catch (error) {
        // Soft warn this, don't crash the checkout flow
        console.warn(
          `Failed to invalidate existing session ${existingSessionId}`,
          error
        );
      }
    }
  }

  const checkoutSession = await createCheckoutSession(
    type,
    onboardingSessionId,
    signupEmail,
    req
  );

  await onboardingDocRef.update({
    cart: {
      session_id: checkoutSession.id,
      session_url: checkoutSession.url,
      signup_email: signupEmail,
      subscription_type: type,
      timestamp: new Date(checkoutSession.created * 1000).toISOString(),
    },
  });

  return NextResponse.redirect(checkoutSession.url!);
}
