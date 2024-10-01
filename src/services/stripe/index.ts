const stripeSecret =
  "sk_test_51Q45v1H79UYIyo3GXiD8z1DPljvFxEsDH5ZoOmi6rKb7UhdKeTG6zMGxqtzJZYs6wBhlYwXEeH2V5RvWerEw9xCe00g9Vqs2ou";

const annualPriceId = "price_1Q45wfH79UYIyo3G1XuB00cv";
const quarterlyPriceId = "price_1Q45wLH79UYIyo3GIENaryrU";
const successUrl = "http://localhost:3000/success";
const cancelUrl = "http://localhost:3000/cancel";

import Stripe from "stripe";

export async function createCheckoutSession(
  productKind: "quarterly" | "annual"
) {
  const stripe = new Stripe(stripeSecret);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: productKind === "quarterly" ? quarterlyPriceId : annualPriceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session;
}
