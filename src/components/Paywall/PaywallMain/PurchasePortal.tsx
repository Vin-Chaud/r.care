import { ForwardNavButton } from "@/components/ForwardNavButton";
import { GreenCheck } from "@/components/icons/GreenCheck";
import { MarkdownText } from "@/components/MarkdownText";
import { Seal } from "./Seal";

const prices = {
  yearlyFull: 233.99,
  yearlyDiscounted: 119.99,
  quarterlyFull: 69.99,
};

export function PurchasePortal() {
  const yearlyDiscountedDaily = Number(
    (prices.yearlyDiscounted / 365).toFixed(2)
  );
  const yearlyDiscountedDailyWhole = Math.floor(yearlyDiscountedDaily);
  const yearlyDiscountedDailyFraction = (yearlyDiscountedDaily * 100) % 100;

  const quarterlyDaily = Number((prices.quarterlyFull / 90).toFixed(2));
  const quarterlyDailyWhole = Math.floor(quarterlyDaily);
  const quarterlyDailyFraction = (quarterlyDaily * 100) % 100;

  const borderWidth = 2;
  const borderRadius = 15;

  return (
    <section style={{ backgroundColor: "#FFF5EB" }}>
      <header>{"Choose your plan"}</header>
      <button onClick={() => handleSubscribe("annual")}>
        <div
          style={{
            backgroundColor: "white",
            border: `${borderWidth}px solid #945DD9`,
            borderRadius: borderRadius,
          }}
        >
          <p
            style={{
              backgroundColor: "#945DD9",
              color: "white",
              margin: -borderWidth,
              width: `calc(100% + 2*${borderWidth}px)`,
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
            }}
          >
            {"🔥 Includes 7-day Free Trial"}
          </p>
          <p>
            <GreenCheck /> {"Yearly"}
          </p>
          <p>
            {prices.yearlyDiscounted != null && (
              <span
                style={{
                  color: "red",
                  textDecoration: "line-through",
                  fontSize: 15,
                }}
              >
                {"$" + prices.yearlyFull}
              </span>
            )}
            <span style={{ fontSize: 18 }}>
              {"$" + prices.yearlyDiscounted}
            </span>
          </p>
          <p>{"Billed yearly"}</p>
          <p>
            <span>{"$"}</span>
            <span>{yearlyDiscountedDailyWhole}</span>
            <span>{"." + yearlyDiscountedDailyFraction}</span>
            <span>{"/ day"}</span>
          </p>
        </div>
      </button>

      <MarkdownText tag="p">
        {
          "💡Yearly plan offers the biggest savings. You can save 57% compared to the 3-month plan!"
        }
      </MarkdownText>

      <button onClick={() => handleSubscribe("quarterly")}>
        <div>
          <p>{"3-month"}</p>
          <p>
            <span style={{ fontSize: 18 }}>{"$" + prices.quarterlyFull}</span>
          </p>
          <p>{"Billed every 3 months"}</p>
          <p>
            <span>{"$"}</span>
            <span>{quarterlyDailyWhole}</span>
            <span>{"." + quarterlyDailyFraction}</span>
            <span>{"/ day"}</span>
          </p>
        </div>
      </button>

      <ForwardNavButton onClick={() => handleSubscribe("annual")}>
        {"Start 7-day Free Trial"}
      </ForwardNavButton>

      <div>
        <Seal />
        <h4>{"See results or 200% money back."}</h4>
        <div>
          {
            "If you go through the R.care program for 30 days and don't see results, we offer 200% money back."
          }
        </div>
      </div>
    </section>
  );
}

const handleSubscribe = async (kind: "annual" | "quarterly") => {
  window.location.href = "/api/checkout?type=" + kind;
};
