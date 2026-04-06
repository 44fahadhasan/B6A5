import { createResponseSchema } from "@/components/modules/responses/response.schema";
import { RESPONSE_TYPE } from "@/constants/response.const";
import z from "zod";
import { TRequestStatus } from "./request.type";
import { TUserRole } from "./user-type";

export type TResponseType = (typeof RESPONSE_TYPE)[keyof typeof RESPONSE_TYPE];

export type TResponsePayload = z.infer<typeof createResponseSchema>;

export interface ICreateResponse extends TResponsePayload {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type IUpdateResponse = ICreateResponse;
export type IDeleteResponse = ICreateResponse;

export interface IResponseUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  role: TUserRole;
}

export interface IRequest {
  id: string;
  title: string;
  status: TRequestStatus;
}

export interface IResponse {
  id: string;
  requestId: string;
  userId: string;
  responseType: TResponseType;
  message: string;
  createdAt: string;
  updatedAt: string;
  user: IResponseUser;
  request: IRequest;
}

export interface IResponseDetails extends IResponse {
  request: IRequest & { createdBy: string };
}
