"use client";

import { getResponses } from "@/actions/response.actions";
import { ErrorMessage } from "@/components/shared/error-message";
import { DataTable } from "@/components/shared/table/data-table";
import { TypographyP } from "@/components/shared/typography";
import { QUERY_KEY } from "@/constants/query.const";
import useDataTable from "@/hooks/use-data-table";
import { useFetch } from "@/hooks/use-fetch";
import { allResponsesTableColumns } from "./all-responses-table-columns";
import { AllResponsesTableToolbar } from "./all-responses-table-toolbar";

type AllResponsesTableProps = {
  queryString: string;
};

export default function AllResponsesTable({
  queryString,
}: AllResponsesTableProps) {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.RESPONSE.ALL_RESPONSE, queryString],
    queryFn: () => getResponses(queryString),
  });

  const responses = data?.data ?? [];

  const table = useDataTable({
    data: responses,
    columns: allResponsesTableColumns,
  });

  if (isLoading) {
    return <TypographyP className="text-center">Loading...</TypographyP>;
  }

  if (isError || !data?.success) {
    return <ErrorMessage message={data?.message ?? error?.message} />;
  }

  return (
    <div className="space-y-4">
      <AllResponsesTableToolbar table={table} />
      <DataTable data={data} table={table} columns={allResponsesTableColumns} />
    </div>
  );
}
