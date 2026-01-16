import { ForwardNavButton } from "@/components/ForwardNavButton";
import { RCareBrand } from "@/components/icons/RCareBrand";
import { PageLayout } from "@/design_components/PageLayout";
import { InfoScreen } from "@/models/OnboardingFlow/model";
import { fadeIn } from "@/utils/style_partials";
import { useContext } from "react";
import styled from "styled-components";
import { Content } from "./Content";
import { onboardingFlowContext } from "./onboardingFlowContext";

export function InfoStep({ stepDefinition }: { stepDefinition: InfoScreen }) {
  const { next } = useContext(onboardingFlowContext);
  const { background, style, content_style, footer_style } = stepDefinition;
  const hasFullScreenImage = stepDefinition.contents.some(
    (content) => content.type === "image" && content.full_screen
  );
  return (
    <PageLayout background={background || (stepDefinition.variant == "dark" ? "#1E1E1E" : "#E5DEFA")}>
      <InfoLayout style={style}>
        <InfoContent style={content_style}>
          {stepDefinition.contents.map((content, index) => (
            <Content
              key={index}
              content={content}
              dark={stepDefinition.variant == "dark"}
              hasFullSpaceImage={hasFullScreenImage}
            />
          ))}
        </InfoContent>
        <InfoFooter style={footer_style}>
          <ForwardNavButton onClick={next} />
        </InfoFooter>
      </InfoLayout>
    </PageLayout>
  );
}

const InfoLayout = styled.div`
  ${fadeIn}
 position: relative;
 min-height: 100%;
 width: 100%;
  display: flex;
  align-items: center;

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
     padding-bottom: 120px;
 z-index: 0;
`;

const InfoFooter = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
position: absolute;
  bottom: 30px;
left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;
