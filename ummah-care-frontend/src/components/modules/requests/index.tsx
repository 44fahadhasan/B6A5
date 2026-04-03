import { getRequests } from "@/actions/request.action";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { RequestsFilters } from "./requests-filters";
import { RequestsHeader } from "./requests-header";
import { RequestsList } from "./requests-list";

export default async function Requests({
  queryString,
}: {
  queryString: string;
}) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.REQUEST.REQUEST, queryString],
    () => getRequests(queryString),
  );

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 py-8 space-y-7">
      <RequestsHeader />
      <RequestsFilters />
      <HydrationBoundary state={dehydratedState}>
        <RequestsList queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
