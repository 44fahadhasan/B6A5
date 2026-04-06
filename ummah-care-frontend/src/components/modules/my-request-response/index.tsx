import { getResponsesByRequest } from "@/actions/request.action";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { MyRequestResponseFilters } from "./my-request-response-filters";
import { MyRequestResponseHeader } from "./my-request-response-header";
import { MyRequestResponseList } from "./my-request-response-list";

type MyRequestResponsesProps = {
  queryString: string;
  requestId: string;
};

export default async function MyRequestResponses({
  requestId,
  queryString,
}: MyRequestResponsesProps) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.REQUEST.MY_REQUEST_RESPONSES, requestId],
    () => getResponsesByRequest(requestId, queryString),
  );

  return (
    <div className="space-y-8">
      <MyRequestResponseHeader />
      <MyRequestResponseFilters />
      <HydrationBoundary state={dehydratedState}>
        <MyRequestResponseList
          requestId={requestId}
          queryString={queryString}
        />
      </HydrationBoundary>
    </div>
  );
}
