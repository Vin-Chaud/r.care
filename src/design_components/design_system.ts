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
  Purple94: "#945dd9",
  PurpleE4_Undocumented: "#E4DFFA",
  PurpleF3_Undocumented: "#f3e3ff",
  PurpleFB_Undocumented: "#FBF7FF",
  PurpleF5_Undocumented: "#F5EAF8",
};

export const Greys = {
  Grey26: "#262626",
  Grey4D: "#4D4D4D",
  GreyA7: "#A7A7A7",
  GreyF0: "#F0F0F1",
  Black: "#000000",
  White: "#FFFFFF",
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
