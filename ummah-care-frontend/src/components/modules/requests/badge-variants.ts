import {
  CATEGORY,
  HELP_TYPE,
  REQUEST_STATUS,
  URGENCY,
} from "@/constants/request.const";

type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost";

export const urgencyVariantMap: Record<keyof typeof URGENCY, BadgeVariant> = {
  LOW: "secondary",
  MEDIUM: "default",
  HIGH: "destructive",
  CRITICAL: "destructive",
};

export const statusVariantMap: Record<
  keyof typeof REQUEST_STATUS,
  BadgeVariant
> = {
  OPEN: "default",
  IN_PROGRESS: "secondary",
  COMPLETED: "outline",
  CANCELLED: "destructive",
};

export const helpTypeVariantMap: Record<keyof typeof HELP_TYPE, BadgeVariant> =
  {
    FINANCIAL: "secondary",
    PHYSICAL: "default",
    BOTH: "outline",
  };

export const categoryVariantMap: Record<keyof typeof CATEGORY, BadgeVariant> = {
  MEDICAL: "destructive",
  FOOD: "default",
  FINANCIAL: "secondary",
  HOUSING: "outline",
  OTHER: "ghost",
};

export const getVariant = <T extends string>(
  map: Record<T, BadgeVariant>,
  key: T,
): BadgeVariant => map[key] ?? "default";
