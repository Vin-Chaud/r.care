"use client";
import { FullFeedback as FullFeedbackModel } from "@/models/OnboardingFlow/model";
import { useContext } from "react";
import { Content } from "./Content";
import { onboardingFlowContext } from "./onboardingFlowContext";

export function FullFeedback({ feedback }: { feedback: FullFeedbackModel }) {
  const { next } = useContext(onboardingFlowContext);
  return (
    <div>
      {feedback.contents.map((content, index) => (
        <Content key={index} content={content} />
      ))}
      <button type="button" onClick={next}>
        {"Continue"}
      </button>
    </div>
  );
}
