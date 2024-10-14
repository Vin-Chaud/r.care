"use server";

import { db } from "@/services/firebase";
import { doc, setDoc } from "firebase/firestore";

import { config } from "@/config";

export async function saveDocument(
  data: Readonly<Record<string, unknown>>,
  documentId: string
) {
  try {
    await setDoc(doc(db, config.firebase.collectionPath, documentId), data);
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Failed to save document.");
  }
}
