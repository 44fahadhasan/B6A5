import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    API_BASE_URL: z.url("API_BASE_URL must be a valid URL"),

    ACCESS_TOKEN_SECRET: z.string().min(1, "ACCESS_TOKEN_SECRET is required"),

    SESSION_TOKEN_AGE: z
      .string()
      .min(1, "SESSION_TOKEN_AGE is required (e.g. 30d)"),

    ACCESS_TOKEN_AGE: z
      .string()
      .min(1, "ACCESS_TOKEN_AGE is required (e.g. 15m, 1h)"),

    REFRESH_TOKEN_AGE: z
      .string()
      .min(1, "REFRESH_TOKEN_AGE is required (e.g. 30d)"),
  },

  client: {
    NEXT_PUBLIC_APP_NAME: z.string().min(1, "NEXT_PUBLIC_APP_NAME is required"),

    NEXT_PUBLIC_API_BASE_URL: z.url(
      "NEXT_PUBLIC_API_BASE_URL must be a valid URL",
    ),
  },

  runtimeEnv: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    API_BASE_URL: process.env.API_BASE_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,

    SESSION_TOKEN_AGE: process.env.SESSION_TOKEN_AGE,
    ACCESS_TOKEN_AGE: process.env.ACCESS_TOKEN_AGE,
    REFRESH_TOKEN_AGE: process.env.REFRESH_TOKEN_AGE,
  },
});
