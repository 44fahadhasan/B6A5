import { getOrganizationResponses } from "@/actions/response.actions";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { OrganizationResponsesFilters } from "./organization-responses-filters";
import { OrganizationResponsesHeader } from "./organization-responses-header";
import { OrganizationResponsesList } from "./organization-responses-list";

type OrganizationResponsesProps = {
  queryString: string;
};

export default async function OrganizationResponses({
  queryString,
}: OrganizationResponsesProps) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.RESPONSE.ORGANIZATION_RESPONSES, queryString],
    () => getOrganizationResponses(queryString),
  );

  return (
    <div className="space-y-8">
      <OrganizationResponsesHeader />
      <OrganizationResponsesFilters />
      <HydrationBoundary state={dehydratedState}>
        <OrganizationResponsesList queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
