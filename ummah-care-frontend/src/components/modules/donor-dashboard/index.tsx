import { getDashboardStats } from "@/actions/stats.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import DonorDashboardContent from "./donor-dashboard-content";

export default async function DonorDashboard() {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.DASHBOARD_STATS],
    () => getDashboardStats(),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>Donor Dashboard</TypographyH3>
        <TypographyMuted className="text-base">
          Track your donations and impact on the community.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <DonorDashboardContent />
      </HydrationBoundary>
    </div>
  );
}
