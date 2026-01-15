import {
  useOnboardingFlow,
  useOnboardingFlowImageUrls,
} from "@/context/OnboardingFlowContext";
import { Fonts, Greys } from "@/design_components/design_system";
import { Content as ContentModel } from "@/models/OnboardingFlow/model";
import styled from "styled-components";
import { createRichText } from "./RichText";
import { Fragment } from "react";
import { Testimonial } from "@/components/Testimonial";

export function Content({ 
  content,
dark,
hasFullSpaceImage,
}: { 
  content: ContentModel;
  dark?: boolean;
  hasFullSpaceImage?: boolean;
}) {
  const model = useOnboardingFlow();

  const testimonial = model.highlighted_testimonial;
  const testimonialDisclaimer = model.testimonial_disclaimer;
  const imageUrls = useOnboardingFlowImageUrls();
  switch (content.type) {
    case "emoji": {
      return <Emoji>{content.emoji}</Emoji>;
    }
    case "image": {
      return <Image {...content} />;
    }
    case "text": {
      if (content.variant === "highlight") {
        const HighlightComponent = dark
          ? hasFullSpaceImage
            ? TextHighlightInFullScreenBackgroundContentDark
            : TextHighlightDark
          : hasFullSpaceImage
          ? TextHighlightInFullScreenBackgroundContent
          : TextHighlight;
        return (
          <HighlightComponent>{normalizeText(content.text)}</HighlightComponent>
        );
      }
      const TextComponent = dark
        ? hasFullSpaceImage
          ? TextNormalInFullScreenBackgroundContentDark
          : TextNormalDark
        : hasFullSpaceImage
        ? TextNormalInFullScreenBackgroundContent
        : TextNormal;
      return <TextComponent>{normalizeText(content.text)}</TextComponent>;
    }
    case "title": {
      const TitleComponent = dark
        ? hasFullSpaceImage
          ? TitleInFullScreenBackgroundContentDark
          : TitleDark
        : hasFullSpaceImage
        ? TitleInFullScreenBackgroundContent
        : Title;
      return <TitleComponent>{normalizeText(content.text)}</TitleComponent>;
    }
    case "testimonial": {
      return (
        <Fragment>
          <TestimonialContainer>
            <Testimonial compact {...testimonial} />
          </TestimonialContainer>
          {testimonialDisclaimer && (
            <TextSubtle>{testimonialDisclaimer}</TextSubtle>
          )}
        </Fragment>
      );
    }
    default: {
      return null;
    }
  }
}

function normalizeText(text: string | readonly string[]) {
  return typeof text === "string" ? text : text.join("<br>");
}

const Emoji = styled.div`
  ${Fonts.SFPro}
  font-size: 100px;
  margin-bottom: 30px;
`;

const TextNormal = createRichText(styled.p`
  ${Fonts.Inter}
  font-size: 17px;
  color: ${Greys.Grey26};
  margin-block: 20px;
  text-align: center;
`);

const TextSubtle = createRichText(styled.p`
  ${Fonts.Inter}
  font-size: 14px;
  color: ${Greys.Grey4D};
  margin-block: 20px;
  text-align: center;
`);

const Title = createRichText(styled.h2`
  ${Fonts.Inter}
  font-size: 24px;
  font-weight: 600;
  margin-block: 20px;
  text-align: center;
`);

const TestimonialContainer = styled.div`
  padding-top: 40px;
  padding-bottom: 0px;
`;
