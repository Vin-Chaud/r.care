"use client";

import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { withOpacity } from "@/utils/color";
import styled from "styled-components";

type ButtonRowFontSize = "emoji-big" | "emoji-small" | "number";

export function ButtonRowLayout<A extends string | number>({
  options,
  onSelect,
  hasAnswered,
  selectedValue,
  leftLabel,
  rightLabel,
}: {
  options: readonly {
    label: string;
    value: A;
    fontSize?: ButtonRowFontSize;
  }[];
  onSelect: (value: A) => void;
  hasAnswered: boolean;
  selectedValue: A | null;
  leftLabel?: string;
  rightLabel?: string;
}) {
  return (
    <div>
      <ButtonList>
        {options.map(({ value, label, fontSize }) => (
          <ButtonListItem key={value}>
            <Button
              fontSize={fontSize || "number"}
              isSelected={selectedValue === value}
              type="button"
              onClick={() => {
                onSelect(value);
              }}
              disabled={hasAnswered}
            >
              {label}
            </Button>
          </ButtonListItem>
        ))}
      </ButtonList>
      <Labels>
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </Labels>
    </div>
  );
}

const ButtonList = styled.ul`
  padding: 0px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

const ButtonListItem = styled.li`
  list-style: none;
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "fontSize",
})<{ isSelected: boolean; fontSize: ButtonRowFontSize }>`
  ${Fonts.Montserrat};
  font-weight: 500;
  font-size: ${(props) =>
    props.fontSize === "emoji-big"
      ? "26px"
      : props.fontSize === "emoji-small"
      ? "16px"
      : "12px"};
  color: ${Greys.Black};
  background-color: ${(props) =>
    props.isSelected ? Purples.PurpleF9 : Greys.GreyF5};
  border-radius: 20px;
  display: block;
  width: 100%;
  height: 72px;
  border: 1px solid
    ${(props) => withOpacity(Purples.Purple94, props.isSelected ? 1 : 0)};
  transition: border 0.3s, background-color 0.3s;
  cursor: pointer;
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 23px;
  ${Fonts.Montserrat};
  font-weight: 500;
  font-size: 12px;
  color: ${Greys.Black};
`;
