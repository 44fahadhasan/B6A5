import { createResponseSchema } from "@/components/modules/responses/response.schema";
import { RESPONSE_TYPE } from "@/constants/response.const";
import z from "zod";
import { TCategory, THelpType, TRequestStatus, TUrgency } from "./request.type";
import { TUserRole } from "./user-type";

export type TResponseType = (typeof RESPONSE_TYPE)[keyof typeof RESPONSE_TYPE];

export type TResponsePayload = z.infer<typeof createResponseSchema>;

export interface ICreateMyResponse extends TResponsePayload {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type IUpdateMyResponse = ICreateMyResponse;
export type IDeleteMyResponse = ICreateMyResponse;

export interface IUserAndCreator {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  role: TUserRole;
}

export interface IRequestSummary {
  id: string;
  title: string;
  status: TRequestStatus;
  category: TCategory;
  urgency: TUrgency;
  helpType: THelpType;
  expiresAt: string;
  creator: IUserAndCreator;
}

export interface IResponse {
  id: string;
  requestId: string;
  userId: string;
  responseType: TResponseType;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface IResponses extends IResponse {
  user: IUserAndCreator;
  request: IRequestSummary;
}

export interface IMyRequestResponse extends IResponse {
  user: IUserAndCreator;
}

export interface IMyResponse extends IResponse {
  request: IRequestSummary;
}

export interface IMyResponseDetails extends IResponse {
  request: IRequestSummary;
}
