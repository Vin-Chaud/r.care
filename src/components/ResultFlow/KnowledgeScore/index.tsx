import { ForwardNavButton } from "@/components/ForwardNavButton";
import { Experience } from "@/models/Metric";
import {
  computePercentageScores,
  getEchoText,
} from "@/models/OnboardingFlow/methods";
import { OnboardingFlow } from "@/models/OnboardingFlow/model";

export function KnowledgeScorePage({
  responses,
  flow,
  onNext,
}: {
  responses: Readonly<Record<string, unknown>>;
  flow: OnboardingFlow;
  onNext: () => void;
}) {
  const knowledgePercentageScore = computePercentageScores(flow, responses)[
    Experience.Knowledge
  ];

  return (
    <section>
      <header>
        <h2>
          {"Your binge eating knowledge based on all your answers today :"}
        </h2>
      </header>

      <output style={{ backgroundColor: "#F9F4FF" }}>
        {knowledgePercentageScore.toFixed(0) + "%"}
      </output>

      <ul>
        {flow.knowledge_plan.map((spec, itemIndex) => (
          <li key={itemIndex}>
            <EchoPane
              key={spec.step_id}
              prompt={spec.prompt}
              echo={getEchoText(responses, spec)}
              color={spec.color}
            />
          </li>
        ))}
      </ul>

      <p>{"This is a good start but what happens if you stick with R.care?"}</p>
      <ForwardNavButton onClick={onNext} />
    </section>
  );
}

function EchoPane({
  prompt,
  echo,
  color,
}: {
  prompt: string;
  echo: string;
  color: string;
}) {
  return (
    <section>
      <div>{prompt}</div>
      <div style={{ backgroundColor: color }}>{echo}</div>
    </section>
  );
}
