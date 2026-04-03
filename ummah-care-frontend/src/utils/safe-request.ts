import { getErrorMessage } from "./error-util";

export async function safeRequest<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
