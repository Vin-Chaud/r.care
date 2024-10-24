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
  const flow = defaultOnboardingFlow;
  const onboardingSessionId = new ReadonlySession(cookies).getSessionifExists();
  if (!onboardingSessionId) {
    redirect("/");
  }

  const onboardingDoc = await db
    .doc([config.firebase.collectionPath, onboardingSessionId].join("/"))
    .get();

  if (!onboardingDoc.exists) {
    redirect("/");
  }

  const data = onboardingDoc.data();
  if (!data?.main_quiz_done || !data?.quiz_data) {
    redirect("/quiz");
  }

  if (data.checkout != null) {
    redirect("/onboarding_complete");
  }

  if (data.quiz_data?.[flow.popup_quiz_step.id] == null) {
    redirect("/analysis");
  }

  const imageUrls = await getGraphicImageUrls(flow, GraphicSection.Result);
  return (
    <ResultClient
      flow={flow}
      imageUrls={imageUrls}
      responses={data.quiz_data}
    />
  );
}
