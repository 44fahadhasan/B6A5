import { IUserType, TUserRole, TUserStatus } from "./user-type";

export interface IAuthUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  emailVerified: boolean;
  avatarUrl: string | null;
  location: string | null;
  role: TUserRole;
  status: TUserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ISignUpResponse {
  user: IAuthUser;
}

export interface ISignInResponse {
  token: string;
  user: IAuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface ITokenRefreshResponse {
  token: string;
  accessToken: string;
  refreshToken: string;
}

export interface ISession {
  id: string;
  token: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ISessionUser extends IAuthUser {
  userTypes: IUserType[];
}

export interface ISessionResponse {
  user: ISessionUser;
  session: ISession;
}
