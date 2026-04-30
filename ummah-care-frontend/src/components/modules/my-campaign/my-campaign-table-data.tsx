import { CAMPAIGN_CURRENCY, CAMPAIGN_STATUS } from "@/constants/campaign.const";
import {
  CheckCircle,
  Circle,
  CircleOff,
  Clock,
  DollarSign,
} from "lucide-react";

export const statuses = [
  {
    label: "Draft",
    value: CAMPAIGN_STATUS.DRAFT,
    icon: Circle,
  },
  {
    label: "Active",
    value: CAMPAIGN_STATUS.ACTIVE,
    icon: Clock,
  },
  {
    label: "Completed",
    value: CAMPAIGN_STATUS.COMPLETED,
    icon: CheckCircle,
  },
  {
    label: "Cancelled",
    value: CAMPAIGN_STATUS.CANCELLED,
    icon: CircleOff,
  },
];

export const currencies = [
  {
    label: "BDT",
    value: CAMPAIGN_CURRENCY.BDT,
    icon: DollarSign,
  },
  {
    label: "USD",
    value: CAMPAIGN_CURRENCY.USD,
    icon: DollarSign,
  },
  {
    label: "EUR",
    value: CAMPAIGN_CURRENCY.EUR,
    icon: DollarSign,
  },
];
