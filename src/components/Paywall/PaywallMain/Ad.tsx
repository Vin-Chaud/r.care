import { Header } from "@/components/Paywall/PaywallMain/common";
import { Fonts, Greys } from "@/design_components/design_system";
import { ScrollablePageContentFrame } from "@/design_components/PageLayout";
import styled from "styled-components";

export function Ad({}: {}) {
  return (
    <ScrollablePageContentFrame background={Greys.White}>
      <Layout>
        <header>
          <Header>{"Unlock a week of progress with our free trial!"}</Header>
          <Subheader>{"Your personalized plan includes:"}</Subheader>
        </header>
        <OfferList>
          <Offer
            count={210}
            description={
              "Daily bite-sized lessons that will rewire your brain and build healthier eating habits"
            }
          />
          <Offer
            count={13}
            description={
              "CBT, DBT, and AAT based modules to understand and manage cravings and urges"
            }
          />
          <Offer
            count={9}
            description={
              "In-app tools to set you up for success: activities, reminders as well as progress tracking."
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
    font-weight: 600px;
    color: ${Greys.Black};
    text-align: left;
  }
`;
