"use server";

import { config } from "@/config";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import { cookies } from "next/headers";

export async function saveQuizData(
  data: Readonly<Record<string, unknown>>,
  emailField: string | null
) {
  const onboardingSessionId = new ReadonlySession(cookies).getSessionifExists();
  if (onboardingSessionId == null) {
    return;
  }
  const doc = db.doc(
    [config.firebase.collectionPath, onboardingSessionId].join("/")
  );
  const emailPayload = emailField != null &&
    typeof data[emailField] === "string" && { email: data[emailField] };

  if ((await doc.get()).exists) {
    const quizUpdate = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [`quiz_data.${key}`, value])
    );
    const userPropertiesUpdate = { "user_properties.channel": "W2A" };
    await doc.update({
      last_updated: new Date().toISOString(),
      ...quizUpdate,
      ...emailPayload,
      ...userPropertiesUpdate,
    });
  } else {
    await doc.set({
      quiz_data: data,
      last_updated: new Date().toISOString(),
      created: new Date().toISOString(),
      user_properties: {
        channel: "W2A",
      },
      ...emailPayload,
    });
  }
}
