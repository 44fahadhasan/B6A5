import { getSession } from "@/actions/auth-actions";
import { Onboarding } from "@/components/modules/onboarding";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function UserDashboardPage() {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.SESSION],
    getSession,
  );

  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <Onboarding />
      </HydrationBoundary>
    </div>
  );
}
