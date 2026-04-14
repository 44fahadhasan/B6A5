/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/shared/table/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useDataTable from "@/hooks/use-data-table";
import { IUserStats } from "@/types";
import { userReceivedDonationsColumns } from "./user-recent-received-donations-columns";

type Props = {
  donations: IUserStats["recentReceivedDonations"];
};

export function UserRecentReceivedDonations({ donations }: Props) {
  const table = useDataTable({
    data: donations,
    columns: userReceivedDonationsColumns,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Received Donations</CardTitle>
        <CardDescription>Donations received for your requests</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          table={table}
          data={donations as any}
          columns={userReceivedDonationsColumns}
        />
      </CardContent>
    </Card>
  );
}
