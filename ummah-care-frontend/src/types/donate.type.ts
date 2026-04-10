import { createDonationSchema } from "@/components/modules/donate/donate.schema";
import { DONATION_STATUS, PAYMENT_METHOD } from "@/constants/donate.const";
import z from "zod";

export type TDonationPayload = z.infer<typeof createDonationSchema>;

export type TDonationStatus =
  (typeof DONATION_STATUS)[keyof typeof DONATION_STATUS];

export type TPaymentMethod =
  (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

export interface IDonationResponse extends TDonationPayload {
  id: string;
  donorId: string;
  status: TDonationStatus;
  paymentMethod: TPaymentMethod;
  paymentMetadata: null;
  stripeSessionId: string | null;
  stripePaymentIntentId: string | null;
  stripeEventId: string | null;
  transactionId: string | null;
  createdAt: string;
  updatedAt: string;
}
