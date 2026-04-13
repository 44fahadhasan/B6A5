import { getAllOrganizations } from "@/actions/user.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import AllOrganizationsTable from "./all-organizations-table";

type AllOrganizationsProps = {
  queryString: string;
};

export default async function AllOrganizations({
  queryString,
}: AllOrganizationsProps) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.USER.ALL_ORGANIZATIONS, queryString],
    () => getAllOrganizations(queryString),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>All Organizations</TypographyH3>
        <TypographyMuted className="text-base">
          Browse and manage all organizations with filters, status, and activity
          counts.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <AllOrganizationsTable queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
