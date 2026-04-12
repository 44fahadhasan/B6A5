import { CATEGORY, HELP_TYPE, URGENCY } from "@/constants/request.const";

export type FilterParam = "status" | "category" | "urgency" | "helpType";

export type FilterConfig = {
  paramName: FilterParam;
  placeholder: string;
  source: Record<string, string>;
};

export const FILTER_CONFIG: FilterConfig[] = [
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
  {
    paramName: "helpType",
    placeholder: "Help Type",
    source: HELP_TYPE,
  },
] as const;
