import { Header } from "@/components/Paywall/PaywallMain/common";
import { useOnboardingFlow } from "@/context/OnboardingFlowContext";
import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { ScrollablePageContentFrame } from "@/design_components/PageLayout";
import {
  Faq,
  FaqContent as FaqContentModel,
} from "@/models/OnboardingFlow/model";
import { useState } from "react";
import styled from "styled-components";

export function Faqs() {
  const faqs = useOnboardingFlow().faqs;
  return (
    <ScrollablePageContentFrame background={Greys.White}>
      <Header>{"Still have questions?"}</Header>
      <FaqList>
        {faqs.map((faq, index) => (
          <FaqBox {...faq} key={index} />
        ))}
      </FaqList>
    </ScrollablePageContentFrame>
  );
}

function FaqBox({ question, answer }: Faq) {
  const contentItems: readonly FaqContentModel[] = Array.isArray(answer)
    ? answer
    : [answer];
  const [isExpanded, setExpanded] = useState(false);
  return (
    <li>
      <FaqBoxLayout>
        <header>
          <h3>{question}</h3>
        </header>
        {isExpanded &&
          contentItems.map((item, itemIndex) => (
            <FaqContent key={itemIndex}>{item}</FaqContent>
          ))}
        {!isExpanded && (
          <div className="button_container">
            <button type="button" onClick={() => setExpanded(true)}>
              {"OPEN ANSWERS"}
            </button>
          </div>
        )}
      </FaqBoxLayout>
    </li>
  );
}

function FaqContent({ children }: { children: FaqContentModel }) {
  if (typeof children === "string") {
    return <p>{children}</p>;
  }

  return (
    <ol>
      {children.list.map((item) => (
        <li>{item}</li>
      ))}
    </ol>
  );
}

const FaqList = styled.ul`
  list-style: none;
  padding: 0px;
  padding-bottom: 60px;
`;

const FaqBoxLayout = styled.section`
  background-color: ${Purples.PurpleF9};
  ${Fonts.SFPro}
  font-size: 13px;
  font-weight: 400;
  border-radius: 20px;
  padding: 30px 25px 20px;
  margin-bottom: 15px;

  h3 {
    ${Fonts.SFPro}
    font-size: 15px;
    font-weight: 500;
  }

  ol {
    padding-left: 1em;

    li {
      margin-block: 0.4em;
    }
  }

  p,
  ol {
    &:last-child {
      margin-bottom: 20px;
    }
  }

  .button_container {
    text-align: center;
  }

  button {
    text-transform: uppercase;
    ${Fonts.SFPro}
    font-weight: 600;
    font-size: 9px;
    color: ${Greys.Grey5D};
    background: none;
    border: none;
    cursor: pointer;
  }
`;
