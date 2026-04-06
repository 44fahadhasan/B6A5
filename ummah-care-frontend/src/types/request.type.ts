import {
  myRequestCancelSchema,
  myRequestSchema,
} from "@/components/modules/my-requests/my-requests.schema";
import {
  CATEGORY,
  HELP_TYPE,
  REQUEST_STATUS,
  URGENCY,
} from "@/constants/request.const";
import z from "zod";
import { TResponseType } from "./response.types";

export type TCategory = (typeof CATEGORY)[keyof typeof CATEGORY];
export type TUrgency = (typeof URGENCY)[keyof typeof URGENCY];
export type THelpType = (typeof HELP_TYPE)[keyof typeof HELP_TYPE];
export type TRequestStatus =
  (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS];

export type TRequestPayload = z.infer<typeof myRequestSchema>;
export type TRequestCancelPayload = z.infer<typeof myRequestCancelSchema>;

export interface IRequestResponse extends TRequestPayload {
  id: string;
  status: TRequestStatus;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreator {
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}

export interface IRequestDetailsResponse extends IRequestResponse {
  isAnonymous: boolean;
  creator: ICreator;
  createdBy: string;
}

export interface IRequestResponseUser {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface IMyRequestResponse {
  id: string;
  requestId: string;
  userId: string;
  responseType: TResponseType;
  message: string;
  createdAt: string;
  updatedAt: string;
  user: IRequestResponseUser;
}
