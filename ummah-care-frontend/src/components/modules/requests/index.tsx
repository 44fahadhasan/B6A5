import { getRequests } from "@/actions/request.action";
import { QUERY_KEY } from "@/constants/query.const";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { RequestsFilters } from "./requests-filters";
import { RequestsHeader } from "./requests-header";
import { RequestsList } from "./requests-list";

export default async function Requests({
  queryString,
}: {
  queryString: string;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.REQUEST.REQUEST, queryString],
    queryFn: () => getRequests(queryString),
  });

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 py-8 space-y-7">
      <RequestsHeader />
      <RequestsFilters />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RequestsList queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
