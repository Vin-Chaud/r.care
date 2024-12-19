import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { createMarkdownText } from "@/design_components/typography/MarkdownText";
import styled, { css } from "styled-components";

const textStyle = css`
  ${Fonts.SFPro};
  font-size: 17px;
  font-style: regular;
  font-weight: 300;

  @media (max-height: 699px) {
    font-size: 15px;
  }
`;

export const TrialContents = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-grow: 1;
`;

export const H2 = styled.h2`
  ${Fonts.SFPro};
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

export const P = styled.p`
  ${textStyle}
  margin-block: 1em;

  @media (max-height: 599px) {
    margin-block: 0.5em;
  }
`;

export const Emoji = styled.div`
  ${Fonts.SFPro};
  font-size: 100px;
  margin-block: 25px;
  text-align: center;

  @media (max-height: 599px) {
    font-size: 80px;
    margin-block: 15px;
  }
`;

export const Highlight = styled.p`
  ${textStyle}
  text-align: center;
  color: ${Purples.Purple94};

  @media (max-height: 599px) {
    margin-block: 0.5em;
  }
`;

export const List = styled.ul`
  padding-left: 20px;
`;

export const ListItem = createMarkdownText(styled.li`
  ${textStyle}
  color: ${Greys.Grey26};
  margin-bottom: 1em;

  strong {
    font-weight: 700;
  }

  @media (max-height: 699px) {
    margin-bottom: 0.5em;
  }
`);
