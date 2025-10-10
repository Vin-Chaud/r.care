import { RCareBrand } from "@/components/icons/RCareBrand";
import { Fonts, Greys } from "@/design_components/design_system";
import styled from "styled-components";

export function Chart() {
  return null;
}

const BrandPositioner = styled.g`
  transform: translate(-84px, 137px);
`;

const SelfWillText = styled.text`
  ${Fonts.SFPro};
  font-size: 20px;
  font-weight: 600;
  fill: ${Greys.Black};
`;

const XAxisText = styled.text`
  ${Fonts.SFPro};
  font-size: 12px;
  font-weight: 600;
  fill: ${Greys.Grey96};
`;

const XAxisLabel = styled.text`
  ${Fonts.Montserrat}
  font-size: 16px;
  font-weight: 700;
  fill: ${Greys.Black};
`;
