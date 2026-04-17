import { env } from "../../env";

const appUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/+$/, "");

export const PAYMENT_METHOD = {
  STRIPE: "STRIPE",
  MANUAL: "MANUAL", // bank_transfer, cash, cheque, bkash, nagad etc
} as const;

export const PAYMENT_CALLBACK_URL = {
  SUCCESS: `${appUrl}/payment-success`,
  CANCEL: `${appUrl}/payment-cancel`,
} as const;
