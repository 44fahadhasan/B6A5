import z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address").toLowerCase(),
});

export type IForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;
