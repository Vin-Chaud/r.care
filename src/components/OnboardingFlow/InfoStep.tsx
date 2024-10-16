import { ForwardNavButton } from "@/components/ForwardNavButton";
import { InfoScreen } from "@/models/OnboardingFlow/model";
import { useContext } from "react";
import { Content } from "./Content";
import { onboardingFlowContext } from "./onboardingFlowContext";
import styled from "styled-components";
import { Purples } from "@/design_components/design_system";
import { RCareBrand } from "@/components/icons/RCareBrand";

export function InfoStep({ stepDefinition }: { stepDefinition: InfoScreen }) {
  const { next } = useContext(onboardingFlowContext);
  return (
    <InfoLayout>
      <InfoHeader>
        <RCareBrand />
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
  );
}

const InfoLayout = styled.section`
  background-color: ${Purples.PurpleF5_Undocumented};
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
`;

const InfoFooter = styled.footer`
  margin-block: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
