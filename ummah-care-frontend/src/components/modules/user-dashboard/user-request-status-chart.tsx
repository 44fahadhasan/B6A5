import { PieChartCard } from "@/components/shared/chart/pie-chart-card";
import { IUserStats } from "@/types";
import { userRequestStatusChartConfig } from "./user-request-status-chart.config";
import { mapRequestStatusData } from "./user-request-status-chart.utils";

type Props = {
  data: IUserStats;
};

export function UserRequestStatusChart({ data }: Props) {
  const chartData = mapRequestStatusData(data);

  return (
    <PieChartCard
      title="Request Status"
      description="Current distribution"
      data={chartData}
      config={userRequestStatusChartConfig}
      dataKey="value"
      nameKey="name"
    />
  );
}
