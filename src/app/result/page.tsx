import { ResultClient } from "@/app/result/ResultClient";
import { getGraphicImageUrls } from "@/app/utils";
import { config } from "@/config";
import { defaultOnboardingFlow } from "@/models/default_flow";
import { GraphicSection } from "@/models/OnboardingFlow/getGraphics";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ResultServer() {
  console.log("1");
  const flow = defaultOnboardingFlow;
  console.log("2");
  const onboardingSessionId = new ReadonlySession(cookies).getSessionifExists();
  if (!onboardingSessionId) {
    redirect("/");
  }
  console.log("3");

  const onboardingDoc = await db
    .doc([config.firebase.collectionPath, onboardingSessionId].join("/"))
    .get();
  console.log("4");

  if (!onboardingDoc.exists) {
    redirect("/");
  }
  console.log("5");

  const data = onboardingDoc.data();
  if (!data?.main_quiz_done || !data?.quiz_data) {
    redirect("/quiz");
  }
  console.log("6");

  if (data.checkout != null) {
    redirect("/onboarding_complete");
  }
  console.log("7");

  if (data.quiz_data?.[flow.popup_quiz_step.id] == null) {
    redirect("/analysis");
  }
  console.log("8");

  const imageUrls = await getGraphicImageUrls(flow, GraphicSection.Result);
  console.log("9");
  return (
    <ResultClient
      flow={flow}
      imageUrls={imageUrls}
      responses={data.quiz_data}
    />
  );
}
