import { DONATION_STATUS } from "@/constants/donate.const";
import { CheckCircle, Clock, XCircle } from "lucide-react";

export const statuses = [
  {
    value: DONATION_STATUS.PENDING,
    label: "Pending",
    icon: Clock,
  },
  {
    value: DONATION_STATUS.COMPLETED,
    label: "Completed",
    icon: CheckCircle,
  },
  {
    value: DONATION_STATUS.FAILED,
    label: "Failed",
    icon: XCircle,
  },
  {
    value: DONATION_STATUS.CANCELLED,
    label: "Cancelled",
    icon: XCircle,
  },
];
