export enum SubscriptionType {
  Yearly = "YEARLY",
  Quarterly = "QUARTERLY",
}

export function isSubscriptionType(value: string): value is SubscriptionType {
  return (Object.values(SubscriptionType) as string[]).includes(value);
}
