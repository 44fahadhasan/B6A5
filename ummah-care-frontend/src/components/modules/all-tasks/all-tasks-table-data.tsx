import { ASSIGNMENT_STATUS } from "@/constants/assignment.const";
import { Activity, CheckCircle2, Clock3, XCircle } from "lucide-react";

export const statuses = [
  {
    label: "Assigned",
    value: ASSIGNMENT_STATUS.ASSIGNED,
    icon: Activity,
  },
  {
    label: "In Progress",
    value: ASSIGNMENT_STATUS.IN_PROGRESS,
    icon: Clock3,
  },
  {
    label: "Completed",
    value: ASSIGNMENT_STATUS.COMPLETED,
    icon: CheckCircle2,
  },
  {
    label: "Cancelled",
    value: ASSIGNMENT_STATUS.CANCELLED,
    icon: XCircle,
  },
];
