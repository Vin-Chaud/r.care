import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { ComponentProps } from "react";
import styled from "styled-components";

export function ForwardNavButton({
  children,
  locked,
  disabled,
  ...buttonProps
}: Omit<ComponentProps<"button">, "children"> & {
  children?: string;
  locked?: boolean;
}) {
  return (
    <Button
      type="button"
      disabled={locked || disabled}
      locked={locked ?? false}
      {...buttonProps}
    >
      {children || "Continue"}
    </Button>
  );
}

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "locked",
})<{ locked: boolean }>`
  width: 100%;
  background-color: ${(props) =>
    props.locked
      ? Purples.PurpleB8_Undocumented
      : props.disabled
      ? Purples.PurpleE4_Undocumented
      : Purples.Purple94};

  ${Fonts.SFPro}
  color: ${Greys.White};
  border: 0;
  border-radius: 20px;
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  height: 60px;
  display: block;
  cursor: pointer;
  margin-block: 28px;
  transition: background-color 0.2s;
  box-shadow: 0px 2px 6px 0px #00000040;
  flex-shrink: 0;

  &:disabled {
    cursor: not-allowed;
  }
`;
