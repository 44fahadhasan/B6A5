import {
  USER_ROLE,
  USER_STATUS,
  USER_TYPE,
  USER_TYPE_STATUS,
} from "@/constants/user.const";
import { ITokenRefreshResponse } from "./auth-type";

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

export interface IUserTypeEntries {
  type: TUserType;
  id: string;
  status: TUserTypeStatus;
}

export interface IOrganization {
  id: string;
  userId: string;
  orgName: string;
  description?: string | null;
  logoUrl?: string | null;
  website?: string | null;
  registrationNumber?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  isVerified: boolean;
  verifiedAt?: string | null;
  verifiedBy?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IAllUsersResponse extends IUser {
  userTypes: IUserType[];
  organization?: IOrganization;
  _count: {
    createdRequests: number;
    donations: number;
  };
}

export interface IOnboardWithNoOrg
  extends ITokenRefreshResponse, IUserTypeEntries {
  organization?: never;
}

export interface IOnboardWithOrg
  extends ITokenRefreshResponse, IUserTypeEntries {
  organization: IOrganization;
}

export type IOnboardingResponse = IOnboardWithNoOrg | IOnboardWithOrg;
