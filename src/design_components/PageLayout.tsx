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

const pageCommon = css`
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
`;

const PageContentFrame = styled.div`
  ${pageCommon}
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

export const ScrollablePageContentFrame = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "background",
})<{ background?: string }>`
  ${pageCommon}
  position:relative;
  min-height: 100dvh;
  padding-inline: 26px;
  background: ${(props) => props.background ?? Purples.PurpleF5_Undocumented};
  left: 50%;
  transform: translateX(-50%);
`;
