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

function Image({ graphic_id, max_height, full_screen, style }: Content_Image)
  {
    const imageUrls = useOnboardingFlowImageUrls();
    if (full_screen) {
      return (
        <>
          <FullScreenImage src={imageUrls[graphic_id]} />
          <FullScreenImageSeparator />
        </>
      );
    }
    return (
      <img
        src={imageUrls[graphic_id]}
        style={{ maxHeight: max_height, maxWidth: "100%", ...(style || {}) }}
      />
    );
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
const TextNormalDark = createRichText(styled.p`
  ${Fonts.Inter}
  font-size: 17px;
  line-height: 23px;
  color: ${Greys.GreyAF};
  margin-block: 15px;
  text-align: center;
`);

const TextNormalInFullScreenBackgroundContent = createRichText(styled.p`
  ${Fonts.Inter}
  font-size: 17px;
  line-height: 20px;
  margin-block: 15px;
  text-align: center;
`);

const TextNormalInFullScreenBackgroundContentDark = createRichText(styled.p`
  ${Fonts.Inter}
  font-size: 17px;
  line-height: 20px;
  color: ${Greys.GreyAF};
  margin-block: 15px;
  text-align: center;
`);

const TextHighlight = createRichText(styled.p`
  ${Fonts.Montserrat}
  font-weight: 500;
  font-size: 20px;
  color: #7836cd;
  margin-block: 15px;
  text-align: center;
`);

const TextHighlightDark = createRichText(styled.p`
  ${Fonts.Montserrat}
  font-weight: 500;
  font-size: 20px;
  color: ${Purples.PurpleCA_Undocumented};
  margin-block: 15px;
  text-align: center;
`);

const TextHighlightInFullScreenBackgroundContent = createRichText(styled.p`
  ${Fonts.Montserrat}
  font-weight: 500;
  font-size: 18px;
  color: #7836cd;
  margin-block: 15px;
  text-align: center;
`);

const TextHighlightInFullScreenBackgroundContentDark = createRichText(styled.p`
  ${Fonts.Montserrat}
  font-weight: 500;
  font-size: 18px;
  color: ${Purples.PurpleCA_Undocumented};
  margin-block: 15px;
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

const TitleDark = createRichText(styled.h2`
  ${Fonts.Inter}
  color: ${Greys.GreyDF};
  font-size: 24px;
  font-weight: 600;
  margin-block: 20px;
  text-align: center;
`);


export const TitleInFullScreenBackgroundContent = createRichText(styled.h2`
  ${Fonts.Inter}
  font-size: 24px;
  font-weight: 600;
  margin-block: 10px;
  text-align: center;
`);

const TitleInFullScreenBackgroundContentDark = createRichText(styled.h2`
  ${Fonts.Inter}
  color: ${Greys.GreyDF};
  font-size: 24px;
  font-weight: 600;
  margin-block: 10px;
  text-align: center;
`);


const TestimonialContainer = styled.div`
  padding-top: 40px;
  padding-bottom: 0px;
`;

export const FullScreenImage = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "src",
})<{ src: string }>`
  position: fixed;
  display: block;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(#dacdff99, #dacdff99),
    url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  z-index: -10;

  @media (min-width: 420px) {
    display: none;
  }
`;

const FullScreenImageSeparator = styled.div`
  flex-grow: 1;
  @media (min-width: 420px) {
    display: none;
  }
`;
