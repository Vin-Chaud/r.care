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

export function Content({ content }: { content: ContentModel }) {
  const model = useOnboardingFlow();

  const testimonial = model.highlighted_testimonial;
  const testimonialDisclaimer = model.testimonial_disclaimer;
  const imageUrls = useOnboardingFlowImageUrls();
  switch (content.type) {
    case "emoji": {
      return <Emoji scale={content.scale}>{content.emoji}</Emoji>;
    }
    case "image": {
      return (
        <img
          src={imageUrls[content.graphic_id]}
          style={{ maxHeight: content.max_height ?? 200, maxWidth: "100%" }}
        />
      );
    }
    case "text": {
      if (content.variant === "subtle") {
        return <TextSubtle>{normalizeText(content.text)}</TextSubtle>;
      }
      return <TextNormal>{normalizeText(content.text)}</TextNormal>;
    }
    case "title": {
      return <Title>{normalizeText(content.text)}</Title>;
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

const Emoji = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "scale",
})<{ scale?: number }>`
  ${Fonts.SFPro}
  font-size: ${(props) => 100 * (props.scale ?? 1)}px;
  margin-block: 0px;
`;

const TextNormal = createRichText(styled.p`
  ${Fonts.SFPro}
  font-size: 17px;
  color: ${Greys.Grey26};
  margin-block: 0px;
  text-align: center;
`);

const TextSubtle = createRichText(styled.p`
  ${Fonts.SFPro}
  font-size: 14px;
  color: ${Greys.Grey4D};
  margin-block: 0px;
  text-align: center;
`);

const Title = createRichText(styled.h2`
  ${Fonts.SFPro}
  font-size: 24px;
  font-weight: 600;
  margin-block: 0px;
  text-align: center;
`);

const TestimonialContainer = styled.div`
  padding-top: 0px;
  padding-bottom: 0px;
`;
