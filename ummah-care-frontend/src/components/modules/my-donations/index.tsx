import { getMyDonations } from "@/actions/donate.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import MyDonationsTable from "./my-donations-table";

export default async function MyDonations({
  queryString,
}: {
  queryString: string;
}) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.DONATION.MY_DONATIONS, queryString],
    () => getMyDonations(queryString),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>My Donations 💰</TypographyH3>
        <TypographyMuted className="text-base">
          Track all your donations and their status.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <MyDonationsTable queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
