import { config } from "@/config";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ResultServer() {
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

redirect("/paywall");
}
