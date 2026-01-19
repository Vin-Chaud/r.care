import { HeaderA } from "@/components/Paywall/PaywallMain/common";
import { Fonts, Greys } from "@/design_components/design_system";
import { ScrollablePageContentFrame } from "@/design_components/PageLayout";
import styled from "styled-components";

export function Ad({}: {}) {
  return (
    <ScrollablePageContentFrame background={Greys.White}>
      <Layout>
        <header>
          <HeaderA>{"Your Daily Practice 📖"}</HeaderA>
          <Subheader>{"Daily Scripture Coach includes:"}</Subheader>
        </header>
        <OfferList>
          <Offer
            count={365}
            description={
              "Daily Scripture moments designed to help God’s Word come to mind in real-life situations throughout the year."
            }
          />
          <Offer
            count={52}
            description={
              "Weekly themes that focus on living out Scripture through trust, patience, grace, and wisdom."
            }
          />
          <Offer
            count={1}
            description={
              "A personalized daily practice shaped around your life, priorities, and spiritual season."
            }
          />
        </OfferList>
      </Layout>
    </ScrollablePageContentFrame>
  );
}

function Offer({ description, count }: { description: string; count: number }) {
  return (
    <OfferItem>
      <span className="count">{count}</span>
      <span className="description">{description}</span>
    </OfferItem>
  );
}

const Layout = styled.section`
  padding-block: 40px;
`;

const Subheader = styled.p`
  ${Fonts.Montserrat}
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

const OfferList = styled.ul`
  padding: 0px;
  list-style: none;
  margin-block: 50px;
`;

const OfferItem = styled.li`
  border: 1px solid ${Greys.GreyD1};
  border-radius: 20px;
  padding: 25px;
  display: flex;
  align-items: center;
  height: 120px;
  box-sizing: border-box;
  margin-block: 25px;

  .count {
    ${Fonts.Inter}
    font-size: 30px;
    font-weight: 700px;
    color: ${Greys.White};
    background-color: #97c0da;
    width: 84px;
    height: 84px;
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    top: -30px;
    left: -30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
  }

  .description {
    ${Fonts.Montserrat}
    font-size: 14px;
    font-weight: 600;
    color: ${Greys.Black};
    text-align: left;
  }
`;
