import { USER_ROLE, USER_STATUS } from "@/constants/user.const";
import {
  Shield,
  ShieldCheck,
  User,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";

export const roles = [
  {
    label: "User",
    value: USER_ROLE.USER,
    icon: User,
  },
  {
    label: "Admin",
    value: USER_ROLE.ADMIN,
    icon: Shield,
  },
  {
    label: "Super Admin",
    value: USER_ROLE.SUPER_ADMIN,
    icon: ShieldCheck,
  },
];

export const statuses = [
  {
    label: "Active",
    value: USER_STATUS.ACTIVE,
    icon: UserCheck,
  },
  {
    label: "Inactive",
    value: USER_STATUS.INACTIVE,
    icon: UserX,
  },
  {
    label: "Suspended",
    value: USER_STATUS.SUSPENDED,
    icon: UserX,
  },
  {
    label: "Banned",
    value: USER_STATUS.BANNED,
    icon: UserX,
  },
];

export const userTypes = [
  {
    label: "Donor",
    value: "DONOR",
    icon: Users,
  },
  {
    label: "Volunteer",
    value: "VOLUNTEER",
    icon: UserCheck,
  },
  {
    label: "Organization",
    value: "ORGANIZATION",
    icon: Shield,
  },
];
