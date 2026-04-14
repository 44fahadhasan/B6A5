"use client";

import { getDashboardStats } from "@/actions/stats.action";
import { ErrorMessage } from "@/components/shared/error-message";
import { TypographyP } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { useFetch } from "@/hooks/use-fetch";
import { DonorDonationStatusChart } from "./donor-donation-status-chart";
import { DonorStatsCards } from "./donor-stats-cards";

export default function DonorDashboardContent() {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.DASHBOARD_STATS],
    queryFn: getDashboardStats,
  });

  if (isLoading) {
    return (
      <TypographyP className="text-center">Loading dashboard...</TypographyP>
    );
  }

  if (isError || !data?.success) {
    return <ErrorMessage message={error?.message || data?.message} />;
  }

  const stats = data?.data?.donorStats;
  if (!stats) return null;

  return (
    <div className="space-y-6 @container/main">
      <DonorStatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DonorDonationStatusChart data={stats} />
      </div>
    </div>
  );
}
