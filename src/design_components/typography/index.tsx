import { createMarkdownText } from "@/design_components/typography/MarkdownText";
import { Fonts, Greys } from "@/design_components/design_system";

import { styled } from "styled-components";

export const LandingHeader = createMarkdownText(styled.h1`
  ${Fonts.SFPro}

  ${{ c: 0 }}
  font-size: 30px;
  line-height: 35px;
  font-weight: normal;
  color: ${Greys.Grey4D};

  strong {
    font-weight: bold;
    color: ${Greys.Black};
  }
`);

export const LandingQuizTitle = createMarkdownText(styled.h2`
  ${Fonts.Montserrat}
  font-size: 14px;
  font-weight: 600;
  line-height: 16.29px;
  text-align: center;
  color: ${Greys.Grey4D};
`);

export const LandingQuizHelpText = createMarkdownText(styled.p`
  ${Fonts.SFPro}
  font-size: 14px;
  line-height: 16.29px;
  text-align: center;
  color: ${Greys.GreyA7};
`);
