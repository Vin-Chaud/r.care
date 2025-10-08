import { RCareBrand } from "@/components/icons/RCareBrand";
import { BackButton } from "@/components/OnboardingFlow/BackButton";
import { Fonts, Greys } from "@/design_components/design_system";
import styled from "styled-components";

export function AppHeader({
  children,
  withBackButton,
  onClickBack,
}: {
  children: string | { branding: true };
  withBackButton?: boolean;
  onClickBack?: () => void;
}) {
  return (
    <AppHeaderLayout>
      {withBackButton && <BackButton onClick={() => onClickBack?.()} />}
      {typeof children === "string" ? (
        <Title>{children}</Title>
      ) : (
        <RCareBrand height={08} />
      )}
    </AppHeaderLayout>
  );
}

const AppHeaderLayout = styled.div`
  display: flex;
  width: 100%;
  margin-block: 20px;
  box-sizing: border-box;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 40px;
`;

const Title = styled.h1`
  ${Fonts.SFPro}
  font-size:14px;
  font-weight: 500;
  color: ${Greys.Grey96};
  flex-grow: 1;
  text-align: center;
`;
