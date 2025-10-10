import { AppHeader } from "@/components/AppHeader";
import { ForwardNavButton } from "@/components/ForwardNavButton";
import { Content } from "@/components/OnboardingFlow/Content";
import { PageLayout } from "@/design_components/PageLayout";
import styled from "styled-components";

export function PostQuizPane({ onNext }: { onNext: () => void }) {
  return (
    <PageLayout>
      <AppHeader>{{ branding: true }}</AppHeader>
      <SectionLayout>
        <Content content={{ type: "emoji", emoji: "🪽" }} />
        <Content
          content={{
            type: "text",
            text: "Now, we’re here to help you turn your online dating potential into real success.",
          }}
        />
      </SectionLayout>
      <ForwardNavButton onClick={onNext} />
    </PageLayout>
  );
}

const SectionLayout = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
