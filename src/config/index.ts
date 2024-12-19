import { configSchema } from "./schema";
import { transformEnvToNestedObject } from "./transformEnvToNestedObject";

export const { rcare: config, dev: devConfig } = configSchema.parse(
  transformEnvToNestedObject(process.env || {})
);
