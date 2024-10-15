"use server";

import { config } from "@/config";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { cookies } from "next/headers";

export async function saveQuizData(data: Readonly<Record<string, unknown>>) {
  const onboardingSessionId = new ReadonlySession(
    cookies
  ).getExistingSessionIfExists();
  if (onboardingSessionId != null) {
    const docRef = doc(db, config.firebase.collectionPath, onboardingSessionId);
    if ((await getDoc(docRef)).exists()) {
      await updateDoc(docRef, {
        quiz_data: data,
        last_updated: new Date().toISOString(),
      });
    } else {
      await setDoc(docRef, {
        quiz_data: data,
        last_updated: new Date().toISOString(),
        created: new Date().toISOString(),
      });
    }
  }
}
