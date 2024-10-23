import { PurchasePortal } from "./PurchasePortal";
import { CallToAction } from "./CallToAction";
import {
  ScrollablePageContentFrame,
  ScrollablePageLayoutContainer,
} from "@/design_components/PageLayout";
import { Greys } from "@/design_components/design_system";
import { Timer } from "@/components/Paywall/PaywallMain/Timer";
import { AppHeader } from "@/components/AppHeader";

export function PaywallMain() {
  return (
    <ScrollablePageLayoutContainer>
      <ScrollablePageContentFrame background={Greys.White}>
        <AppHeader>{{ branding: true }}</AppHeader>
      </ScrollablePageContentFrame>
      <Timer />
      <ScrollablePageContentFrame background={Greys.White}>
        <CallToAction />
        <PurchasePortal />
        <PurchasePortal />
      </ScrollablePageContentFrame>
    </ScrollablePageLayoutContainer>
  );
}
