"use client";

import { getMyCampaigns } from "@/actions/campaign.action";
import { myCampaignTableColumns } from "@/components/modules/my-campaign/my-campaign-table-columns";
import { ErrorMessage } from "@/components/shared/error-message";
import { DataTable } from "@/components/shared/table/data-table";
import { TypographyP } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import useDataTable from "@/hooks/use-data-table";
import { useFetch } from "@/hooks/use-fetch";
import { MyCampaignTableToolbar } from "./my-campaign-table-toolbar";

type CampaignTableProps = {
  queryString: string;
};

export default function MyCampaignTable({ queryString }: CampaignTableProps) {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.CAMPAIGN.MY_CAMPAIGN, queryString],
    queryFn: () => getMyCampaigns(queryString),
  });

  const campaigns = data?.data ?? [];

  const table = useDataTable({
    data: campaigns,
    columns: myCampaignTableColumns,
  });

  if (isLoading) {
    return <TypographyP className="text-center">Loading...</TypographyP>;
  }

  if (isError || !data?.success) {
    return <ErrorMessage message={data?.message ?? error?.message} />;
  }

  return (
    <div className="space-y-4">
      <MyCampaignTableToolbar table={table} />
      <DataTable data={data} table={table} columns={myCampaignTableColumns} />
    </div>
  );
}
