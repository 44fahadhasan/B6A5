import { getDashboardStats } from "@/actions/stats.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import UserDashboardContent from "./user-dashboard-content";

export default async function UserDashboard() {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.DASHBOARD_STATS],
    () => getDashboardStats(),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>User Dashboard</TypographyH3>
        <TypographyMuted className="text-base">
          Welcome! Choose your role to get started and make an impact.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <UserDashboardContent />
      </HydrationBoundary>
    </div>
  );
}
