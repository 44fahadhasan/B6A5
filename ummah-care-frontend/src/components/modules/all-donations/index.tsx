import { getAllDonations } from "@/actions/donate.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import AllDonationsTable from "./all-donations-table";

export default async function AllDonations({
  queryString,
}: {
  queryString: string;
}) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.DONATION.DONATIONS, queryString],
    () => getAllDonations(queryString),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>All Donations</TypographyH3>
        <TypographyMuted className="text-base">
          Review all donations across the platform with fast filtering and
          detail views.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <AllDonationsTable queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
