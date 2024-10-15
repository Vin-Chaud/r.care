"use server";

import { config } from "@/config";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import { cookies } from "next/headers";

export async function saveQuizData(data: Readonly<Record<string, unknown>>) {
  const onboardingSessionId = new ReadonlySession(
    cookies
  ).getExistingSessionIfExists();
  if (onboardingSessionId != null) {
    const doc = db.doc(
      [config.firebase.collectionPath, onboardingSessionId].join("/")
    );

    if ((await doc.get()).exists) {
      await doc.update({
        quiz_data: data,
        last_updated: new Date().toISOString(),
      });
    } else {
      await doc.set({
        quiz_data: data,
        last_updated: new Date().toISOString(),
        created: new Date().toISOString(),
      });
    }
  }
}
