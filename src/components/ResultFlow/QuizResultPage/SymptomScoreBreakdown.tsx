import { Symptom } from "@/models/Metric";
import { symptomCopy, symptomEmojis, SymptomOrdering } from "./copy";
import { computeScoreColor, ScoreGradientStops } from "./scoreColorEncoding";

export function SymptomScoreBreakdown({
  percentageScores,
}: {
  percentageScores: Readonly<Record<Symptom, number>>;
}) {
  return (
    <section>
      <header>
        <h2>{"How your score is calculated"}</h2>
        <p>
          {
            "Your symptoms fall into 3 main categories that impact different aspects of your life."
          }
        </p>
        <ul>
          {SymptomOrdering.map((metric) => (
            <ScoreBreakdownBar
              key={metric}
              title={symptomEmojis[metric] + " " + symptomCopy[metric]}
              percentageScore={percentageScores[metric]}
            />
          ))}
        </ul>
      </header>
    </section>
  );
}
function ScoreBreakdownBar({
  title,
  percentageScore,
}: {
  title: string;
  percentageScore: number;
}) {
  return (
    <li style={{ position: "relative" }}>
      <div>{title}</div>
      <div
        style={{
          width: "100%",
          height: "10px",
          borderRadius: "10px",
          background: `linear-gradient(to right, ${ScoreGradientStops.map(
            (stop) => `${stop.color} ${stop.at}%`
          ).join(", ")})`,
        }}
      />
      <div
        style={{
          position: "relative",
          left: `${percentageScore}%`,
          backgroundColor: computeScoreColor(percentageScore),
          color: "white",
          transform: "translateX(-50%)",
          marginBlockStart: "10px",
          width: "fit-content",
          padding: "5px",
        }}
      >
        {percentageScore.toFixed(0) + "%"}
      </div>
    </li>
  );
}
