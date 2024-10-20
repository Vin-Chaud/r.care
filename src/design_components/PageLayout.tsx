import { Purples } from "@/design_components/design_system";
import { ReactNode } from "react";
import styled from "styled-components";

export function PageLayout({
  children,
  background,
}: {
  children: ReactNode;
  background?: string;
}) {
  return (
    <PageLayoutContainer background={background}>
      <PageContentFrame>{children}</PageContentFrame>
    </PageLayoutContainer>
  );
}

const PageLayoutContainer = styled.div.withConfig({
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

const PageContentFrame = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100%;
  max-height: 800px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
