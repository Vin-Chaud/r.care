"use client";

import { useState } from "react";
import { TrialExplanation1 } from "./TrialExplanation1";
import { TrialExplanation2 } from "./TrialExplanation2";
import { TrialExplanation3 } from "./TrialExplanation3";
import { PaywallMain } from "./PaywallMain";

enum Page {
  TrialExplanation1,
  TrialExplanation2,
  TrialExplanation3,
  PaywallMain,
}

export function Paywall({}: {}) {
  const [page, setPage] = useState(Page.TrialExplanation1);
  switch (page) {
    case Page.TrialExplanation1: {
      return (
        <TrialExplanation1 onNext={() => setPage(Page.TrialExplanation2)} />
      );
    }

    case Page.TrialExplanation2: {
      return (
        <TrialExplanation2 onNext={() => setPage(Page.TrialExplanation3)} />
      );
    }

    case Page.TrialExplanation3: {
      return <TrialExplanation3 onNext={() => setPage(Page.PaywallMain)} />;
    }

    default: {
      return <PaywallMain />;
    }
  }
}
