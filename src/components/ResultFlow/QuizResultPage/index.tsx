import { useMemo } from "react";
import {
  computePercentageScores,
  computeTotalScore,
} from "@/models/OnboardingFlow/methods";
import { OnboardingFlow } from "@/models/OnboardingFlow/model";
import { ImpactBreakdown } from "./ImpactBreakdown";
import { OverallScore } from "./OverallScore";
import { ReactionPanel } from "./ReactionPanel";
import { SymptomExplanations } from "./SymptomExplanations";
import { SymptomScoreBreakdown } from "./SymptomScoreBreakdown";

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
    <div>
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
    </div>
  );
}
