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
    return ensureSessionId(req);
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

function ensureSessionId(req: NextRequest) {
  const res = NextResponse.next();
  return new Session(req).ensureSessionId(res);
}
