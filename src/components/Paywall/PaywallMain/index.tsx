import { GreenCheck } from "@/components/icons/GreenCheck";
import { MarkdownText } from "@/components/MarkdownText";
import { PurchasePortal } from "./PurchasePortal";

export function PaywallMain() {
  return (
    <article>
      <CallToAction />
      <PurchasePortal />
      <PurchasePortal />
    </article>
  );
}

export function CallToAction() {
  return (
    <section>
      <h2>{"Delay no more - break free from binge eating."}</h2>
      <div>
        <h3>{"Start with a 7-day free trial"}</h3>
        <ul>
          <CallToActionItem>
            {
              "**Test R.care** without financial worries and see if it’s right for you."
            }
          </CallToActionItem>
          <CallToActionItem>
            {
              "You will have 7 days to see how R.care uses science to help you achieve your goals."
            }
          </CallToActionItem>
          <CallToActionItem>
            {"**Full access to all premium features.**"}
          </CallToActionItem>
        </ul>
      </div>
    </section>
  );
}

function CallToActionItem({ children }: { children: string }) {
  return (
    <li style={{ display: "flex" }}>
      <GreenCheck />
      <MarkdownText tag="div">{children}</MarkdownText>
    </li>
  );
}
