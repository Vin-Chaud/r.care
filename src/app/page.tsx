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
  }
redirect("/quiz");

}
