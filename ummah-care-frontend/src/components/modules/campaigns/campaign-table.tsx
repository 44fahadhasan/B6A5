"use client";

import { getMyCampaigns } from "@/actions/campaign.action";
import { ErrorMessage } from "@/components/shared/error-message";
import { DataTable } from "@/components/shared/table/data-table";
import { TypographyP } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import useDataTable from "@/hooks/use-data-table";
import { useFetch } from "@/hooks/use-fetch";
import { campaignTableColumns } from "./campaign-table-columns";
import { CampaignTableToolbar } from "./campaign-table-toolbar";

type CampaignTableProps = {
  queryString: string;
};

export default function CampaignTable({ queryString }: CampaignTableProps) {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.CAMPAIGN.CAMPAIGNS, queryString],
    queryFn: () => getMyCampaigns(queryString),
  });

  const campaigns = data?.data ?? [];

  const table = useDataTable({
    data: campaigns,
    columns: campaignTableColumns,
  });

  if (isLoading) {
    return <TypographyP className="text-center">Loading...</TypographyP>;
  }

  if (isError || !data?.success) {
    return <ErrorMessage message={data?.message ?? error?.message} />;
  }

  return (
    <div className="space-y-4">
      <CampaignTableToolbar table={table} />
      <DataTable data={data} table={table} columns={campaignTableColumns} />
    </div>
  );
}
