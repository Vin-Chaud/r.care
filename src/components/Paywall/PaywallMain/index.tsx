import { PurchasePortal } from "./PurchasePortal";
import { CallToAction } from "./CallToAction";
import {
  ScrollablePageContentFrame,
  ScrollablePageLayoutContainer,
} from "@/design_components/PageLayout";
import { Greys } from "@/design_components/design_system";
import { Timer } from "@/components/Paywall/PaywallMain/Timer";
import { AppHeader } from "@/components/AppHeader";
import { useState } from "react";
import { SubscriptionType } from "@/models/Subscription";

export function PaywallMain() {
  const [checkoutType, setCheckoutType] = useState<SubscriptionType>(
    SubscriptionType.Yearly
  );
  return (
    <ScrollablePageLayoutContainer>
      <ScrollablePageContentFrame background={Greys.White}>
        <AppHeader>{{ branding: true }}</AppHeader>
      </ScrollablePageContentFrame>
      <Timer />
      <CallToAction />
      <PurchasePortal
        portalId="upper"
        value={checkoutType}
        onChange={setCheckoutType}
      />
      <PurchasePortal
        portalId="lower"
        value={checkoutType}
        onChange={setCheckoutType}
      />
    </ScrollablePageLayoutContainer>
  );
}
