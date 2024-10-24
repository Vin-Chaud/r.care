import { QuizClient } from "@/app/quiz/QuizClient";
import { getGraphicImageUrls } from "@/app/utils";
import { config } from "@/config";
import { defaultOnboardingFlow } from "@/models/default_flow";
import { GraphicSection } from "@/models/OnboardingFlow/getGraphics";
import { Cursor } from "@/models/OnboardingFlow/methods";
import { db } from "@/services/firebase";
import { ReadonlySession } from "@/services/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function QuizServer() {
  const flow = defaultOnboardingFlow;
  const onboardingSessionId = new ReadonlySession(cookies).getSessionifExists();
  if (!onboardingSessionId) {
    redirect("/");
  }

  const onboardingDoc = await db
    .doc([config.firebase.collectionPath, onboardingSessionId].join("/"))
    .get();

  let data = null;
  if (onboardingDoc.exists) {
    data = onboardingDoc.data();
    if (data?.checkout != null) {
      redirect("/onboarding_complete");
    }

    if (data?.main_quiz_done === true) {
      if (data?.quiz_data?.[flow.popup_quiz_step.id] != null) {
        redirect("/result");
      } else {
        redirect("/analysis");
      }
    }
  }

  const initialResponses: Readonly<Record<string, unknown>> =
    data?.quiz_data || {};
  const initialCursor: Cursor = data?.quiz_cursor || {
    currentSectionIndex: 0,
    currentSubsectionIndex: 0,
    currentStepIndex: 0,
  };

  const imageUrls = await getGraphicImageUrls(flow, GraphicSection.MainQuiz);
  return (
    <QuizClient
      flow={flow}
      imageUrls={imageUrls}
      initialResponses={initialResponses}
      initialCursor={initialCursor}
    />
  );
}
