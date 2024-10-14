import { ForwardNavButton } from "@/components/ForwardNavButton";

export function TrialExplanation1({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <header>
        <p>{"💡"}</p>
        <h2>{"Try R.care for 7 days to see if it works for you."}</h2>
      </header>
      <p style={{ color: "#945DD9" }}>
        {
          "Join thousands who have overcome binge eating & transformed their lives."
        }
      </p>
      <ul>
        <li>
          {
            "Read all our bitesized learning modules on the psychology and nutrition behind binge eating behavior."
          }
        </li>
        <li>{"Use proven psychological techniques to stop binge eating."}</li>
      </ul>
      <ForwardNavButton onClick={onNext} />
    </section>
  );
}
