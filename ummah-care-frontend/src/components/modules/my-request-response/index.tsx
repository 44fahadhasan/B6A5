import { getResponses } from "@/actions/response.actions";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { MyRequestResponseFilters } from "./my-request-response-filters";
import { MyRequestResponseHeader } from "./my-request-response-header";
import { MyRequestResponseList } from "./my-request-response-list";

type MyRequestResponsesProps = {
  queryString: string;
};

export default async function MyRequestResponses({
  queryString,
}: MyRequestResponsesProps) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.RESPONSE.MY_REQUEST_RESPONSES, queryString],
    () => getResponses(queryString),
  );

  return (
    <div className="space-y-8">
      <MyRequestResponseHeader />
      <MyRequestResponseFilters />
      <HydrationBoundary state={dehydratedState}>
        <MyRequestResponseList queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
