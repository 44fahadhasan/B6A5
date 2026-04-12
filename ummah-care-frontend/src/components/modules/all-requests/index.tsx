import { getAllRequests } from "@/actions/request.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import AllRequestsTable from "./all-requests-table";

export default async function AllRequests({
  queryString,
}: {
  queryString: string;
}) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.REQUEST.ALL_REQUEST, queryString],
    () => getAllRequests(queryString),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>All Help Requests</TypographyH3>
        <TypographyMuted className="text-base">
          View and manage all requests from users across the platform.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <AllRequestsTable queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
