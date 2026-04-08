import { createMessageSchema } from "@/components/modules/message/message.schema";
import z from "zod";

export type TMessagePayload = z.infer<typeof createMessageSchema>;

export interface IMessageResponse extends TMessagePayload {
  id: string;
  senderId: string;
  isRead: boolean;
  createdAt: string;
}

export interface IUserSummary {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
}

export interface TMessageConversation extends IMessageResponse {
  sender: IUserSummary;
  receiver: IUserSummary;
}
