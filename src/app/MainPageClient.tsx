"use client";

import { saveQuizData } from "@/actions/saveQuizData";
import { defaultOnboardingFlow } from "@/assets/default_flow";
import { AnalysisTransition } from "@/components/AnalysisTransition";
import { Landing } from "@/components/Landing";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { Paywall } from "@/components/Paywall";
import { ResultFlow } from "@/components/ResultFlow";
import { WithPopupHost } from "@/components/WithPopupHost/index";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export function HomeClient() {
  const flow = defaultOnboardingFlow;

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

  return (
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
          spec={flow}
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
  );
}
