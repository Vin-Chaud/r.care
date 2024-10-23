import { Purples } from "@/design_components/design_system";
import { ReactNode } from "react";
import styled, { css } from "styled-components";

export function PageLayout({
  children,
  background,
  scrollable,
}: {
  children: ReactNode;
  background?: string;
  scrollable?: boolean;
}) {
  const Frame = scrollable ? ScrollablePageContentFrame : PageContentFrame;
  return (
    <PageLayoutContainer background={background}>
      <Frame>{children}</Frame>
    </PageLayoutContainer>
  );
}

export const PageLayoutContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "background",
})<{ background?: string }>`
  height: 100%;
  background: ${(props) => props.background ?? Purples.PurpleF5_Undocumented};
  padding-inline: 26px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const pageWidthStyles = css`
  position: relative;
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
`;

const PageContentFrame = styled.div`
  ${pageWidthStyles}
  height: 100%;
  max-height: 800px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ScrollablePageLayoutContainer = styled.div`
  height: 100%;
`;

export function ScrollablePageContentFrame({
  children,
  background,
  full,
}: {
  children?: ReactNode;
  background?: string;
  full?: boolean;
}) {
  return (
    <ScrollablePageContentFrameOuter background={background} full={full}>
      <ScrollablePageContentFrameInner>
        {children}
      </ScrollablePageContentFrameInner>
    </ScrollablePageContentFrameOuter>
  );
}

const ScrollablePageContentFrameOuter = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "background" && prop !== "full",
})<{ background?: string; full?: boolean }>`
  position: relative;
  min-height: ${(props) => (props.full ? "100dvh" : "auto")};
  background: ${(props) => props.background ?? Purples.PurpleF5_Undocumented};
`;

const ScrollablePageContentFrameInner = styled.div`
  ${pageWidthStyles}
  position: relative;
  padding-inline: 26px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
`;
