import {
  CATEGORY,
  HELP_TYPE,
  REQUEST_STATUS,
  URGENCY,
} from "@/constants/request.const";
import z from "zod";

export const myRequestSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(200, "Title must not exceed 200 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(5000, "Description must not exceed 5000 characters"),

  category: z.enum(CATEGORY),

  urgency: z.enum(URGENCY),

  helpType: z.enum(HELP_TYPE),

  location: z
    .string()
    .max(150, "Location must not exceed 150 characters")
    .optional(),

  isAnonymous: z.boolean().optional().default(false),
});

export const myRequestCancelSchema = z.object({
  status: z.enum(REQUEST_STATUS),
});
