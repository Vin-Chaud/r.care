import { RCareBrand } from "@/components/icons/RCareBrand";
import { globalContext } from "@/context/GlobalContext";
import { useOnboardingFlowImageUrls } from "@/context/OnboardingFlowContext";
import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { PageLayout } from "@/design_components/PageLayout";
import { useAutoCanceledTimeout } from "@/hooks/useAutoCanceledTimeout";
import {
  TransitionState,
  useWatchedTransition,
} from "@/hooks/useWatchedTransition";
import {
  Story,
  StoryPane as StoryPaneModel,
} from "@/models/OnboardingFlow/model";
import { fadeIn } from "@/utils/style_partials";
import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { onboardingFlowContext } from "./onboardingFlowContext";
import { createRichText } from "./RichText";

export function StoryStep({ stepDefinition }: { stepDefinition: Story }) {
  const { next } = useContext(onboardingFlowContext);
  const [paneIndex, setPaneIndex] = useState(0);
  const { storyTransitionDelayTime } = useContext(globalContext);

  const setTimeout = useAutoCanceledTimeout();
  return (
    <PageLayout background={Purples.PurpleF5_Undocumented}>
      <StoryHeader>
        <RCareBrand height={14} />
        <StoryTicker
          length={stepDefinition.panes.length}
          paneIndex={paneIndex}
          onNext={() => {
            if (paneIndex === stepDefinition.panes.length - 1) {
              setTimeout(next, storyTransitionDelayTime);
            } else {
              setPaneIndex(paneIndex + 1);
            }
          }}
        />
      </StoryHeader>
      <StoryBody>
        {stepDefinition.panes.map(
          (pane, itemIndex) =>
            paneIndex >= itemIndex && <StoryPane key={itemIndex} {...pane} />
        )}
      </StoryBody>
    </PageLayout>
  );
}

export function StoryPane({ title, body, graphic_id }: StoryPaneModel) {
  const imageUrls = useOnboardingFlowImageUrls();
  return (
    <StoryLayoutOverlay>
      <div>
        <StoryImageLayout>
          <StoryImage src={imageUrls[graphic_id]} />
        </StoryImageLayout>
        {title != null && <StoryTitle>{title}</StoryTitle>}
        <StoryText>{body}</StoryText>
      </div>
    </StoryLayoutOverlay>
  );
}

const StoryHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const StoryBody = styled.div`
  flex-grow: 1;
  width: 100%;
  position: relative;
`;

const StoryLayoutOverlay = styled.section`
  position: absolute;
  transition: opacity 0.5s;
  background-color: ${Purples.PurpleF5_Undocumented};
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  ${fadeIn}
`;

const StoryImageLayout = styled.div`
  margin-block: 40px;
  text-align: center;
`;

const StoryImage = styled.img`
  height: 180px;
`;

const StoryText = createRichText(styled.p`
  ${Fonts.SFPro}
  font-weight: 300;
  color: ${Greys.Grey26};
  margin-block: 40px;
  text-align: center;
  height: 7em;
`);

const StoryTitle = createRichText(styled.h1`
  ${Fonts.Montserrat}
  font-weight: 600;
  color: ${Greys.Black};
  margin-block: 40px;
  text-align: center;
`);

export function StoryTicker({
  length,
  paneIndex,
  onNext,
}: {
  length: number;
  paneIndex: number;
  onNext?: () => void;
}) {
  return (
    <TickerGutter>
      {new Array(length).fill(0).map((_, barIndex) => (
        <StoryTickerBar
          key={barIndex}
          fillTransitionState={
            barIndex < paneIndex
              ? "after"
              : barIndex === paneIndex
              ? "progress"
              : "before"
          }
          index={barIndex}
          count={length}
          onDidFill={barIndex === paneIndex ? onNext : void 0}
        />
      ))}
    </TickerGutter>
  );
}

function StoryTickerBar({
  index,
  count,
  fillTransitionState,
  onDidFill,
}: {
  index: number;
  count: number;
  fillTransitionState: TransitionState;
  onDidFill?: () => void;
}) {
  const { storyTransitionTime, storyTransitionDelayTime } =
    useContext(globalContext);

  const fillBarRef = useRef<HTMLDivElement>(null);
  const isFilled = useWatchedTransition(
    fillTransitionState,
    () => {
      if (!fillBarRef.current) {
        return false;
      }

      const fullBar = fillBarRef.current.parentElement!;
      const fullWidth = getComputedStyle(fullBar).width;
      const fillWidth = getComputedStyle(fillBarRef.current).width;

      return fillWidth === fullWidth;
    },
    () => onDidFill?.()
  );

  return (
    <TickerBar
      style={{
        width: `calc(${barWidth(count)})`,
        left: `calc(${barLeft(count, index)})`,
      }}
    >
      <TickerFill
        ref={fillBarRef}
        style={{
          width: isFilled ? "100%" : "0%",
          transition: `width ${storyTransitionTime}ms`,
          transitionDelay: `${storyTransitionDelayTime}ms`,
        }}
      />
    </TickerBar>
  );
}

const tickerSize = 8;

const TickerGutter = styled.div`
  margin-top: 26px;
  position: relative;
  width: 100%;
  height: ${tickerSize}px;
`;

const TickerBar = styled.div`
  position: absolute;
  height: 100%;
  background-color: ${Greys.GreyD9};
  clip-path: inset(0 0 0 0 round ${tickerSize / 2}px);
`;

const TickerFill = styled.div`
  position: absolute;
  height: 100%;
  background-color: ${Greys.White};
  border-radius: ${tickerSize / 2}px;
`;

function barWidth(count: number) {
  return `((100% - (${count - 1} * ${tickerSize}px)) / ${count})`;
}

function barLeft(count: number, index: number) {
  return `(${barWidth(count)} + ${tickerSize}px) * ${index}`;
}
