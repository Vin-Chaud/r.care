import { devConfig } from "@/config";
import { getRequestHost } from "@/services/stripe";
import { customAlphabet } from "nanoid";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies as nextCookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export class ReadonlySession {
  constructor(reqOrCookiesFn: NextRequest | typeof nextCookies) {
    this.requestCookies =
      typeof reqOrCookiesFn === "function"
        ? reqOrCookiesFn()
        : reqOrCookiesFn.cookies;
  }

  getSessionifExists(): string | null {
    return (
      this.getDevelopmentSessionIdOverride() ??
      this.requestCookies.get("sessionId")?.value ??
      null
    );
  }

  protected getDevelopmentSessionIdOverride(): string | null {
    return devConfig.sessionId ?? null;
  }

  private readonly requestCookies: Pick<ReadonlyRequestCookies, "get">;
}

export class Session extends ReadonlySession {
  constructor(private readonly req: NextRequest) {
    super(req);
  }

  ensureSessionId(res: NextResponse, forceNew: boolean) {
    const devSessionIdOverride = this.getDevelopmentSessionIdOverride();
    if (devSessionIdOverride != null) {
      return res;
    }

    let sessionId = this.getSessionifExists();
    if (sessionId != null && !forceNew) {
      return res;
    }

    sessionId = createSessionId();
    res.cookies.set("sessionId", sessionId, { httpOnly: true });
    res.cookies.set("baseUrl", getRequestHost(this.req));
    return res;
  }
}

const createSessionId = customAlphabet("1234567890abcdefghjklmnpqrstvwxyz", 32);
