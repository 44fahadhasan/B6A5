import z from "zod";

export const createMessageSchema = z.object({
  receiverId: z.string(),
  requestId: z.string(),
  message: z.string().min(1).max(1000),
});
