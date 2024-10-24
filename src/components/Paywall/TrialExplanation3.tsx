"use client";

import { AppHeader } from "@/components/AppHeader";
import { ForwardNavButton } from "@/components/ForwardNavButton";
import { Emoji, H2, TrialContents } from "@/components/Paywall/trialCommon";
import { Fonts, Greys } from "@/design_components/design_system";
import { PageLayout } from "@/design_components/PageLayout";
import { createMarkdownText } from "@/design_components/typography/MarkdownText";
import { useCallback, useLayoutEffect, useRef } from "react";
import styled from "styled-components";

export function TrialExplanation3({ onNext }: { onNext: () => void }) {
  return (
    <PageLayout>
      <AppHeader>{{ branding: true }}</AppHeader>
      <TrialContents>
        <header>
          <Emoji>{"🚀"}</Emoji>
          <H2>{"How your free trial works:"}</H2>
        </header>
        <Timeline
          items={[
            {
              header: "Complete the Quiz",
              content: "You successfully created your profile.",
              icon: "check",
            },
            {
              header: "Today : Instant Free Access",
              content:
                "Unlimited access to an exclusive program developed by binge eating experts.",
              icon: "lock",
            },
            {
              header: "Day 5 : Trial Reminder",
              content:
                "We’ll send you an email.<br>Cancel anytime in just 15 seconds.",
              icon: "lock",
            },
            {
              header: "Day 7",
              content: "Your subscription will start.",
              icon: "lock",
            },
          ]}
        />
      </TrialContents>
      <ForwardNavButton onClick={onNext}>{"Got it!"}</ForwardNavButton>
    </PageLayout>
  );
}

function Timeline({
  items,
}: {
  items: { header: string; content: string; icon: "lock" | "check" }[];
}) {
  const firstItemIconRef = useRef<HTMLDivElement>(null);
  const lastItemIconref = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateTimeline = useCallback(() => {
    const firstIcon = firstItemIconRef.current;
    const lastIcon = lastItemIconref.current ?? firstIcon;
    const timeline = timelineRef.current;
    const container = containerRef.current;
    if (!firstIcon || !lastIcon || !timeline || !container) {
      return;
    }

    const firstIconRect = firstIcon.getBoundingClientRect();
    const lastIconRect = lastIcon.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const timelineStart = (firstIconRect.top + firstIconRect.bottom) * 0.5;
    const timelineEnd = (lastIconRect.top + lastIconRect.bottom) * 0.5;
    timeline.style.top = timelineStart - containerRect.top + "px";
    timeline.style.height = timelineEnd - timelineStart + "px";
  }, []);

  useLayoutEffect(() => {
    updateTimeline();
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(updateTimeline);

      resizeObserver.observe(containerRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [items.length]);

  return (
    <div ref={containerRef} style={{ display: "flex", flexDirection: "row" }}>
      <div
        ref={timelineRef}
        style={{
          position: "relative",
          marginLeft: 20,
          marginRight: pathwayGutter,
          borderLeft: "2px dashed #838383",
        }}
      />
      <TrialStepList>
        {items.map((item, itemIndex, itemArray) => (
          <TrialStepListItem
            key={itemIndex}
            style={{ listStyle: "none", position: "relative" }}
          >
            <div>
              <TrialStepListItemHeader>{item.header}</TrialStepListItemHeader>
              <TrialStepListItemContent>
                {item.content}
              </TrialStepListItemContent>
            </div>
            <IconPositioner
              ref={
                itemIndex === 0
                  ? firstItemIconRef
                  : itemIndex === itemArray.length - 1
                  ? lastItemIconref
                  : void 0
              }
            >
              {item.icon === "lock" ? <LockIcon /> : <CheckIcon />}
            </IconPositioner>
          </TrialStepListItem>
        ))}
      </TrialStepList>
    </div>
  );
}

const TrialStepList = styled.ul`
  flex-grow: 1;
  padding: 0px;
  list-style: none;
`;

const TrialStepListItem = styled.div`
  position: relative;
  margin-block: 35px;
`;

const TrialStepListItemHeader = styled.h3`
  ${Fonts.Montserrat}
  font-size: 16px;
  font-weight: 700;
  color: ${Greys.Black};
  margin-block: 5px;
`;

const TrialStepListItemContent = createMarkdownText(styled.p`
  ${Fonts.SFPro}
  font-size: 14px;
  font-weight: 300;
  color: ${Greys.Grey26};
  margin-block: 2px;
`);

const pathwayGutter = 40;

const IconPositioner = styled.div`
  position: absolute;
  left: -${pathwayGutter}px;
  top: 50%;
  transform: translate(-50%, -50%);
`;

function LockIcon() {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="13.4531" cy="13.4854" r="13.4131" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.2423 5.56836C11.0127 5.56836 9.20358 7.37342 9.20358 9.59983V11.7588H8.61246C7.69224 11.7588 6.93457 12.5123 6.93457 13.4321V19.7263C6.93457 20.6461 7.69223 21.3996 8.61246 21.3996H17.9541C18.8743 21.3996 19.6283 20.6461 19.6283 19.7263V13.4321C19.6283 12.5123 18.8743 11.7588 17.9541 11.7588H17.2838V9.59983C17.2838 7.37342 15.472 5.56836 13.2423 5.56836ZM13.2423 6.49961C14.9733 6.49961 16.3526 7.87433 16.3526 9.59983V11.7588H10.1348V9.59983C10.1348 7.87433 11.5114 6.49961 13.2423 6.49961ZM8.61246 12.6901H9.66739H16.8164H17.9541C18.3756 12.6901 18.6971 13.0132 18.6971 13.4321V19.7263C18.6971 20.1452 18.3756 20.4684 17.9541 20.4684H8.61246C8.19094 20.4684 7.86582 20.1452 7.86582 19.7263V13.4321C7.86582 13.0132 8.19094 12.6901 8.61246 12.6901ZM13.2833 14.3398C12.3925 14.3398 11.6572 15.0717 11.6572 15.9622C11.6572 16.6906 12.1492 17.3103 12.8158 17.5118V18.3549C12.8161 18.416 12.8283 18.4765 12.852 18.5329C12.8756 18.5893 12.9101 18.6405 12.9535 18.6836C12.9969 18.7266 13.0483 18.7607 13.1049 18.7839C13.1615 18.8071 13.2221 18.8189 13.2833 18.8187C13.4061 18.8182 13.5238 18.7692 13.6107 18.6823C13.6976 18.5954 13.7466 18.4777 13.7471 18.3549V17.5127C14.4143 17.3121 14.9057 16.6916 14.9057 15.9622C14.9057 15.0717 14.174 14.3398 13.2833 14.3398ZM13.2833 15.271C13.6718 15.271 13.9744 15.5761 13.9744 15.9622C13.9744 16.3482 13.6718 16.6497 13.2833 16.6497C12.8947 16.6497 12.5885 16.3482 12.5885 15.9622C12.5885 15.5761 12.8947 15.271 13.2833 15.271Z"
        fill="#838383"
        stroke="#838383"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="13.4531" cy="13.542" r="13.4131" fill="#945DD9" />
      <path
        d="M6.93457 12.5573L11.9371 17.5598L19.9715 9.52539"
        stroke="white"
        strokeWidth="3.30234"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
