import { config } from "@/config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: config.firebase.apiKey,
  appId: config.firebase.appId,
  projectId: config.firebase.projectId,
});
const db = getFirestore(app);

export { db };
