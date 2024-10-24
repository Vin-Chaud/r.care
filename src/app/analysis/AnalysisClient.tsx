"use client";

import { saveQuizData } from "@/actions/saveQuizData";
import { AnalysisTransition } from "@/components/AnalysisTransition";
import { WithPopupHost } from "@/components/WithPopupHost/index";
import { OnboardingFlowContext } from "@/context/OnboardingFlowContext";
import { OnboardingFlow as OnboardingFlowModel } from "@/models/OnboardingFlow/model";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export function AnalysisClient({
  flow,
  imageUrls,
}: {
  flow: OnboardingFlowModel;
  imageUrls: Readonly<Record<string, string>>;
}) {
  const router = useRouter();
  const onboardingFlowContextValue = useMemo(
    () => ({ flow, imageUrls }),
    [flow, imageUrls]
  );

  return (
    <OnboardingFlowContext.Provider value={onboardingFlowContextValue}>
      <WithPopupHost>
        <AnalysisTransition
          spec={flow}
          onDone={() => {
            router.push("/result");
          }}
          onPopupQuizDidAnswer={(response) => {
            saveQuizData({ [flow.popup_quiz_step.id]: response }, null);
          }}
        />
      </WithPopupHost>
    </OnboardingFlowContext.Provider>
  );
}
