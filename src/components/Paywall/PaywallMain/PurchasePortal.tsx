import { ForwardNavButton } from "@/components/ForwardNavButton";
import { GreenCheck } from "@/components/icons/GreenCheck";
import { Fonts, Greys, Purples } from "@/design_components/design_system";
import { ScrollablePageContentFrame } from "@/design_components/PageLayout";
import { createMarkdownText } from "@/design_components/typography/MarkdownText";
import { SubscriptionType } from "@/models/Subscription";
import { withOpacity } from "@/utils/color";
import styled from "styled-components";
import { Seal } from "./Seal";
import { HeaderB } from "@/components/Paywall/PaywallMain/common";

const prices = {
  yearlyFull: 119.99,
  yearlyDiscounted: 89.99,
  quarterlyFull: 9.99,
};

export function PurchasePortal({
  portalId,
  value,
  onChange,
}: {
  portalId: string;
  value: SubscriptionType;
  onChange(value: SubscriptionType): void;
}) {
   const ctaLabel =
 value === SubscriptionType.Yearly ? "Start my $1 trial" : "Start";
  return (
    <ScrollablePageContentFrame background={"#FFF5EB"}>
      <Layout
        onSubmit={(ev) => {
          ev.preventDefault();
          window.location.href = "/api/checkout?type=" + value;
        }}
      >
      
        <ProductChooser
          fullAmount={prices.yearlyFull}
          discountedAmount={prices.yearlyDiscounted}
          id={`purchase-${portalId}-yearly`}
          checked={value === SubscriptionType.Yearly}
          name={`purchase-${portalId}`}
          title={"1 Year"}
          description={"25% Special offer"}
          promo={"✨ Start with a 7-day trial for just $1!"}
          pricePeriodInDays={365}
          value={SubscriptionType.Yearly}
          onChange={onChange}
        />
       
        <ProductChooser
          fullAmount={prices.quarterlyFull}
          id={`purchase-${portalId}-quarterly`}
          checked={value === SubscriptionType.Quarterly}
          pricePeriodInDays={365}
          title={"1 Month"}
          description={""}
          name={`purchase-${portalId}`}
          value={SubscriptionType.Quarterly}
          onChange={onChange}
        />
        <ForwardNavButton type="submit">{ctaLabel}</ForwardNavButton>
        <MoneyBack />
      </Layout>
    </ScrollablePageContentFrame>
  );
}

function ProductChooser<Value extends string>({
  fullAmount,
  discountedAmount,
  pricePeriodInDays,
  id,
  title,
  description,
  checked,
  name,
  promo,
  value,
  onChange,
}: {
  id: string;
  name: string;
  checked: boolean;
  fullAmount: number;
  title: string;
  description?: string;
  discountedAmount?: number | null;
  pricePeriodInDays: number;
  value: Value;
  promo?: string;
  onChange(value: Value): void;
}) {
  const dailyPrice = Number(
    ((discountedAmount ?? fullAmount) / pricePeriodInDays).toFixed(2)
  );
  const dailyWhole = Math.floor(dailyPrice);
  const dailyFraction = (dailyPrice * 100) % 100;

  return (
    <ProductChooserLayout htmlFor={id}>
      {promo && <p className="promo">{promo}</p>}
      <div className="main">
        <div className="production_description">
          <div className="title">
            {title}{" "}
            <div className="check">
              <GreenCheck />
            </div>
          </div>
          <p className="prices">
            {discountedAmount != null && (
              <span className="price_struck">{"$" + fullAmount}</span>
            )}
            <span className="price">
              {"$" + (discountedAmount ?? fullAmount)}
            </span>
          </p>
          <p className="description">{description}</p>
        </div>
        <p className="daily_price">
          <span className="currency">{"$"}</span>
          <span className="integer">{dailyWhole}</span>
          <span className="decimal">{"." + dailyFraction}</span>
          <span className="unit">{"/ day"}</span>
        </p>
      </div>
      <input
        type="radio"
        name={name}
        checked={checked}
        id={id}
        value={value}
        onChange={(ev) => onChange(ev.target.value as Value)}
      />
    </ProductChooserLayout>
  );
}

function MoneyBack() {
  return (
    <MoneyBackLayout>
      <div className="seal_container">
        <Seal />
      </div>
      <div>
        <h4>{"Thoughtfully designed daily practice"}</h4>
        <p>
          {
            "Every detail is intentionally crafted to help Scripture feel clear, accessible, and present in your everyday life."
          }
        </p>
      </div>
    </MoneyBackLayout>
  );
}

const Layout = styled.form`
  padding-block: 20px;
`;
const ProductChooserLayout = styled.label`
  display: block;
  position: relative;
  border-radius: 15px;
  border: 4px solid ${withOpacity(Purples.Purple94, 0)};
  overflow: hidden;
  transition: border 0.2s;
  cursor: pointer;

  .promo {
    ${Fonts.Montserrat}
    font-weight:800;
    font-size: 14px;
    color: ${Greys.White};
    background-color: ${Greys.GreyC8};
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px;
  }

  .main {
    background-color: ${Greys.White};
    display: flex;
    padding: 50px 15px 25px 50px;
    align-items: center;
    height: 125px;
    box-sizing: border-box;
  }

  .production_description {
    flex-grow: 1;

    .title {
      position: relative;
      ${Fonts.Montserrat}
      font-size: 26px;
      font-weight: 800;
      margin-top: 0px;
      margin-bottom: 10px;

      .check {
        position: absolute;
        top: 50%;
        left: -10px;
        transform: translate(-100%, -50%);
        line-height: 0px;
        opacity: 0;
        transition: opacity 0.2s;
      }
    }

    .prices {
      margin-block: 2px;
    }

    .price {
      ${Fonts.SFPro};
      font-size: 16px;
      font-weight: 600;
    }

    .price_struck {
      ${Fonts.SFPro};
      font-size: 13px;
      font-weight: 600;
      color: red;
      text-decoration: line-through;
      margin-right: 0.5em;
    }

    .description {
      ${Fonts.Inter};
      font-size: 13px;
      font-weight: 500;
      color: ${Purples.Purple94};
      margin-block: 2px;
    }
  }

  .daily_price {
    ${Fonts.SFPro}
    font-weight: 700;
    font-size: 17px;
    height: 60px;
    margin-top: 20px;

    .currency {
      vertical-align: text-top;
    }

    .integer {
      font-weight: 500;
      font-size: 3.5em;
      vertical-align: text-top;
      position: relative;
      top: -0.3em;
    }

    .decimal {
      display: inline-block;
      vertical-align: text-top;
      overflow: visible;
      width: 0px;
    }

    .unit {
      color: ${Greys.Grey7E};
      position: relative;
      top: 1.2em;
    }
  }

  &:has(input:checked) {
    border: 4px solid ${Purples.Purple94};

    .promo {
      background-color: ${Purples.Purple94};
    }

    .title .check {
      opacity: 1;
    }
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
`;

const YearlyProTip = createMarkdownText(styled.p`
  ${Fonts.Inter}
  font-weight: 400px;
  font-size: 14px;
  padding: 5px 20px;
  border-radius: 20px;
`);

const MoneyBackLayout = styled.section`
  display: flex;
  flex-direction: row;
  align-items: start;

  .seal_container {
    flex-shrink: 0;
    flex-grow: 0;
    margin-right: 20px;
  }

  h4 {
    ${Fonts.Inter}
    font-size: 14px;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 0px;
  }

  p {
    ${Fonts.Inter}
    font-size: 12px;
    font-weight: 400;
    margin-block: 0px;
  }
`;
