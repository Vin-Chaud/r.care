import { PaywallClient } from "@/app/paywall/PaywallClient";
import { getGraphicImageUrls } from "@/app/utils";
import { config } from "@/config";
import { defaultOnboardingFlow } from "@/models/default_flow";
import { GraphicSection } from "@/models/OnboardingFlow/getGraphics";
import { isSubscriptionType } from "@/models/Subscription";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PaywallServer() {
  const flow = defaultOnboardingFlow;
  const onboardingSessionId = new ReadonlySession(cookies).getSessionifExists();
  if (!onboardingSessionId) {
    redirect("/");
  }

  const onboardingDoc = await db
    .doc([config.firebase.collectionPath, onboardingSessionId].join("/"))
    .get();

  if (!onboardingDoc.exists) {
    redirect("/");
  }

  const data = onboardingDoc.data();
  if (!data?.main_quiz_done || !data?.quiz_data) {
    redirect("/quiz");
  }

  if (data.checkout != null) {
    redirect("/onboarding_complete");
  }

  if (data.quiz_data?.[flow.popup_quiz_step.id] == null) {
    redirect("/analysis");
  }

  const existingCartType = data.cart.subscription_type;

  const imageUrls = await getGraphicImageUrls(flow, GraphicSection.Paywall);
  return (
    <PaywallClient
      existingCartType={
        isSubscriptionType(existingCartType) ? existingCartType : null
      }
      flow={flow}
      imageUrls={imageUrls}
    />
  );
}
