import { IAdminStats } from "@/types";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

export const mapRequestCategoryData = (data: IAdminStats) => {
  return (
    data.requestCategoryDistribution?.map((item, idx) => ({
      name: item.category,
      value: item._count.id,
      fill: COLORS[idx % COLORS.length],
    })) || []
  );
};
