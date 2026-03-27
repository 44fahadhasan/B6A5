import {
  TUserRole,
  TUserStatus,
  TUserType,
  TUserTypeStatus,
} from "./user-type";

export interface TokenPayload {
  id: string;
  email: string;
  role: TUserRole;
  status: TUserStatus;
  userTypes: {
    type: TUserType;
    status: TUserTypeStatus;
  }[];
}
