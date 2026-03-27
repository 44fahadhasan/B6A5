import z from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.email().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must not exceed 64 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[^A-Za-z0-9]/, "Must include at least one special character")
    .regex(/^\S*$/, "Password must not contain spaces"),
});

export type ISignUpPayload = z.infer<typeof signUpSchema>;
