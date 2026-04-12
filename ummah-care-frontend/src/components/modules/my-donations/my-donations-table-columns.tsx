"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { IDonationResponse } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "../../shared/table/data-table-column-header";
import { statuses } from "./my-donations-table-data";

export const donationTableColumns: ColumnDef<IDonationResponse>[] = [
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
    accessorKey: "request title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request Title" />
    ),
    cell: ({ row }) => (
      <span className="max-w-125 truncate font-medium">
        {row.original.request.title}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <span className="font-medium">
          {row.getValue("amount")} {row.original.currency}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );
      if (!status) return null;

      return (
        <div className="flex w-25 items-center gap-2">
          {status.icon && (
            <status.icon className="size-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
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
        {format(new Date(row.getValue("createdAt")), "dd MMM yyyy, hh:mm a")}
      </span>
    ),
  },
];
