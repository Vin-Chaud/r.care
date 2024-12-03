"use client";

import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { withOpacity } from "@/utils/color";
import styled from "styled-components";

export function ButtonColumnLayout<A extends string | number>({
  options,
  onSelect,
  hasAnswered,
  selectedValue,
}: {
  options: readonly { label: string; value: A }[];
  onSelect: (value: A) => void;
  hasAnswered: boolean;
  selectedValue: A | null;
}) {
  return (
    <ButtonList>
      {options.map(({ value, label }) => (
        <ButtonListItem key={value}>
          <Button
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
  );
}

const ButtonList = styled.ul`
  padding: 0px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ButtonListItem = styled.li`
  list-style: none;
  max-height: 72px;
  min-height: 40px;
  flex-grow: 1;
  margin-bottom: 16px;

  @media (max-height: 799px) {
    margin-bottom: 8px;
  }
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>`
  ${Fonts.Montserrat};
  font-weight: 500;
  font-size: 15px;
  color: ${Greys.Black};
  background-color: ${(props) =>
    props.isSelected ? Purples.PurpleF9 : Greys.GreyF5};
  border-radius: 20px;
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid
    ${(props) => withOpacity(Purples.Purple94, props.isSelected ? 1 : 0)};
  transition: border 0.3s, background-color 0.3s;
  cursor: pointer;
`;
