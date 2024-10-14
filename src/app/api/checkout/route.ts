import { createCheckoutSession } from "@/services/stripe";
import assert from "assert";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const params = new URL(req.url!).searchParams;
  console.log(params);

  const type = params.get("type");
  assert(type === "quarterly" || type === "annual");

  const session = await createCheckoutSession(
    type === "quarterly" ? "quarterly" : "annual"
  );

  return Response.json({ session_url: session.url! });
}
