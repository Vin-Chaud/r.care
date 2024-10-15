import { getScoreZone, ScoreZone } from "@/models/OnboardingFlow/methods";
import { scoreZoneCopy } from "./copy";
import { FeedbackBox } from "./FeedbackBox";
import { ScoreGradientStops } from "./scoreColorEncoding";

export function OverallScore({
  totalPercentageScore,
}: {
  totalPercentageScore: number;
}) {
  const scoreZone = getScoreZone(totalPercentageScore);
  return (
    <section>
      <header>
        <h2>
          {"Your binge eating score is "}
          <strong>{scoreZoneCopy[scoreZone]}</strong>
        </h2>
      </header>
      <OverallScoreWheel totalPercentageScore={totalPercentageScore} />
      <p>
        {
          "The questions are based on the ‘Binge Eating Scale’ rating scale developed by Gormally et al. in 1982  and should only be used as an indicator of whether you may be at risk of having or developing a binge eating disorder. They are not intended to replace a professional diagnosis."
        }
      </p>
      <FeedbackBox title={"🧐 What does this mean?"}>
        {scoreZoneInterpretationCopy[scoreZone]}
      </FeedbackBox>
    </section>
  );
}

const wheelDiameter = 200;
const wheelThickness = 50;

function OverallScoreWheel({
  totalPercentageScore,
}: {
  totalPercentageScore: number;
}) {
  return (
    <div
      style={{
        width: wheelDiameter,
        height: wheelDiameter * 0.5,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: wheelDiameter,
          height: wheelDiameter,
          background: `conic-gradient(from -0.25turn, ${ScoreGradientStops.map(
            (stop) => `${stop.color} ${stop.at * 0.5 /*half circle*/}%`
          ).join(", ")})`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `conic-gradient(from -0.25turn, rgba(255,255,255,0) 0% ${
              totalPercentageScore * 0.5
            }%, white ${totalPercentageScore * 0.5}%)`,
          }}
        />
        <div
          style={{
            width: wheelDiameter - wheelThickness,
            height: wheelDiameter - wheelThickness,
            borderRadius: "50%",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <output style={{ position: "relative", top: "25%" }}>
            {totalPercentageScore + "%"}
          </output>
        </div>
      </div>
    </div>
  );
}
const scoreZoneInterpretationCopy: Readonly<Record<ScoreZone, string>> = {
  Low: "Your score is low, suggesting that you do not seem to be reporting common symptoms of a binge eating disorder. If you have completed this quiz because you feel out of control with food or have concerns about your eating habits, the program can be still helpful.",
  Medium:
    "Your score is medium, suggesting that you may be experiencing some symptoms of a binge eating disorder. If you have completed this quiz because you feel out of control with food or have concerns about your eating habits, the program can be helpful.",
  High: "Your score is high, suggesting that you may be experiencing many symptoms of a binge eating disorder. If you have completed this quiz because you feel out of control with food or have concerns about your eating habits, the program can be helpful.",
  VeryHigh:
    "Your score is very high, suggesting that severe binge eating disorder symptoms may be impacting your daily life.",
};
