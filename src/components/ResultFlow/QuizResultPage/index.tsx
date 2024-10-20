import { AppHeader } from "@/components/AppHeader";
import {
  computePercentageScores,
  computeTotalScore,
} from "@/models/OnboardingFlow/methods";
import { OnboardingFlow } from "@/models/OnboardingFlow/model";
import { useMemo } from "react";
import { ImpactBreakdown } from "./ImpactBreakdown";
import { OverallScore } from "./OverallScore";
import { ReactionPanel } from "./ReactionPanel";
import { SymptomExplanations } from "./SymptomExplanations";
import { SymptomScoreBreakdown } from "./SymptomScoreBreakdown";
import { PageLayout } from "@/design_components/PageLayout";
import { Greys } from "@/design_components/design_system";

export function QuizResultPage({
  responses,
  flow,
  onNext,
}: {
  responses: Readonly<Record<string, unknown>>;
  flow: OnboardingFlow;
  onNext: (reaction: string | null) => void;
}) {
  const percentageScores = useMemo(() => {
    return computePercentageScores(flow, responses);
  }, [responses, flow]);

  return (
    <PageLayout background={Greys.White} scrollable>
      <AppHeader>{{ branding: true }}</AppHeader>
      <OverallScore
        totalPercentageScore={computeTotalScore(percentageScores)}
      />
      <SymptomScoreBreakdown percentageScores={percentageScores} />
      <ImpactBreakdown percentageScores={percentageScores} />
      <SymptomExplanations percentageScores={percentageScores} />
      <ReactionPanel
        onDidRespond={(answer) => {
          onNext(answer);
        }}
      />
    </PageLayout>
  );
}
