import { LineChartCard } from "@/components/shared/chart/line-chart-card";
import { IAdminStats } from "@/types";
import { platformActivityChartConfig } from "./admin-platform-activity-chart.config";
import { mapPlatformActivityData } from "./admin-platform-activity-chart.utils";

type Props = {
  data: IAdminStats;
};

export function AdminPlatformActivityChart({ data }: Props) {
  const chartData = mapPlatformActivityData(data);

  return (
    <LineChartCard
      title="Platform Activity"
      description="Monthly growth"
      data={chartData}
      config={platformActivityChartConfig}
      xKey="month"
      series={[
        { key: "requests", colorVar: "chart-1" },
        { key: "donations", colorVar: "chart-2" },
        { key: "users", colorVar: "chart-3" },
      ]}
    />
  );
}
