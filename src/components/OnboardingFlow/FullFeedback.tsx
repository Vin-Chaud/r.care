"use client";
import { ForwardNavButton } from "@/components/ForwardNavButton";
import { Purples } from "@/design_components/design_system";
import { PageLayout } from "@/design_components/PageLayout";
import { FullFeedback as FullFeedbackModel } from "@/models/OnboardingFlow/model";
import { Content } from "./Content";
import styled from "styled-components";
import { fadeIn } from "@/utils/style_partials";
import { AppHeader } from "@/components/AppHeader";

export function FullFeedback({
  feedback,
  onNext,
}: {
  feedback: FullFeedbackModel;
  onNext(): void;
}) {
  return (
    <PageLayout background={Purples.PurpleF5_Undocumented}>
      <FeedbackLayout>
        <AppHeader>{{ branding: true }}</AppHeader>
        {feedback.contents.map((content, index) => (
          <Content key={index} content={content} />
        ))}
        <ForwardNavButton onClick={onNext} />
      </FeedbackLayout>
    </PageLayout>
  );
}

const FeedbackLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  ${fadeIn}
`;
