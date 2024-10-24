"use server";

import { config } from "@/config";
import { Cursor } from "@/models/OnboardingFlow/methods";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import { cookies } from "next/headers";

export async function saveQuizCursor(cursor: Cursor | true) {
  const onboardingSessionId = new ReadonlySession(cookies).getSessionifExists();

  if (onboardingSessionId == null) {
    return;
  }

  const doc = db.doc(
    [config.firebase.collectionPath, onboardingSessionId].join("/")
  );

  if ((await doc.get()).exists) {
    if (cursor === true) {
      await doc.update({
        main_quiz_done: true,
      });
    } else {
      await doc.update({
        quiz_cursor: cursor,
      });
    }
  } else {
    await doc.set({
      quiz_cursor: cursor,
    });
  }
}
