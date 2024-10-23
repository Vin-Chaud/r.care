import { defaultOnboardingFlow } from "@/models/default_flow";
import { getGraphics } from "@/models/OnboardingFlow/methods";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import assert from "assert";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { config } from "../config";
import { HomeClient } from "./MainPageClient";
import { loadImageAsBase64 } from "@/utils/loadImageAsBase64";

export default async function HomeServer() {
  const onboardingSessionId = new ReadonlySession(
    cookies
  ).getExistingSessionIfExists();
  assert(onboardingSessionId);

  const onboardingDoc = await db
    .doc([config.firebase.collectionPath, onboardingSessionId].join("/"))
    .get();

  if (onboardingDoc.exists) {
    if (onboardingDoc.data()?.checkout != null) {
      redirect("/onboarding_complete");
    }
  }

  const flow = defaultOnboardingFlow;
  const allImages = getGraphics(flow);

  const imageUrls = Object.fromEntries(
    await Promise.all(
      [...allImages].map(async (graphicId) => {
        const dataUrl = await loadImageAsBase64(graphicId);
        if (!dataUrl) return null;
        return [graphicId, dataUrl] as const;
      })
    ).then((entries) => entries.filter((entry) => entry != null))
  );

  return <HomeClient flow={flow} imageUrls={imageUrls} />;
}
