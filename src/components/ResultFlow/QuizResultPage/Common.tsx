import { Fonts, Greys } from "@/design_components/design_system";
import styled from "styled-components";

export const SectionHeader = styled.h2`
  ${Fonts.Montserrat}
  font-size: 19px;
  font-weight: 500;
  margin-bottom: 30px;
  text-align: center;

  strong {
    font-weight: 700;
  }
`;

export const SectionSubHeader = styled.p`
  ${Fonts.SFPro};
  font-weight: 400;
  font-size: 15px;
  margin-top: 15px;
  margin-bottom: 25px;
  text-align: left;
  color: ${Greys.Grey83};
`;

export const SectionLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;

  &:last-child {
    margin-bottom: 0;
  }
`;
