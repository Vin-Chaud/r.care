import { RCareBrand } from "@/components/icons/RCareBrand";
import { Fonts, Greys } from "@/design_components/design_system";
import styled from "styled-components";

export function Chart() {
  return (
    <svg
      width="280"
      viewBox="0 -80 303 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45 11H5V178H299V29C295 29 287 30 287 53C287 76 272 82 265 81C257 81 241 74 235 51C230 27 213 19 205 18C200 17 186 19 177 31C165 46 153 66 131 66C108 66 113 60 88 35C68 15 51 11 45 11Z"
        fill="#EBEBEB"
        fillOpacity="0.6"
      />
      <path
        d="M5 11C5 11 30 7 45 11C63 15 67 14 88 35C113 60 108 66 130 66C153 66 164 46 177 31C186 18 200 17 205 18C213 19 230 27 235 51C240 74 257 81 265 81C272 82 287 76 287 53C287 30 295 27 299 28"
        stroke="#C2C2C2"
        strokeWidth="4"
      />
      <path
        d="M131 77C75 22 26 10 8 11H5V178H300V146C219 146 154 100 131 77Z"
        fill="#EFE7F9"
      />
      <path
        d="M7 11C25 10 75 22 131 77C153 100 219 146 299 146"
        stroke="#945DD9"
        strokeWidth="4"
      />
      <BrandPositioner>
        <RCareBrand />
      </BrandPositioner>
      <SelfWillText x="150" y="80">
        {"Self-will"}
      </SelfWillText>
      <circle
        cx="10"
        cy="11"
        r="8"
        fill="#A885D4"
        stroke="#945DD9"
        strokeWidth="4"
      />
      <circle
        cx="293"
        cy="147"
        r="8"
        fill="#A885D4"
        stroke="#945DD9"
        strokeWidth="4"
      />
      <XAxisText
        x="0"
        y="205"
        textAnchor="endstart"
        alignmentBaseline="baseline"
      >
        {"Now"}
      </XAxisText>
      <XAxisText x="100%" y="205" textAnchor="end" alignmentBaseline="baseline">
        {"Week 12"}
      </XAxisText>
      <XAxisLabel
        x="50%"
        y="230"
        textAnchor="middle"
        alignmentBaseline="baseline"
      >
        {"No. Binge eating episodes"}
      </XAxisLabel>
    </svg>
  );
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
