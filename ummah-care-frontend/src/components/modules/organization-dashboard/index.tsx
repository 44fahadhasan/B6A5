import { getDashboardStats } from "@/actions/stats.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import OrganizationDashboardContent from "./organization-dashboard-content";

export default async function OrganizationDashboard() {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.DASHBOARD_STATS],
    () => getDashboardStats(),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>Organization Dashboard</TypographyH3>
        <TypographyMuted className="text-base">
          Monitor your organization campaigns, donations, and assignments.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <OrganizationDashboardContent />
      </HydrationBoundary>
    </div>
  );
}
