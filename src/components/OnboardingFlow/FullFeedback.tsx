"use client";
import { ForwardNavButton } from "@/components/ForwardNavButton";
import { Purples } from "@/design_components/design_system";
import { PageLayout } from "@/design_components/PageLayout";
import {
  FullFeedback as FullFeedbackModel,
  Content as ContentModel,
} from "@/models/OnboardingFlow/model";
import { Content } from "./Content";
import styled from "styled-components";
import { fadeIn } from "@/utils/style_partials";
import { AppHeader } from "@/components/AppHeader";
import { Fragment } from "react";

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
        <FeedbackContent>
          {feedback.contents.map((content, index) => (
            <Fragment key={index}>
              <Content content={content} />
              {index < feedback.contents.length - 1 && <ContentSpacer />}
            </Fragment>
          ))}
        </FeedbackContent>
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

const FeedbackContent = styled.div`
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  height: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentSpacer = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    prop !== "contentTypeBefore" && prop !== "contentTypeAfter",
})<{
  contentTypeBefore?: ContentModel["type"];
  contentTypeAfter?: ContentModel["type"];
}>`
  flex-basis: 30px;
  flex-shrink: 1;
  flex-grow: 0;
`;
