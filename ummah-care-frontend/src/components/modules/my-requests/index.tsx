import { getMyRequests } from "@/actions/request.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import MyRequestTable from "./my-requests-table";

export default async function MyRequests({
  queryString,
}: {
  queryString: string;
}) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.REQUEST.MY_REQUEST, queryString],
    () => getMyRequests(queryString),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>Welcome back 👋</TypographyH3>
        <TypographyMuted className="text-base">
          Manage and track all your requests in one place.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <MyRequestTable queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
