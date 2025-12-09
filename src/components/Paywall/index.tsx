"use client";

import { SubscriptionType } from "@/models/Subscription";
import { useState } from "react";
import { PaywallMain } from "./PaywallMain";
import { TrialExplanation1 } from "./TrialExplanation1";
import { TrialExplanation3 } from "./TrialExplanation3";

enum Page {
  TrialExplanation1,
  TrialExplanation3,
  PaywallMain,
}

export function Paywall({
  existingCartType,
}: {
  existingCartType: SubscriptionType | null;
}) {
  const [page, setPage] = useState(
    existingCartType ? Page.PaywallMain : Page.TrialExplanation1
  );

  switch (page) {
    case Page.TrialExplanation1: {
      return (
        <TrialExplanation1 onNext={() => setPage(Page.TrialExplanation3)} />
      );
    }

    case Page.TrialExplanation3: {
      return <TrialExplanation3 onNext={() => setPage(Page.PaywallMain)} />;
    }

    default: {
      return <PaywallMain existingCartType={existingCartType} />;
    }
  }
}
