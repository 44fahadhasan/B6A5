import { getResponses } from "@/actions/response.actions";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import AllResponsesTable from "./all-responses-table";

export default async function AllResponses({
  queryString,
}: {
  queryString: string;
}) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.RESPONSE.ALL_RESPONSE, queryString],
    () => getResponses(queryString),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>All Responses</TypographyH3>
        <TypographyMuted className="text-base">
          View and manage all responses from users across the platform.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <AllResponsesTable queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
