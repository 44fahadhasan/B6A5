import { myRequestSchema } from "@/components/modules/my-requests/my-requests.schema";
import {
  CATEGORY,
  HELP_TYPE,
  REQUEST_STATUS,
  URGENCY,
} from "@/constants/request.const";
import z from "zod";

export type TCategory = (typeof CATEGORY)[keyof typeof CATEGORY];
export type TUrgency = (typeof URGENCY)[keyof typeof URGENCY];
export type THelpType = (typeof HELP_TYPE)[keyof typeof HELP_TYPE];
export type TRequestStatus =
  (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS];

export type TRequestPayload = z.infer<typeof myRequestSchema>;

export interface IRequestResponse extends TRequestPayload {
  id: string;
  status: TRequestStatus;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}
