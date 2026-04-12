import { getReceivedDonations } from "@/actions/donate.action";
import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import { HydrationBoundary } from "@tanstack/react-query";
import ReceivedDonationsTable from "./received-donations-table";

export default async function ReceivedDonations({
  queryString,
}: {
  queryString: string;
}) {
  const { dehydratedState } = await prefetchQuery(
    [QUERY_KEY.DONATION.RECEIVED_DONATIONS, queryString],
    () => getReceivedDonations(queryString),
  );

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <TypographyH3>Donations Received 💝</TypographyH3>
        <TypographyMuted className="text-base">
          View all donations received for your requests.
        </TypographyMuted>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <ReceivedDonationsTable queryString={queryString} />
      </HydrationBoundary>
    </div>
  );
}
