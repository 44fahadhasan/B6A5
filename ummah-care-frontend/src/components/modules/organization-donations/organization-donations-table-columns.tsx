"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { IDonationResponse } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "../../shared/table/data-table-column-header";
import { statuses } from "./organization-donations-table-data";

export const organizationDonationsTableColumns: ColumnDef<IDonationResponse>[] =
  [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
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
      accessorKey: "campaign",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Campaign" />
      ),
      cell: ({ row }) => (
        <span className="max-w-125 truncate font-medium">
          {row.original.campaign?.title || "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.currency} {Number(row.original.amount).toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = statuses.find((s) => s.value === row.original.status);
        if (!status) return null;

        const Icon = status.icon;
        return (
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <span className="capitalize">{status.label}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
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
