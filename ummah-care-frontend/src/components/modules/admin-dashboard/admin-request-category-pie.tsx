import { PieChartCard } from "@/components/shared/chart/pie-chart-card";
import { IAdminStats } from "@/types";
import { requestCategoryChartConfig } from "./admin-request-category-pie.config";
import { mapRequestCategoryData } from "./admin-request-category.utils";

type Props = {
  data: IAdminStats;
};

export function AdminRequestCategoryPie({ data }: Props) {
  const chartData = mapRequestCategoryData(data);

  return (
    <PieChartCard
      title="Request Categories"
      description="Distribution"
      data={chartData}
      config={requestCategoryChartConfig}
      dataKey="value"
      nameKey="name"
    />
  );
}
