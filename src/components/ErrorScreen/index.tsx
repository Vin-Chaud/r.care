import { useLayoutEffect } from "react";

export function ErrorScreen({
  clientMessage,
  diagnostics,
}: {
  clientMessage: string;
  diagnostics?: unknown;
}) {
  useLayoutEffect(() => {
    if (diagnostics != null) {
      console.error(
        ...(Array.isArray(diagnostics) ? diagnostics : [diagnostics])
      );
    }
  });
  return <div style={{ border: "1px solid red" }}>Error: {clientMessage}</div>;
}
