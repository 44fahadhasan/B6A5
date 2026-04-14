"use client";

import { DataTableColumnHeader } from "@/components/shared/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { IUserStats } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

type RecentReceivedDonation = IUserStats["recentReceivedDonations"][number];

type TStatusColor = "default" | "secondary" | "destructive";

const STATUS_COLORS: Record<string, TStatusColor> = {
  COMPLETED: "default",
  PENDING: "secondary",
  CANCELLED: "destructive",
  FAILED: "destructive",
};

export const userReceivedDonationsColumns: ColumnDef<RecentReceivedDonation>[] =
  [
    {
      accessorKey: "request.title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Request" />
      ),
      cell: ({ row }) => (
        <span className="max-w-xs truncate font-medium">
          {row.original.request.title}
        </span>
      ),
    },
    {
      accessorKey: "donor",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Donor" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.donor.name}</span>
          <span className="text-sm text-muted-foreground">
            {row.original.donor.email}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">
          ${Number(row.original.amount).toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <Badge
          variant={STATUS_COLORS[row.original.status]}
          className="capitalize"
        >
          {row.original.status.toLowerCase()}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => (
        <span className="text-sm">
          {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
        </span>
      ),
    },
  ];
