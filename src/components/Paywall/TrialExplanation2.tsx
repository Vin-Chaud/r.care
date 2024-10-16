import { ForwardNavButton } from "@/components/ForwardNavButton";
import { MarkdownText } from "@/design_components/typography/MarkdownText";

export function TrialExplanation2({ onNext }: { onNext: () => void }) {
  return (
    <section>
      <header>
        <p>{"💜"}</p>
        <h2>{"We can help."}</h2>
      </header>
      <p style={{ color: "#945DD9" }}>
        {"We’re not here to waste your time & money."}
      </p>
      <p>
        {
          "We know that you have a busy schedule and life happens, so we offer a guarantee:"
        }
      </p>
      <ul>
        <li>{"We’ll send you a reminder before your trial ends."}</li>
        <li>{"You can cancel at any time."}</li>
        <MarkdownText tag="li">
          {
            "If you go through the R.care program for 30 days and don't see results, we offer 200% money back."
          }
        </MarkdownText>
      </ul>
      <ForwardNavButton onClick={onNext} />
    </section>
  );
}
