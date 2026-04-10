import z from "zod";

export const verifyEmailSchema = z.object({
  email: z.email("Invalid email address").toLowerCase(),
  otp: z
    .string()
    .length(5, "OTP must be exactly 5 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

export type IVerifyEmailPayload = z.infer<typeof verifyEmailSchema>;
