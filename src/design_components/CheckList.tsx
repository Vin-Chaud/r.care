import { CheckboxTick } from "@/components/icons/CheckboxTick";
import { createRichText } from "@/components/OnboardingFlow/RichText";
import { Fonts, Greys } from "@/design_components/design_system";
import styled from "styled-components";

export function CheckItem({ children }: { children: string }) {
  return (
    <CheckListItem>
      <CheckListItemNumber>
        <CheckboxTick />
      </CheckListItemNumber>
      <CheckListItemText>{children}</CheckListItemText>
    </CheckListItem>
  );
}

export const CheckListItem = styled.li`
  display: flex;
  align-items: center;
  margin-block: 10px;
`;

export const CheckListItemNumber = styled.div`
  ${Fonts.SFPro}
  font-size: 20px;
  font-weight: 600;
  color: ${Greys.White};
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 35px;
  background-color: #67c060;
  margin-right: 20px;
  border-radius: 100%;
  box-shadow: 0px 4px 4px 0px #00000040;
`;

export const CheckListItemText = createRichText(styled.p`
  ${Fonts.Montserrat}

  font-weight: 500;

  strong {
    font-weight: 700;
  }
`);

export const CheckList = styled.ol.withConfig({
  shouldForwardProp: (prop) => prop !== "fontSize",
})<{ fontSize: number }>`
  padding: 0;
  list-style: none;
  margin-block: 20px;
  font-size: ${(props) => props.fontSize}px;
`;
