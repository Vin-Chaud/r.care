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

  getExistingSessionIfExists(): string | null {
    return this.requestCookies.get("sessionId")?.value ?? null;
  }

  private readonly requestCookies: Pick<ReadonlyRequestCookies, "get">;
}

export class Session extends ReadonlySession {
  constructor(req: NextRequest) {
    super(req);
  }

  ensureSessionId(res: NextResponse) {
    let sessionId = this.getExistingSessionIfExists();
    if (sessionId != null) {
      return res;
    }

    sessionId = createSessionId();
    res.cookies.set("sessionId", sessionId, { httpOnly: true });
    return res;
  }
}

const createSessionId = customAlphabet("1234567890abcdefghjklmnpqrstvwxyz", 32);
