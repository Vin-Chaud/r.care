import { NextFont } from "next/dist/compiled/@next/font";
import { Inter, Montserrat } from "next/font/google";
import { css } from "styled-components";

const inter = Inter({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});
export const Fonts = {
  SFPro: fontCss(inter),
  Montserrat: fontCss(montserrat),
};

export const Purples = {
  PurpleB8_Undocumented: "#B88AF2",
  PurpleBC: "#BCA7C9",
  Purple94: "#945dd9",
  PurpleE4_Undocumented: "#E4DFFA",
  PurpleF3_Undocumented: "#f3e3ff",
  PurpleF5_Undocumented: "#F5EAF8",
  PurpleF9: "#F9F4FF",
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
  Grey96: "#969696",
  GreyA7: "#A7A7A7",
  GreyAF: "#AFAFAF",
  GreyD1: "#D1D1D1",
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
