import { createCheckoutSession } from "@/services/stripe";
import assert from "assert";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const params = new URL(req.url!).searchParams;
  const type = params.get("type");
  assert(type === "quarterly" || type === "annual");

  const session = await createCheckoutSession(
    type === "quarterly" ? "quarterly" : "annual"
  );

  return Response.json({ session_url: session.url! });
}
