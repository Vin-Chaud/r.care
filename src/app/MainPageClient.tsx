"use client";

import { saveQuizData } from "@/actions/saveQuizData";
import { AnalysisTransition } from "@/components/AnalysisTransition";
import { Landing } from "@/components/Landing";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { Paywall } from "@/components/Paywall";
import { ResultFlow } from "@/components/ResultFlow";
import { WithPopupHost } from "@/components/WithPopupHost/index";
import { OnboardingFlowContext } from "@/context/OnboardingFlowContext";
import { OnboardingFlow as OnboardingFlowModel } from "@/models/OnboardingFlow/model";
import { useEffect, useMemo, useState } from "react";

export function HomeClient({
  flow,
  imageUrls,
}: {
  flow: OnboardingFlowModel;
  imageUrls: Readonly<Record<string, string>>;
}) {
  const [quizResponses, setQuizResponses] = useState<
    Readonly<Record<string, unknown>>
  >({});
  const [isLandingDone, setLandingDone] = useState(false);
  const [isOnboardingDone, setOnboardingDone] = useState(false);
  const [isAnalysisTransitionDone, setAnalysisTransitionDone] = useState(false);
  const [isResultDone, setResultDone] = useState(false);

  useEffect(() => {
    if (Object.keys(quizResponses).length > 0) {
      saveQuizData(quizResponses);
    }
  }, [quizResponses]);

  const onboardingFlowContextValue = useMemo(
    () => ({ flow, imageUrls }),
    [flow, imageUrls]
  );

  return (
    <OnboardingFlowContext.Provider value={onboardingFlowContextValue}>
      <WithPopupHost>
        {!isLandingDone ? (
          <Landing
            flow={flow}
            onNext={(quizAnswer) => {
              setQuizResponses({ [flow.landing_quiz_step.id]: quizAnswer });
              setLandingDone(true);
            }}
          />
        ) : !isOnboardingDone ? (
          <OnboardingFlow
            onBackNavigated={() => setLandingDone(false)}
            onResponseUpdate={setQuizResponses}
            onFlowComplete={() => setOnboardingDone(true)}
          />
        ) : !isAnalysisTransitionDone ? (
          <AnalysisTransition
            spec={flow}
            onDone={() => setAnalysisTransitionDone(true)}
            onPopupQuizDidAnswer={(response) => {
              setQuizResponses({
                ...quizResponses,
                [flow.popup_quiz_step.id]: response,
              });
            }}
          />
        ) : !isResultDone ? (
          <ResultFlow
            flow={flow}
            responses={quizResponses}
            onReactionDidAnswer={(reaction) => {
              setQuizResponses({
                ...quizResponses,
                [flow.reaction_step_id]: reaction,
              });
            }}
            onNext={() => setResultDone(true)}
          />
        ) : (
          <Paywall />
        )}
      </WithPopupHost>
    </OnboardingFlowContext.Provider>
  );
}
