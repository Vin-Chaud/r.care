"use client";

import { useEffect } from "react";
import { useAutoCanceledTimeout } from "../OnboardingFlow/useAutoCanceledTimeout";

export function AnalysisTransition({ onDone }: { onDone?: () => void }) {
  const setTimeout = useAutoCanceledTimeout();

  useEffect(() => {
    setTimeout(() => {
      onDone?.();
    }, 3000);
  });

  return <div>Analysis data...</div>;
}
