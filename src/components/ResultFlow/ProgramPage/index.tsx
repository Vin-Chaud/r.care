import { ForwardNavButton } from "@/components/ForwardNavButton";
import { MarkdownText } from "@/design_components/typography/MarkdownText";
import { getEchoText } from "@/models/OnboardingFlow/methods";
import { OnboardingFlow } from "@/models/OnboardingFlow/model";

export function ProgramPage({
  responses,
  flow,
  onNext,
}: {
  responses: Readonly<Record<string, unknown>>;
  flow: OnboardingFlow;
  onNext: () => void;
}) {
  const currentEpisodeCount = Number.parseInt(
    String(responses[flow.current_episode_count_id])
  );
  const targetEpisodeCount = Number.parseInt(
    String(responses[flow.target_episode_count_id])
  );
  const reductionPercentage = Math.round(
    ((currentEpisodeCount - targetEpisodeCount) / currentEpisodeCount) * 100
  );

  return (
    <section>
      <h2>{"Your personalized program will help you reduce your symptoms."}</h2>
      <pre>Graphic placeholder</pre>
      <p>
        {`We will work together to reduce your binge eating episodes by ${reductionPercentage}% in first three months.`}
      </p>
      <div style={{ display: "flex" }}>
        <div>
          <span>{"now"}</span>
          <div>
            <div>{currentEpisodeCount}</div>
            <div>{"times/week"}</div>
          </div>
        </div>
        <div>
          <pre>{"-->"}</pre>
        </div>
        <div>
          <span>{"in 3 months"}</span>
          <div>
            <div>{targetEpisodeCount}</div>
            <div>{"times/week"}</div>
          </div>
        </div>
      </div>

      <ul>
        {flow.program_plan.map((spec, itemIndex) => (
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

      <section>
        <header>
          <h2>
            {"Stop struggling alone"}
            <br />
            <strong>{"We will help you"}</strong>
          </h2>
        </header>
        <ol>
          <MarkdownText tag="li">
            {"**Understand more** about root causes of binge eating"}
          </MarkdownText>
          <MarkdownText tag="li">
            {"**Identify** ways **binge eating** affects you"}
          </MarkdownText>
          <MarkdownText tag="li">
            {"Find practical **tips to manage the symptoms**"}
          </MarkdownText>
          <MarkdownText tag="li">
            {"Learn to **understand and accept yourself**"}
          </MarkdownText>
          <MarkdownText tag="li">
            {"Reinforce your new, **healthier behaviors**"}
          </MarkdownText>
        </ol>

        <ForwardNavButton onClick={onNext} />
      </section>
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
    <section style={{ backgroundColor: color }}>
      <div>{prompt}</div>
      <div>{echo}</div>
    </section>
  );
}
