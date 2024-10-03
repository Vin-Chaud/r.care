import { useLayoutEffect } from "react";

export function ErrorScreen({
  clientMessage,
  diagnostics,
}: {
  clientMessage: string;
  diagnostics?: any;
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
