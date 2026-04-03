"use client";

import { getMyRequests } from "@/actions/request.action";
import { requestTableColumns } from "@/components/modules/my-requests/my-request-table-columns";
import { ErrorMessage } from "@/components/shared/error-message";
import { DataTable } from "@/components/shared/table/data-table";
import { TypographyMuted, TypographyP } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import useDataTable from "@/hooks/use-data-table";
import { useFetch } from "@/hooks/use-fetch";
import { MyRequestsTableToolbar } from "./my-requests-table-toolbar";

type MyRequestsTableProps = {
  queryString: string;
};

export default function MyRequestsTable({ queryString }: MyRequestsTableProps) {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.REQUEST.MY_REQUEST, queryString],
    queryFn: () => getMyRequests(queryString),
  });

  const requests = data?.data ?? [];

  const table = useDataTable({
    data: requests,
    columns: requestTableColumns,
  });

  if (isLoading) {
    return <TypographyP className="text-center">Loading...</TypographyP>;
  }

  if (isError || !data?.success) {
    return <ErrorMessage message={data?.message ?? error?.message} />;
  }

  if (requests.length === 0) {
    return (
      <TypographyMuted className="text-center">
        You have no requests yet.
      </TypographyMuted>
    );
  }

  return (
    <div className="space-y-4">
      <MyRequestsTableToolbar table={table} />
      <DataTable table={table} columns={requestTableColumns} />
    </div>
  );
}
