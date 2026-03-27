import { USER_TYPE } from "@/constants/user.const";
import z from "zod";

export const onboardingSchema = z.object({
  types: z
    .array(z.enum(USER_TYPE))
    .nonempty("At least one type must be selected")
    .refine(
      (arr) => new Set(arr).size === arr.length,
      "Duplicate types are not allowed",
    ),

  // Optional org fields, only relevant if ORGANIZATION type is selected
  orgName: z.string().max(200).optional(),
  description: z.string().optional(),
  logoUrl: z.url().optional(),
  website: z.url().optional(),
  registrationNumber: z.string().max(100).optional(),
  contactEmail: z.email().optional(),
  contactPhone: z.string().optional(),
});

export type IOnboardingPayloadPayload = z.infer<typeof onboardingSchema>;
