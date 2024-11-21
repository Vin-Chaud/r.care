import { AppHeader } from "@/components/AppHeader";
import { ForwardNavButton } from "@/components/ForwardNavButton";
import {
  useOnboardingFlow,
  useOnboardingFlowImageUrls,
} from "@/context/OnboardingFlowContext";
import {
  ScrollablePageContentFrame,
  ScrollablePageLayoutContainer,
} from "@/design_components/PageLayout";
import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { Disclaimer } from "@/design_components/typography";
import { createMarkdownText } from "@/design_components/typography/MarkdownText";
import { useEffect } from "react";
import styled from "styled-components";

export function Testimonial({ onNext }: { onNext: () => void }) {
  const model = useOnboardingFlow().interview;
  const imageUrl = useOnboardingFlowImageUrls()[model.graphic_id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScrollablePageLayoutContainer>
      <ScrollablePageContentFrame background={Greys.White}>
        <article>
          <AppHeader>{{ branding: true }}</AppHeader>
          <HeaderImageGroup>
            <Header>
              <p>{model.subtitle}</p>
              <h2>{model.title}</h2>
            </Header>
            <Graphic src={imageUrl} />
          </HeaderImageGroup>
          {model.questions.map(({ question, answer }, itemIndex) => (
            <Interview key={itemIndex} question={question} answer={answer} />
          ))}
          <ForwardNavButton onClick={onNext} />
          {model.disclaimer && (
            <DisclaimerContainer>
              <Disclaimer>{model.disclaimer}</Disclaimer>
            </DisclaimerContainer>
          )}
        </article>
      </ScrollablePageContentFrame>
    </ScrollablePageLayoutContainer>
  );
}

function Interview({ answer, question }: { answer: string; question: string }) {
  return (
    <InterviewSection>
      <header>
        <InterviewHeader>{question}</InterviewHeader>
      </header>
      <InterviewContent>{answer}</InterviewContent>
    </InterviewSection>
  );
}

const HeaderImageGroup = styled.div`
  position: relative;
`;

const Header = styled.header`
  width: 189px;
  height: 133px;
  top: 88px;
  left: 30px;
  gap: 0px;
  border-radius: 15px;
  opacity: 0px;
  z-index: 1;
  background-color: ${Purples.Purple94};
  ${Fonts.SFPro}
  padding:10px 20px 16px;
  box-sizing: border-box;
  color: ${Greys.White};
  margin-bottom: 200px;
  position: relative;
  top: 0px;
  left: 0px;

  p {
    font-size: 12px;
    font-weight: 400;
  }

  h2 {
    font-size: 22px;
    font-weight: 800;
    width: 140px;
  }
`;

const Graphic = styled.img`
  max-width: 180px;
  z-index: 0;
  position: absolute;
  top: 40px;
  right: 0px;
`;

const InterviewSection = styled.section`
  margin-bottom: 25px;
  border: 1px solid ${Greys.GreyD1};
  border-radius: 15px;
  padding: 25px 15px;
`;

const InterviewHeader = styled.h3`
  margin-top: 0px;
  margin-bottom: 25px;

  ${Fonts.SFPro};
  font-weight: 500;
  font-size: 14px;
`;

const InterviewContent = createMarkdownText(styled.p`
  ${Fonts.Montserrat};
  font-size: 11px;
  font-weight: 400;

  strong {
    font-weight: 700;
  }

  color: ${Greys.Black};
  margin-block: 0px;
  padding: 25px;
  background-color: ${Purples.PurpleF5_Undocumented};
  border-radius: 15px;
`);

const DisclaimerContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 40px;
`;
