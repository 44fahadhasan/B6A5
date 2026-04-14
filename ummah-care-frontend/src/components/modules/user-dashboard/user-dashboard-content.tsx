"use client";

import { getDashboardStats } from "@/actions/stats.action";
import { ErrorMessage } from "@/components/shared/error-message";
import { TypographyP } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { useFetch } from "@/hooks/use-fetch";
import { Onboarding } from "../onboarding";
import UserDashboardQuickCard from "./user-dashboard-quick-card";
import { UserRecentReceivedDonations } from "./user-recent-received-donations";
import { UserRequestStatusChart } from "./user-request-status-chart";
import { UserStatsCards } from "./user-stats-cards";

export default function UserDashboardContent() {
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

  const userStats = data.data?.userStats;
  if (!userStats) return null;

  return (
    <div className="space-y-6 @container/main">
      <Onboarding />
      <UserStatsCards stats={userStats} />
      <UserRequestStatusChart data={userStats} />
      <UserRecentReceivedDonations
        donations={userStats.recentReceivedDonations}
      />
      <UserDashboardQuickCard />
    </div>
  );
}
