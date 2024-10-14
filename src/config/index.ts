import { configSchema } from "./schema";
import { transformEnvToNestedObject } from "./transformEnvToNestedObject";

export const config = configSchema.parse(
  transformEnvToNestedObject(process.env || {})
).rcare;
