import { object, string } from "zod";

export const configSchema = object({
  rcare: object({
    server: object({
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
