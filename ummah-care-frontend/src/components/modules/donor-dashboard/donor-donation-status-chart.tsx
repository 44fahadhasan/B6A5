import { PieChartCard } from "@/components/shared/chart/pie-chart-card";
import { IDonorStats } from "@/types";
import { donorDonationStatusChartConfig } from "./donor-donation-status-chart.config";
import { mapDonationStatusData } from "./donor-donation-status-chart.utils";

type Props = {
  data: IDonorStats;
};

export function DonorDonationStatusChart({ data }: Props) {
  const chartData = mapDonationStatusData(data);

  return (
    <PieChartCard
      title="Donation Status"
      description="Current distribution"
      data={chartData}
      config={donorDonationStatusChartConfig}
      dataKey="value"
      nameKey="name"
    />
  );
}
