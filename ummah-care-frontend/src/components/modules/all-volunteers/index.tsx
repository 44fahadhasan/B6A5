import { getAllVolunteers } from "@/actions/user.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import AllVolunteersTable from "./all-volunteers-table";

type AllVolunteersProps = {
  queryString: string;
};

export default async function AllVolunteers({
  queryString,
}: AllVolunteersProps) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.USER.ALL_VOLUNTEERS, queryString],
    () => getAllVolunteers(queryString),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>All Volunteers</TypographyH3>
        <TypographyMuted className="text-base">
          Browse and manage all volunteers with filters, status, and activity
          counts.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <AllVolunteersTable queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
