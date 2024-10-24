import { Landing } from "@/components/Landing";
import { defaultOnboardingFlow } from "@/models/default_flow";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import assert from "assert";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { config } from "../config";

export default async function HomeServer() {
  const onboardingSessionId = new ReadonlySession(cookies).getSessionifExists();
  assert(onboardingSessionId);

  const onboardingDoc = await db
    .doc([config.firebase.collectionPath, onboardingSessionId].join("/"))
    .get();

  if (onboardingDoc.exists) {
    const data = onboardingDoc.data();
    if (data?.checkout != null) {
      redirect("/onboarding_complete");
    }

    if (data?.quiz_cursor != null && data?.quiz_data != null) {
      redirect("/quiz");
    }
  }

  const flow = defaultOnboardingFlow;

  return <Landing flow={flow} />;
}
