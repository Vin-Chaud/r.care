import { ForwardNavButton } from "@/components/ForwardNavButton";
import { InfoScreen } from "@/models/OnboardingFlow/model";
import { useContext } from "react";
import { Content } from "./Content";
import { onboardingFlowContext } from "./onboardingFlowContext";

export function InfoStep({ stepDefinition }: { stepDefinition: InfoScreen }) {
  const { next } = useContext(onboardingFlowContext);
  return (
    <div>
      {stepDefinition.contents.map((content, index) => (
        <Content key={index} content={content} />
      ))}
      <ForwardNavButton onClick={next} />
    </div>
  );
}
