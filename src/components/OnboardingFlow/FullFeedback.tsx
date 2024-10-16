"use client";
import { FullFeedback as FullFeedbackModel } from "@/models/OnboardingFlow/model";
import { useContext } from "react";
import { Content } from "./Content";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { ForwardNavButton } from "@/components/ForwardNavButton";
import styled from "styled-components";
import { Purples } from "@/design_components/design_system";

export function FullFeedback({ feedback }: { feedback: FullFeedbackModel }) {
  const { next } = useContext(onboardingFlowContext);
  return (
    <FeedbackPane>
      {feedback.contents.map((content, index) => (
        <Content key={index} content={content} />
      ))}
      <ForwardNavButton onClick={next} />
    </FeedbackPane>
  );
}

const FeedbackPane = styled.section`
  background-color: ${Purples.PurpleF5_Undocumented};
`;
