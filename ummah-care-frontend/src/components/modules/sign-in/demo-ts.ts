import { ISignInPayload } from "./sign-in.form.schema";

export const DEMO_CREDENTIALS: Record<"user" | "admin", ISignInPayload> = {
  user: {
    email: "22fahadhasan@gmail.com",
    password: "44fahadhasan@gmail.coM",
  },
  admin: {
    email: "44fahadhasan@gmail.com",
    password: "44fahadhasan@gmail.coM",
  },
};
