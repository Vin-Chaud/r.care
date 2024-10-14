"use client";
import { FullFeedback as FullFeedbackModel } from "@/models/OnboardingFlow/model";
import { useContext } from "react";
import { Content } from "./Content";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { ForwardNavButton } from "@/components/ForwardNavButton";

export function FullFeedback({ feedback }: { feedback: FullFeedbackModel }) {
  const { next } = useContext(onboardingFlowContext);
  return (
    <div>
      {feedback.contents.map((content, index) => (
        <Content key={index} content={content} />
      ))}
      <ForwardNavButton onClick={next} />
    </div>
  );
}
