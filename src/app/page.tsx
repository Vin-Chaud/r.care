import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import assert from "assert";
import { doc, getDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { config } from "../config";
import { HomeClient } from "./MainPageClient";

export default async function HomeServer() {
  const onboardingSessionId = new ReadonlySession(
    cookies
  ).getExistingSessionIfExists();
  assert(onboardingSessionId);

  const onboardingDoc = await getDoc(
    doc(db, config.firebase.collectionPath, onboardingSessionId)
  );

  if (onboardingDoc.exists()) {
    if (onboardingDoc.data().checkout != null) {
      redirect("/onboarding_complete");
    }
  }

  return <HomeClient />;
}
