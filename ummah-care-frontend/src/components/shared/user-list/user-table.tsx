"use client";

import { ErrorMessage } from "@/components/shared/error-message";
import { DataTable } from "@/components/shared/table/data-table";
import { TypographyP } from "@/components/shared/typography";
import useDataTable from "@/hooks/use-data-table";
import { useFetch } from "@/hooks/use-fetch";
import { IAllUsersResponse, IApiErrorResponse, IApiResponse } from "@/types";
import { createUserTableColumns } from "./user-table-columns";
import {
  UserTableToolbar,
  type UserTableToolbarConfig,
} from "./user-table-toolbar";

interface UserTableConfig {
  queryKey: string;
  queryFn: (
    queryString: string,
  ) => Promise<IApiResponse<IAllUsersResponse[]> | IApiErrorResponse>;
  toolbarConfig?: UserTableToolbarConfig;
  tableConfig?: {
    showRequests?: boolean;
    showDonations?: boolean;
    showResponses?: boolean;
    showAssignments?: boolean;
  };
}

interface UserTableProps {
  queryString: string;
  config: UserTableConfig;
}

export default function UserTable({ queryString, config }: UserTableProps) {
  const { queryKey, queryFn, toolbarConfig, tableConfig } = config;

  const { data, isLoading, isError, error } = useFetch({
    queryKey: [queryKey, queryString],
    queryFn: () => queryFn(queryString),
  });

  const users = data?.data ?? [];

  const columns = createUserTableColumns(tableConfig);

  const table = useDataTable({
    data: users,
    columns,
  });

  if (isLoading) {
    return <TypographyP className="text-center">Loading...</TypographyP>;
  }

  if (isError || !data?.success) {
    return <ErrorMessage message={data?.message ?? error?.message} />;
  }

  return (
    <div className="space-y-4">
      <UserTableToolbar table={table} config={toolbarConfig} />
      <DataTable data={data} table={table} columns={columns} />
    </div>
  );
}
