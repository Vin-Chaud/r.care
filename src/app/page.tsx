import { defaultOnboardingFlow } from "@/models/default_flow";
import { getGraphics } from "@/models/OnboardingFlow/methods";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import assert from "assert";
import { readFile } from "fs/promises";
import { glob } from "glob";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import path from "path";
import { config } from "../config";
import { HomeClient } from "./MainPageClient";

export default async function HomeServer() {
  const onboardingSessionId = new ReadonlySession(
    cookies
  ).getExistingSessionIfExists();
  assert(onboardingSessionId);

  const onboardingDoc = await db
    .doc([config.firebase.collectionPath, onboardingSessionId].join("/"))
    .get();

  if (onboardingDoc.exists) {
    if (onboardingDoc.data()?.checkout != null) {
      redirect("/onboarding_complete");
    }
  }

  const flow = defaultOnboardingFlow;
  const allImages = getGraphics(flow);

  const imageUrls = Object.fromEntries(
    await Promise.all(
      [...allImages].map(async (graphicId) => {
        const dataUrl = await loadImageAsBase64(graphicId);
        if (!dataUrl) return null;
        return [graphicId, dataUrl] as const;
      })
    ).then((entries) => entries.filter((entry) => entry != null))
  );

  return <HomeClient flow={flow} imageUrls={imageUrls} />;
}

async function loadImageAsBase64(graphicId: string) {
  const imagePathBase = path.join(process.cwd(), "public", graphicId);

  // Look for the extension of the image file. There's only one.
  const imageFiles = await glob(imagePathBase + ".*");
  if (imageFiles.length === 0) {
    return null;
  }
  const extension = path.extname(imageFiles[0]).slice(1);
  const mimeTypeMap = {
    svg: "svg+xml",
    png: "png",
  } as Record<string, string>;

  const imageBuffer = await readFile(imageFiles[0]);
  const base64Image = imageBuffer.toString("base64");

  return `data:image/${mimeTypeMap[extension]};base64,${base64Image}`;
}
