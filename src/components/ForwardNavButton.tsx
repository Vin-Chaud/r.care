import { ComponentProps } from "react";

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
    <button
      type="button"
      disabled={locked || disabled}
      {...buttonProps}
      style={{
        width: "100%",
        backgroundColor: locked ? "#B88AF2" : disabled ? "#E4DFEA" : "#945DD9",
        color: "white",
        borderRadius: 20,
        border: 0,
      }}
    >
      {children || "Continue"}
    </button>
  );
}
