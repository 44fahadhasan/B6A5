"use client";

import { getMyOrganizationDonations } from "@/actions/donate.action";
import { ErrorMessage } from "@/components/shared/error-message";
import { DataTable } from "@/components/shared/table/data-table";
import { TypographyP } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import useDataTable from "@/hooks/use-data-table";
import { useFetch } from "@/hooks/use-fetch";
import { organizationDonationsTableColumns } from "./organization-donations-table-columns";
import { OrganizationDonationsTableToolbar } from "./organization-donations-table-toolbar";

type OrganizationDonationsTableProps = {
  queryString: string;
};

export default function OrganizationDonationsTable({
  queryString,
}: OrganizationDonationsTableProps) {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.DONATION.ORGANIZATION_DONATIONS, queryString],
    queryFn: () => getMyOrganizationDonations(queryString),
  });

  const donations = data?.data ?? [];

  const table = useDataTable({
    data: donations,
    columns: organizationDonationsTableColumns,
  });

  if (isLoading) {
    return <TypographyP className="text-center">Loading...</TypographyP>;
  }

  if (isError || !data?.success) {
    return <ErrorMessage message={data?.message ?? error?.message} />;
  }

  return (
    <div className="space-y-4">
      <OrganizationDonationsTableToolbar table={table} />
      <DataTable
        data={data}
        table={table}
        columns={organizationDonationsTableColumns}
      />
    </div>
  );
}
