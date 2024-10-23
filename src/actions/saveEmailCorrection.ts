"use server";
import { config } from "@/config";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import { cookies } from "next/headers";

export async function saveEmailField(email: string) {
  const onboardingSessionId = new ReadonlySession(
    cookies
  ).getExistingSessionIfExists();

  if (onboardingSessionId == null) {
    return;
  }

  const doc = db.doc(
    [config.firebase.collectionPath, onboardingSessionId].join("/")
  );
  if (!(await doc.get()).exists) {
    return;
  }

  await doc.update({ email });
}
