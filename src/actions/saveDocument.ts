"use server";

import { db } from "@/services/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function saveDocument(data: unknown) {
  try {
    const docRef = await addDoc(collection(db, "your-collection-name"), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Failed to save document.");
  }
}
