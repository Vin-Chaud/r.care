import { config } from "@/config";
import { Session } from "@/services/session";
import { NextRequest, NextResponse } from "next/server.js";

export const basicAuthConfig = config.server.basicAuth;

export function middleware(req: NextRequest) {
  if (basicAuthConfig != null) {
    const response = handleBasicAuth(req, basicAuthConfig);
    if (response) {
      return response;
    }
  }

  if (req.nextUrl.pathname === "/") {
    const params = new URL(req.url!).searchParams;
    const restart = params.has("restart");

    return new Session(req).ensureSessionId(NextResponse.next(), restart);
  }

  return NextResponse.next();
}

function handleBasicAuth(
  req: NextRequest,
  auth: NonNullable<typeof basicAuthConfig>
) {
  const authString = Buffer.from(`${auth.username}:${auth.password}`).toString(
    "base64"
  );
  const authorization = req.headers.get("authorization");

  // If no authorization header or it's invalid, return 401 Unauthorized
  if (!authorization || authorization !== `Basic ${authString}`) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  return null;
}
