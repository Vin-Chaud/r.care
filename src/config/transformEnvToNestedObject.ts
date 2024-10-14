export function transformEnvToNestedObject(
  env: Readonly<Record<string, string | undefined>>
): object {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {};

  for (const [envKey, envValue] of Object.entries(env)) {
    if (envValue != null) {
      const envKeyParts = envKey.split(/__+/g).map(envKeyPartToCamelCase);
      setNestedValue(result, envKeyParts, envValue);
    }
  }

  return result;
}

function envKeyPartToCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setNestedValue(obj: any, keys: string[], value: string): void {
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}
