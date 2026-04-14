import { IVolunteerStats } from "@/types";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

export const mapAssignmentStatusData = (data: IVolunteerStats) => {
  return (
    data.assignmentStatusDistribution?.map((item, idx) => ({
      name: item.status,
      value: item._count.id,
      fill: COLORS[idx % COLORS.length],
    })) || []
  );
};
