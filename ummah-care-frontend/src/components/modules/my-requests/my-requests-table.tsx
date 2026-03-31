"use client";

import { getMyRequests } from "@/actions/request.action";
import { requestTableColumns } from "@/components/modules/my-requests/my-request-table-columns";
import { DataTable } from "@/components/shared/table/data-table";
import { QUERY_KEY } from "@/constants/query.const";
import useDataTable from "@/hooks/use-data-table";
import { useQuery } from "@tanstack/react-query";
import { MyRequestsTableToolbar } from "./my-requests-table-toolbar";

type MyRequestsTableProps = {
  queryString: string;
};

export default function MyRequestsTable({ queryString }: MyRequestsTableProps) {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.REQUEST.MY_REQUEST, queryString],
    queryFn: () => getMyRequests(queryString),
  });

  const requests = data?.data ?? [];

  const table = useDataTable({
    columns: requestTableColumns,
    data: requests,
  });

  return (
    <div className="space-y-4">
      <MyRequestsTableToolbar table={table} />
      <DataTable table={table} columns={requestTableColumns} />
    </div>
  );
}
