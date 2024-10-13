import { Symptom } from "@/models/Metric";
import {
  symptomCopy,
  symptomEmojis,
  SymptomExplanationAnswer,
  SymptomExplanationQuestion,
  SymptomOrdering,
} from "./copy";
import { QuestionAnswerBox } from "./QuestionAnswerBox";
import { computeScoreColor } from "./scoreColorEncoding";
import { MarkdownText } from "@/components/MarkdownText";

export function SymptomExplanations({
  percentageScores,
}: {
  percentageScores: Readonly<Record<Symptom, number>>;
}) {
  return (
    <section>
      <header>
        <h2>
          {"Your symptoms,"}
          <br />
          <strong>{"explained"}</strong>
        </h2>
        <p>
          {
            "Now let’s take a deeper look at how binge eating is impacting your well-being."
          }
        </p>
      </header>
      <ul>
        {SymptomOrdering.map((metric) => {
          return (
            <li key={metric}>
              <label
                style={{
                  backgroundColor: computeScoreColor(percentageScores[metric]),
                  color: "white",
                }}
              >
                <MarkdownText tag="span">
                  {"**" + percentageScores[metric].toFixed(0) + "%** High"}
                </MarkdownText>
              </label>
              <QuestionAnswerBox
                title={symptomEmojis[metric] + " " + symptomCopy[metric]}
                question={SymptomExplanationQuestion[metric]}
              >
                {SymptomExplanationAnswer[metric]}
              </QuestionAnswerBox>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
