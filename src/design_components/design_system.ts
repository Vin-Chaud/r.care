import { NextFont } from "next/dist/compiled/@next/font";
import { Inter, Poppins } from "next/font/google";
import { css } from "styled-components";

const inter = Inter({ subsets: ["latin"], weight: "400" });
const interItalic = Inter({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});
const montserrat = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export const Fonts = {
  SFPro: fontCss(inter),
  SFProItalic: fontCss(interItalic),
  Montserrat: fontCss(montserrat),
  Inter: fontCss(inter),
};

export const Purples = {
  PurpleB8_Undocumented: "#1F1F1F",
  PurpleBC: "#E3B552",
  Purple94: "#000000",
  PurpleCA_Undocumented: "#CAABF0",
  PurpleE4_Undocumented: "#E4DFFA",
  PurpleF3_Undocumented: "#f3e3ff",
  PurpleF5_Undocumented: "#F2E4C7",
  PurpleF9: "#FFF9EB",
  PurpleFB_Undocumented: "#FBF7FF",
};

export const Greys = {
  Grey26: "#262626",
  Grey4D: "#4D4D4D",
  Grey5D: "#5D5D5D",
  Grey7B: "#7B7B7B",
  Grey7E: "#7E7E7E",
  Grey79: "#797979",
  Grey83: "#838383",
  Grey88: "#888888",
  Grey96: "#969696",
  GreyA7: "#A7A7A7",
  GreyAF: "#AFAFAF",
  GreyC8: "#C8C8C8",
  GreyD1: "#D1D1D1",
  GreyDC: "#DCDCDC",
  GreyDF: "#DFE2F9",
  GreyD9: "#D9D9D9",
  GreyF0: "#F0F0F1",
  GreyF1: "#F1F1F1",
  GreyF3: "#F3F3F3",
  GreyF5: "#F5F5F5",
  Black: "#000000",
  White: "#FFFFFF",
};

export const Reds = {
  Red_Undocumented: "#FF0000",
};

function fontCss(nextFont: NextFont) {
  return css`
    ${Object.entries(nextFont.style)
      .map(([key, value]) => `${jsToCss(key)}: ${value};`)
      .join(" ")}
  `;
}

function jsToCss(jsName: string) {
  return jsName.replace(/([A-Z])/g, "-$1").toLowerCase();
}
