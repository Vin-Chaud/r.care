"use client";

import { defaultOnboardingFlow } from "@/assets/default_flow";
import { AnalysisTransition } from "@/components/AnalysisTransition";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { ResultFlow } from "@/components/ResultFlow";
import { WithPopupHost } from "@/components/WithPopupHost/index";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [onboardingResponses, setOnboardingResponses] = useState<Readonly<
    Record<string, unknown>
  > | null>(null);

  const [isAnalysisTransitionDone, setAnalysisTransitionDone] = useState(false);

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
          />
        ) : (
          <ResultFlow
            flow={defaultOnboardingFlow}
            responses={onboardingResponses}
          />
        )}
      </div>
    </WithPopupHost>
  );
}
