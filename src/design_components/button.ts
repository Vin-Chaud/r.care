import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { withOpacity } from "@/utils/color";
import { css } from "styled-components";

export const buttonStyle = (props: { isSelected: boolean }) => css`
  ${Fonts.Montserrat};
  font-weight: 500;
  font-size: 15px;
  color: ${Greys.Black};
  background-color: ${props.isSelected ? Purples.PurpleF9 : Greys.GreyF5};
  border-radius: 20px;
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${withOpacity(Purples.Purple94, props.isSelected ? 1 : 0)};
  transition: border 0.3s, background-color 0.3s;
  cursor: pointer;
  user-select: none;
  text-align: center;
`;
