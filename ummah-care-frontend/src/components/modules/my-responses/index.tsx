import { getMyResponses } from "@/actions/response.actions";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { MyResponsesFilters } from "./my-responses-filters";
import { MyResponsesHeader } from "./my-responses-header";
import { MyResponsesList } from "./my-responses-list";

type MyResponsesProps = {
  queryString: string;
};

export default async function MyResponses({ queryString }: MyResponsesProps) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.RESPONSE.MY_RESPONSES, queryString],
    () => getMyResponses(queryString),
  );

  return (
    <div className="space-y-8">
      <MyResponsesHeader />
      <MyResponsesFilters />
      <HydrationBoundary state={dehydratedState}>
        <MyResponsesList queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
