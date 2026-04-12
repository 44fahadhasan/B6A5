import { CATEGORY, REQUEST_STATUS, URGENCY } from "@/constants/request.const";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  Timer,
} from "lucide-react";

export const categories = [
  {
    label: "Financial",
    value: CATEGORY.FINANCIAL,
  },
  {
    label: "Food",
    value: CATEGORY.FOOD,
  },
  {
    label: "Housing",
    value: CATEGORY.HOUSING,
  },
  {
    label: "Medical",
    value: CATEGORY.MEDICAL,
  },
  {
    label: "Other",
    value: CATEGORY.OTHER,
  },
];

export const statuses = [
  {
    label: "Open",
    value: REQUEST_STATUS.OPEN,
    icon: Circle,
  },
  {
    label: "In Progress",
    value: REQUEST_STATUS.IN_PROGRESS,
    icon: Timer,
  },
  {
    label: "Completed",
    value: REQUEST_STATUS.COMPLETED,
    icon: CheckCircle,
  },
  {
    label: "Canceled",
    value: REQUEST_STATUS.CANCELLED,
    icon: CircleOff,
  },
];

export const urgencies = [
  {
    label: "Low",
    value: URGENCY.LOW,
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: URGENCY.MEDIUM,
    icon: ArrowRight,
  },
  {
    label: "High",
    value: URGENCY.HIGH,
    icon: ArrowUp,
  },
  {
    label: "Critical",
    value: URGENCY.CRITICAL,
    icon: AlertTriangle,
  },
];
