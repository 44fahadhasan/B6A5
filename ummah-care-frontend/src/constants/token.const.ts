import ms, { type StringValue } from "ms";
import { env } from "../../env";

const msToSeconds = (time: string): number => ms(time as StringValue) / 1000;

export const TOKEN_CONFIG = {
  REFRESH_TOKEN_NAME: "refreshToken",
  REFRESH_TOKEN_AGE: msToSeconds(env.REFRESH_TOKEN_AGE),

  SESSION_TOKEN_NAME: "sessionToken",
  SESSION_TOKEN_AGE: msToSeconds(env.SESSION_TOKEN_AGE),

  ACCESS_TOKEN_NAME: "accessToken",
  ACCESS_TOKEN_AGE: msToSeconds(env.ACCESS_TOKEN_AGE),

  TOKEN_REFRESHED_HEADER: "X-Token-Refreshed",
} as const;
