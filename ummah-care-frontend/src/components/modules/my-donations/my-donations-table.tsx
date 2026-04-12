"use client";

import { getMyDonations } from "@/actions/donate.action";
import { donationTableColumns } from "@/components/modules/my-donations/my-donations-table-columns";
import { ErrorMessage } from "@/components/shared/error-message";
import { DataTable } from "@/components/shared/table/data-table";
import { TypographyP } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import useDataTable from "@/hooks/use-data-table";
import { useFetch } from "@/hooks/use-fetch";
import { MyDonationsTableToolbar } from "./my-donations-table-toolbar";

type MyDonationsTableProps = {
  queryString: string;
};

export default function MyDonationsTable({
  queryString,
}: MyDonationsTableProps) {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.DONATION.MY_DONATIONS, queryString],
    queryFn: () => getMyDonations(queryString),
  });

  const donations = data?.data ?? [];

  const table = useDataTable({
    data: donations,
    columns: donationTableColumns,
  });

  if (isLoading) {
    return <TypographyP className="text-center">Loading...</TypographyP>;
  }

  if (isError || !data?.success) {
    return <ErrorMessage message={data?.message ?? error?.message} />;
  }

  return (
    <div className="space-y-4">
      <MyDonationsTableToolbar table={table} />
      <DataTable data={data} table={table} columns={donationTableColumns} />
    </div>
  );
}
