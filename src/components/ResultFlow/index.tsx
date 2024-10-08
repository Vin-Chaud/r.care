import { useMemo } from "react";
import { computePercentageScores } from "../../models/OnboardingFlow/methods";
import { OnboardingFlow } from "../../models/OnboardingFlow/model";

export function ResultFlow({
  responses,
  flow,
}: {
  responses: Readonly<Record<string, unknown>>;
  flow: OnboardingFlow;
}) {
  const percentageScores = useMemo(() => {
    return computePercentageScores(flow, responses);
  }, [responses, flow]);

  return (
    <div>
      result
      <pre>{JSON.stringify(percentageScores, null, 2)}</pre>
    </div>
  );
}
