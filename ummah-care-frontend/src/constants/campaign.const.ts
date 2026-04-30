export const CAMPAIGN_STATUS = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export const CAMPAIGN_CURRENCY = {
  BDT: "BDT",
  USD: "USD",
  EUR: "EUR",
} as const;

export type TCampaignStatus =
  (typeof CAMPAIGN_STATUS)[keyof typeof CAMPAIGN_STATUS];
export type TCampaignCurrency =
  (typeof CAMPAIGN_CURRENCY)[keyof typeof CAMPAIGN_CURRENCY];
