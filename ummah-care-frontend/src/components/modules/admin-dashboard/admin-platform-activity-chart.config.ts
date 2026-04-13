import { ChartConfig } from "@/components/ui/chart";

export const platformActivityChartConfig = {
  requests: { label: "Requests", color: "var(--chart-1)" },
  donations: { label: "Donations", color: "var(--chart-2)" },
  users: { label: "Users", color: "var(--chart-3)" },
} satisfies ChartConfig;
