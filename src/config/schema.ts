import { object, string } from "zod";

export const configSchema = object({
  rcare: object({
    server: object({
      baseUrl: string().transform((url) => {
        if (url === "VERCEL") {
          const vercelUrl = process.env["VERCEL_URL"];
          if (vercelUrl == null) {
            throw Error("Expected environment variable `VERCEL_URL` to exist.");
          }
          return "https://" + vercelUrl;
        }
        return url;
      }),
      basicAuth: object({
        username: string(),
        password: string(),
      }).optional(),
    }),
    appUrl: string(),
    stripe: object({
      apiSecret: string(),
      webhookSecret: string().optional(),
      catalog: object({
        annualPriceId: string(),
        quarterlyPriceId: string(),
      }),
    }),
    revenuecat: object({
      stripeApiKey: string().optional(),
    }).optional(),
    firebase: object({
      credential: string().transform((credential) => {
        return JSON.parse(credential);
      }),
      collectionPath: string(),
    }),
    tracking: object({
      googleTagId: string().optional(),
      metaPixelId: string().optional(),
      hotjarId: string().optional(),
    }).optional(),
  }),
  dev: object({
    sessionId: string().optional(),
  }).default({}),
});
