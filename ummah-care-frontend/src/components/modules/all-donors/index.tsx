import { getAllDonors } from "@/actions/user.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import AllDonorsTable from "./all-donors-table";

type AllDonorsProps = {
  queryString: string;
};

export default async function AllDonors({ queryString }: AllDonorsProps) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.USER.ALL_DONORS, queryString],
    () => getAllDonors(queryString),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>All Donors</TypographyH3>
        <TypographyMuted className="text-base">
          Browse and manage all donors with filters, status, and activity
          counts.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <AllDonorsTable queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
