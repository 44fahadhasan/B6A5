import z from "zod";

export const createDonationSchema = z.object({
  requestId: z.uuid("Invalid request ID"),
  campaignId: z.uuid("Invalid campaign ID").optional(),
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a valid number",
    })
    .refine((val) => Number(val) >= 1, {
      message: "Amount must be at least 1",
    })
    .transform((val) => Number(val).toString()),
  currency: z
    .string()
    .length(3)
    .default("BDT")
    .describe("ISO 4217 currency code"),
  notes: z.string().trim().min(1, "Notes cannot be empty").max(500),
});
