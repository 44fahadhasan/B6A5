"use client";

import { DataTableColumnHeader } from "@/components/shared/table/data-table-column-header";
import { DataTableModal } from "@/components/shared/table/data-table-modal";
import { DataTableRowActions } from "@/components/shared/table/data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { IDonationResponse } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import AllDonationDetails from "./all-donation-details";
import { statuses } from "./all-donations-table-data";

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
    accessorKey: "request.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request" />
    ),
    cell: ({ row }) => (
      <span className="max-w-125 truncate font-medium">
        {row.original.request.title}
      </span>
    ),
  },
  {
    accessorKey: "donor.name",
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
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: row.original.currency,
        }).format(Number(row.original.amount))}
      </span>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),
    cell: ({ row }) => (
      <span className="capitalize">{row.original.paymentMethod}</span>
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
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "campaign.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Campaign" />
    ),
    cell: ({ row }) => (
      <span className="max-w-125 truncate">
        {row.original.campaign?.title ?? "None"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => (
      <span className="text-sm">
        {format(new Date(row.getValue("createdAt")), "dd MMM yyyy")}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        actions={[
          (rowData) => (
            <DataTableModal
              mode="view"
              title="Donation details"
              description="View full donation information."
            >
              <AllDonationDetails data={rowData} />
            </DataTableModal>
          ),
        ]}
      />
    ),
  },
];
