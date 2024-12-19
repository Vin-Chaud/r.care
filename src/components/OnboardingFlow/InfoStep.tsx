import { ForwardNavButton } from "@/components/ForwardNavButton";
import { InfoScreen } from "@/models/OnboardingFlow/model";
import { useContext } from "react";
import { Content } from "./Content";
import { onboardingFlowContext } from "./onboardingFlowContext";
import styled from "styled-components";
import { Purples } from "@/design_components/design_system";
import { RCareBrand } from "@/components/icons/RCareBrand";
import { PageLayout } from "@/design_components/PageLayout";
import { fadeIn } from "@/utils/style_partials";

export function InfoStep({ stepDefinition }: { stepDefinition: InfoScreen }) {
  const { next } = useContext(onboardingFlowContext);
  return (
    <PageLayout background={Purples.PurpleF5_Undocumented}>
      <InfoLayout>
        <InfoHeader>
          <RCareBrand height={14} />
        </InfoHeader>
        <InfoContent>
          {stepDefinition.contents.map((content, index) => (
            <Content key={index} content={content} />
          ))}
        </InfoContent>
        <InfoFooter>
          <ForwardNavButton onClick={next} />
        </InfoFooter>
      </InfoLayout>
    </PageLayout>
  );
}

const InfoLayout = styled.div`
  ${fadeIn}

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const InfoHeader = styled.header`
  margin-block: 30px;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`;

const InfoFooter = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
`;
