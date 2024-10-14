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
    stripe: object({
      apiSecret: string(),
      catalog: object({
        annualPriceId: string(),
        quarterlyPriceId: string(),
      }),
    }),
    firebase: object({
      apiKey: string(),
      projectId: string(),
      appId: string(),
      collectionPath: string(),
    }),
  }),
});
