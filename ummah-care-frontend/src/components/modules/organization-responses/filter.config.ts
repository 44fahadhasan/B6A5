import { CATEGORY, REQUEST_STATUS, URGENCY } from "@/constants/request.const";

export type FilterParam = "status" | "category" | "urgency" | "helpType";

export type FilterConfig = {
  paramName: FilterParam;
  placeholder: string;
  source: Record<string, string>;
};

export const FILTER_CONFIG: FilterConfig[] = [
  {
    paramName: "status",
    placeholder: "Status",
    source: REQUEST_STATUS,
  },
  {
    paramName: "category",
    placeholder: "Category",
    source: CATEGORY,
  },
  {
    paramName: "urgency",
    placeholder: "Urgency",
    source: URGENCY,
  },
] as const;
