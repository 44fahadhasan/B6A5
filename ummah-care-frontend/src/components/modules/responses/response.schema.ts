import { RESPONSE_TYPE } from "@/constants/response.const";
import z from "zod";

export const createResponseSchema = z.object({
  requestId: z.uuid(),
  responseType: z.enum([
    RESPONSE_TYPE.VOLUNTEER,
    RESPONSE_TYPE.DONATE,
    RESPONSE_TYPE.COORDINATE,
  ]),
  message: z.string().max(1000).optional(),
});
