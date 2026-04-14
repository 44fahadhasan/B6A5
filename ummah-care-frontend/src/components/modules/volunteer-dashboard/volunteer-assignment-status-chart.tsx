import { PieChartCard } from "@/components/shared/chart/pie-chart-card";
import { IVolunteerStats } from "@/types";
import { volunteerAssignmentStatusChartConfig } from "./volunteer-assignment-status-chart.config";
import { mapAssignmentStatusData } from "./volunteer-assignment-status-chart.utils";

type Props = {
  data: IVolunteerStats;
};

export function VolunteerAssignmentStatusChart({ data }: Props) {
  const chartData = mapAssignmentStatusData(data);

  return (
    <PieChartCard
      title="Assignment Status"
      description="Current distribution"
      data={chartData}
      config={volunteerAssignmentStatusChartConfig}
      dataKey="value"
      nameKey="name"
    />
  );
}
