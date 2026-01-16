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
      <PageLayout background={Purples.PurpleF5_Undocumented} scrollable>
        <InfoLayout>
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

   min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding-block: 32px 32px;
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
  flex: 1 1 auto;
    width: 100%;
    text-align: center;
    gap: 12px;
`;

const InfoFooter = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
   flex-shrink: 0;
    margin-top: 24px;
`;
