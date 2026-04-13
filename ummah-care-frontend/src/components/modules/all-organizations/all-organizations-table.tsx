"use client";

import { getAllOrganizations } from "@/actions/user.action";
import { statuses } from "@/components/modules/all-users/all-users-table-data";
import UserTable from "@/components/shared/user-list/user-table";
import { QUERY_KEY } from "@/constants/query.const";

type AllOrganizationsTableProps = {
  queryString: string;
};

export default function AllOrganizationsTable({
  queryString,
}: AllOrganizationsTableProps) {
  return (
    <UserTable
      queryString={queryString}
      config={{
        queryKey: QUERY_KEY.USER.ALL_ORGANIZATIONS,
        queryFn: getAllOrganizations,
        toolbarConfig: {
          placeholder: "Filter organizations...",
          statuses,
        },
        tableConfig: {
          showRequests: true,
          showDonations: true,
          showResponses: false,
          showAssignments: false,
        },
      }}
    />
  );
}
