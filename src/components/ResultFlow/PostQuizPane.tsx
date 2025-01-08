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
        <Content content={{ type: "emoji", emoji: "🎉" }} />
        <Content
          content={{
            type: "text",
            text: "We’ve listened to your answers and created a personalized plan just for you.",
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
