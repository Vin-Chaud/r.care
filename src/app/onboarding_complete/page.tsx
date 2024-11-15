import { Welcome } from "@/components/Welcome";
import { ReadonlySession } from "@/services/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { config } from "@/config";
import { db } from "@/services/firebase";
import { defaultOnboardingFlow } from "@/models/default_flow";
import { loadImageAsBase64 } from "@/utils/loadImageAsBase64";

export default async function OnboardingComplete() {
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
  if (data?.checkout == null) {
    redirect("/");
  }

  return (
    <Welcome
      email={data.email || "(your email address)"}
      activateGraphicUrl={
        (await loadImageAsBase64(flow.activate_graphic_id)) || ""
      }
      appUrl={config.appUrl}
      stripeCheckoutSessionId={data.checkout.session_id}
      stripeProductId={data.checkout.product_id}
      productName={data.checkout.product_name}
      subscriptionValue={data.checkout.value}
    />
  );
}
