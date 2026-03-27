import { cookies } from "next/headers";

type TCookieOptions = {
  path?: string;
  domain?: string;
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "lax" | "strict" | "none";
};

const cookieOptions = (age: number) => {
  const options: TCookieOptions = {
    path: "/",
    maxAge: age,
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  };
  return options;
};

const setCookie = async (name: string, value: string, age: number) => {
  const cookieStore = await cookies();
  const options = cookieOptions(age);

  cookieStore.set(name, value, options);
};

const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

const deleteCookie = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.delete(key);
};

export const cookieUtils = {
  setCookie,
  getCookie,
  deleteCookie,
  cookieOptions,
};
