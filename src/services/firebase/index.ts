import { config } from "@/config";
import admin from "firebase-admin";

const app =
  admin.apps[0] ||
  admin.initializeApp(
    { credential: admin.credential.cert(config.firebase.credential) },
    "firestore"
  );

export const db = app.firestore();
