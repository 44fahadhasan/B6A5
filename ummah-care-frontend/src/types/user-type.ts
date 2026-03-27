import {
  USER_ROLE,
  USER_STATUS,
  USER_TYPE,
  USER_TYPE_STATUS,
} from "@/constants/user.const";

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type TUserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

export type TUserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];

export type TUserTypeStatus =
  (typeof USER_TYPE_STATUS)[keyof typeof USER_TYPE_STATUS];

export interface IUserType {
  id: string;
  userId: string;
  type: TUserType;
  status: TUserTypeStatus;
}

export interface IUser {
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
