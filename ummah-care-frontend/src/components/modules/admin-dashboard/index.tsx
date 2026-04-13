import { getDashboardStats } from "@/actions/stats.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import AdminDashboardContent from "./admin-dashboard-content";

export default async function AdminDashboard() {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.DASHBOARD_STATS],
    () => getDashboardStats(),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>Dashboard Overview</TypographyH3>
        <TypographyMuted className="text-base">
          Monitor platform activity and key statistics.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <AdminDashboardContent />
      </HydrationBoundary>
    </div>
  );
}
