"use client";

import { defaultOnboardingFlow } from "@/assets/default_flow";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import styles from "./page.module.css";
import { useState } from "react";
import { AnalysisTransition } from "../components/AnalysisTransition";
import { ResultFlow } from "../components/ResultFlow";

export default function Home() {
  const [onboardingResponses, setOnboardingResponses] = useState<Readonly<
    Record<string, unknown>
  > | null>(null);

  const [isAnalysisTransitionDone, setAnalysisTransitionDone] = useState(false);

  return (
    <div className={styles.page}>
      {!onboardingResponses ? (
        <OnboardingFlow
          spec={defaultOnboardingFlow}
          onFlowComplete={(state) => setOnboardingResponses(state.responses)}
        />
      ) : !isAnalysisTransitionDone ? (
        <AnalysisTransition onDone={() => setAnalysisTransitionDone(true)} />
      ) : (
        <ResultFlow
          flow={defaultOnboardingFlow}
          responses={onboardingResponses}
        />
      )}
    </div>
  );
}
