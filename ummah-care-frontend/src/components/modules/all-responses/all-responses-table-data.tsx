import { REQUEST_STATUS, URGENCY } from "@/constants/request.const";
import { RESPONSE_TYPE } from "@/constants/response.const";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HandHeart,
  HeartHandshake,
  Settings,
  Timer,
} from "lucide-react";

export const responseTypes = [
  {
    label: "Volunteer",
    value: RESPONSE_TYPE.VOLUNTEER,
    icon: HeartHandshake,
  },
  {
    label: "Donate",
    value: RESPONSE_TYPE.DONATE,
    icon: HandHeart,
  },
  {
    label: "Coordinate",
    value: RESPONSE_TYPE.COORDINATE,
    icon: Settings,
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
