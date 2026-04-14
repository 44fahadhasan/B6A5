import { createDonationSchema } from "@/components/modules/donate/donate.schema";
import { DONATION_STATUS } from "@/constants/donate.const";
import { PAYMENT_METHOD } from "@/constants/payment.const";
import z from "zod";

export type TDonationPayload = z.infer<typeof createDonationSchema>;

export type TDonationStatus =
  (typeof DONATION_STATUS)[keyof typeof DONATION_STATUS];

export type TPaymentMethod =
  (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

export interface IDonorSummary {
  id: string;
  name: string;
  email: string;
}

export interface IRequestSummaryForDonate {
  id: string;
  title: string;
  creator: IDonorSummary;
}

export interface ICampaignSummary {
  id: string;
  title: string;
}

export interface IDonationResponse extends TDonationPayload {
  id: string;
  donor: IDonorSummary;
  status: TDonationStatus;
  paymentMethod: TPaymentMethod;
  paymentMetadata: null;
  stripeSessionId: string | null;
  stripePaymentIntentId: string | null;
  stripeEventId: string | null;
  transactionId: string | null;
  createdAt: string;
  updatedAt: string;
  request: IRequestSummaryForDonate;
  campaign?: ICampaignSummary;
}

export type IDonationListResponse = IDonationResponse[];
