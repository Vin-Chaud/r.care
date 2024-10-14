"use client";

import { defaultOnboardingFlow } from "@/assets/default_flow";
import { AnalysisTransition } from "@/components/AnalysisTransition";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { ResultFlow } from "@/components/ResultFlow";
import { WithPopupHost } from "@/components/WithPopupHost/index";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

import { saveDocument } from "@/actions/saveDocument";
import { Paywall } from "@/components/Paywall";
import { customAlphabet } from "nanoid/non-secure";

export default function Home() {
  const [onboardingResponses, setOnboardingResponses] = useState<Readonly<
    Record<string, unknown>
  > | null>(null);

  const [isAnalysisTransitionDone, setAnalysisTransitionDone] = useState(false);
  const [isResultDone, setResultDone] = useState(false);

  useEffect(() => {
    if (onboardingResponses) {
      const documentId =
        localStorage.getItem("onboarding_document_id") ||
        customAlphabet("1234567890abcdef", 20)();
      localStorage.setItem("onboarding_document_id", documentId);
      saveDocument(onboardingResponses, documentId);
    }
  }, [onboardingResponses]);

  return (
    <WithPopupHost>
      <div className={styles.page} style={{ position: "relative" }}>
        {!onboardingResponses ? (
          <OnboardingFlow
            spec={defaultOnboardingFlow}
            onFlowComplete={(state) => setOnboardingResponses(state.responses)}
          />
        ) : !isAnalysisTransitionDone ? (
          <AnalysisTransition
            spec={defaultOnboardingFlow}
            onDone={() => setAnalysisTransitionDone(true)}
            onPopupQuizDidAnswer={(response) => {
              setOnboardingResponses({
                ...onboardingResponses,
                [defaultOnboardingFlow.popup_quiz_step.id]: response,
              });
            }}
          />
        ) : !isResultDone ? (
          <ResultFlow
            flow={defaultOnboardingFlow}
            responses={onboardingResponses}
            onReactionDidAnswer={(reaction) => {
              setOnboardingResponses({
                ...onboardingResponses,
                [defaultOnboardingFlow.reaction_step_id]: reaction,
              });
            }}
            onNext={() => setResultDone(true)}
          />
        ) : (
          <Paywall />
        )}
      </div>
    </WithPopupHost>
  );
}
