"use client";

import { AppHeader } from "@/components/AppHeader";
import { ForwardNavButton } from "@/components/ForwardNavButton";
import { dispatchGoogleTagEvent } from "@/components/Tracking/GoogleTag";
import { dispatchStandardMetaEvent } from "@/components/Tracking/MetaPixel";
import { Fonts, Greys } from "@/design_components/design_system";
import { PageLayout } from "@/design_components/PageLayout";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import styled from "styled-components";

export function Welcome({
  email,
  activateGraphicUrl,
  appUrl,
  stripeProductId,
  productName,
  stripeCheckoutSessionId,
  subscriptionValue,
}: {
  email: string;
  activateGraphicUrl: string;
  appUrl: string;
  stripeProductId?: string;
  productName?: string;
  subscriptionValue?: number;
  stripeCheckoutSessionId?: string;
}) {
  useEffect(() => {
    if (subscriptionValue == null) {
      return;
    }
    if (localStorage.getItem("conversion_tracking_email") !== email) {
      dispatchGoogleTagEvent("purchase", {
        currency: "USD",
        value: subscriptionValue,
        ...(stripeCheckoutSessionId != null && {
          transaction_id: stripeCheckoutSessionId,
        }),
        ...(stripeProductId != null && {
          items: [
            {
              item_id: stripeProductId,
              item_name: productName,
              price: subscriptionValue,
              quantity: 1,
            },
          ],
        }),
      });
      dispatchStandardMetaEvent("Purchase", {
        currency: "USD",
        value: subscriptionValue,
        ...(stripeProductId != null && {
          content_ids: [stripeProductId],
          content_type: "product",
        }),
      });
      localStorage.setItem("conversion_tracking_email", email);
    }
  }, []);
  return (
    <PageLayout scrollable>
      <AppHeader>{{ branding: true }}</AppHeader>
      <Emoji>{"🎊"}</Emoji>
      <Header>{"Wecome to R.care!"}</Header>
      <Subtitle>
        {
          "We’re so happy to have you here. Follow the steps below to continue your R.care journey."
        }
      </Subtitle>
      <InstructionList>
        <Instruction step={"01"}>
          {"Download the R.care app on App Store or Google Play"}
        </Instruction>
        <Instruction step={"02"}>
          <div>{"Activate your account using: "}</div>
          <Email>{email}</Email>
          <ActivateImage src={activateGraphicUrl} />
        </Instruction>
      </InstructionList>
      <Link href={"/fix_email"} style={{ textDecoration: "none" }}>
        <StyledLink>
          {"Is the email above incorrect? Click here to update."}
        </StyledLink>
      </Link>
      <ForwardNavButton
        onClick={() => {
          window.location.href = appUrl;
        }}
      >
        {"Download the app"}
      </ForwardNavButton>
    </PageLayout>
  );
}

function Instruction({
  children,
  step,
}: {
  children: ReactNode;
  step: string;
}) {
  return (
    <InstructionItem>
      <span className="step">{step}</span>
      <div className="description">{children}</div>
    </InstructionItem>
  );
}

const Header = styled.h2`
  ${Fonts.SFPro};
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const Subtitle = styled.p`
  ${Fonts.SFPro}
  font-size:14;
  font-weight: 300;
  text-align: center;
  color: ${Greys.Grey26};
`;

const InstructionList = styled.ol`
  padding: 0px;
  list-style: none;
  width: 100%;
`;

const InstructionItem = styled.li`
  border: 1px solid ${Greys.GreyD1};
  border-radius: 20px;
  padding: 20px 10px 10px;
  display: flex;
  align-items: start;
  min-height: 80px;
  box-sizing: border-box;
  margin-bottom: 25px;
  background-color: ${Greys.White};
  position: relative;

  &:last-child {
    margin-bottom: 0px;
  }

  .step {
    ${Fonts.Inter}
    font-size: 30px;
    font-weight: 700px;
    color: ${Greys.White};
    background-color: #97c0da;
    width: 64px;
    height: 64px;
    position: absolute;
    flex-grow: 0;
    flex-shrink: 0;
    top: -10px;
    left: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
  }

  .description {
    ${Fonts.Montserrat}
    font-size: 14px;
    font-weight: 600;
    color: ${Greys.Black};
    text-align: left;
    padding-left: 60px;
    box-sizing: border-box;
    width: 100%;
  }
`;

const StyledLink = styled.span`
  ${Fonts.SFPro}
  font-size: 14px;
  font-weight: 500;

  color: #ff0000;
`;

const ActivateImage = styled.img`
  margin-top: 20px;
  max-width: 100%;
`;

const Emoji = styled.p`
  ${Fonts.SFPro}
  font-size: 80px;
  text-align: center;
  margin-block: 0px;
`;

const Email = styled.div`
  word-break: break-all;
`;
