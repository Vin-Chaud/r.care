import { config } from "@/config";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import { createCheckoutSession } from "@/services/stripe";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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

  if (type !== "quarterly" && type !== "annual") {
    return NextResponse.redirect(new URL("/error", req.url));
  }

  const onboardingDoc = await getDoc(
    doc(db, config.firebase.collectionPath, onboardingSessionId)
  );

  if (onboardingDoc.exists()) {
    const existingSessionUrl = onboardingDoc.data().cart?.session_url;
    if (existingSessionUrl != null) {
      return NextResponse.redirect(existingSessionUrl);
    }
  }

  const checkoutSession = await createCheckoutSession(
    type === "quarterly" ? "quarterly" : "annual",
    onboardingSessionId
  );

  await updateDoc(
    doc(db, config.firebase.collectionPath, onboardingSessionId),
    {
      cart: {
        session_id: checkoutSession.id,
        session_url: checkoutSession.url,
        subscription_type: type,
        timestamp: new Date(checkoutSession.created * 1000).toISOString(),
      },
    }
  );

  return NextResponse.redirect(checkoutSession.url!);
}
