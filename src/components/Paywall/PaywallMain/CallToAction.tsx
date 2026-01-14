import { HeaderA } from "@/components/Paywall/PaywallMain/common";
import { CheckItem, CheckList } from "@/design_components/CheckList";
import { Fonts, Greys } from "@/design_components/design_system";
import { ScrollablePageContentFrame } from "@/design_components/PageLayout";
import styled from "styled-components";

export function CallToAction() {
  return (
    <ScrollablePageContentFrame background={Greys.White}>
      <Layout>
        <HeaderA>{"God’s Word, Everyday🤍"}</HeaderA>
        <TrialOfferLayout>
          <TrialOfferHeader>{"This daily practice is designed to help you:"}</TrialOfferHeader>
          <CheckList fontSize={14}>
            <CheckItem>
              {
                "📖 Stay rooted in Scripture: Verses chosen to meet you in your current season."
              }
            </CheckItem>
            <CheckItem>
              {
                "🕊 Recall truth under pressure: Gently practice bringing God’s Word to mind in everyday moments."
              }
            </CheckItem>
            <CheckItem>
              {"🌱 Grow in Christ-like responses: Let Scripture quietly shape how you think, speak, and act."}</CheckItem>
          </CheckList>
         
        </TrialOfferLayout>
      </Layout>
    </ScrollablePageContentFrame>
  );
}

const Layout = styled.section``;

const TrialOfferLayout = styled.div`
  border: 1px solid ${Greys.GreyD1};
  border-radius: 15px;
  padding: 0px 25px;
  margin-top: 25px;
  margin-bottom: 50px;
`;

const TrialOfferHeader = styled.h3`
  ${Fonts.Montserrat};
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

const TrialDivider = styled.hr`
  border: none;
  border-top: 2px solid ${Greys.GreyD1};
`;

const TrialTotalBox = styled.p`
  ${Fonts.Montserrat};
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin-top: 15px;

  display: flex;
  justify-content: space-between;
  align-items: baseline;

  span.total_yearly {
    span.total {
      font-size: 16px;
      font-weight: 600;
      margin-right: 0.5em;
    }

    span.yearly {
      font-size: 12px;
      font-weight: 600;
    }
  }

  span.amount {
    font-size: 19px;
    font-weight: 700;
  }
`;
