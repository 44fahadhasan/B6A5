"use client";

import { deleteCampaign } from "@/actions/campaign.action";
import { DataTableRowDeleteAction } from "@/components/shared/table/data-table-row-delete-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CAMPAIGN_STATUS } from "@/constants/campaign.const";
import { QUERY_KEY } from "@/constants/query.const";
import { ICampaignResponse } from "@/types/campaign.type";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { DataTableColumnHeader } from "../../shared/table/data-table-column-header";
import { DataTableModal } from "../../shared/table/data-table-modal";
import { DataTableRowActions } from "../../shared/table/data-table-row-actions";
import CampaignDetails from "./my-campaign-details";
import CampaignForm from "./my-campaign-form";
import { statuses } from "./my-campaign-table-data";

export const myCampaignTableColumns: ColumnDef<ICampaignResponse>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.original.status,
      );

      return (
        <div className="flex gap-2">
          {status && <Badge variant="outline">{status.label}</Badge>}
          <span className="max-w-125 truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "goalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Goal Amount" />
    ),
    cell: ({ row }) => {
      const goalAmountRaw = row.getValue("goalAmount");
      const currency = row.original.currency;
      const currentAmount = row.original.currentAmount;

      const goalAmount = Number(goalAmountRaw);
      const safeGoal = Number.isFinite(goalAmount) ? goalAmount : 0;
      const safeCurrent = Number.isFinite(currentAmount) ? currentAmount : 0;

      const hasGoal = safeGoal > 0;

      const progressPercentage = hasGoal
        ? Math.min((safeCurrent / safeGoal) * 100, 100)
        : 0;

      const isCompleted = hasGoal && safeCurrent >= safeGoal;

      return (
        <div className="space-y-1">
          <div className="text-sm font-medium flex items-center gap-2">
            {safeCurrent.toLocaleString()} / {safeGoal.toLocaleString()}{" "}
            {currency}
            {!hasGoal && (
              <span className="text-xs text-muted-foreground">
                (No goal set)
              </span>
            )}
            {isCompleted && (
              <span className="text-xs text-green-600">Completed</span>
            )}
          </div>

          {hasGoal && <Progress value={progressPercentage} className="w-20" />}
        </div>
      );
    },
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
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue("createdAt")), "dd MMM yyyy")}</span>
    ),
  },
  {
    id: "donations",
    accessorKey: "currentAmount",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Donations" />
    ),
    cell: ({ row }) => (
      <Button asChild variant="link" className="pl-0">
        <Link href={`/dashboard/campaigns/${row.original.id}/donations`}>
          View Donations
        </Link>
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        actions={[
          (rowData) => {
            const status = row.getValue("status");

            if (
              status !== CAMPAIGN_STATUS.CANCELLED &&
              status !== CAMPAIGN_STATUS.COMPLETED
            ) {
              return (
                <DataTableModal
                  mode="edit"
                  title={`Edit: ${rowData.title}`}
                  description="Update the campaign details below."
                >
                  <CampaignForm data={rowData} />
                </DataTableModal>
              );
            }

            return null;
          },

          (rowData) => (
            <DataTableModal
              mode="view"
              title={`View : ${row.getValue("title")}`}
              description="Here are the full details of this campaign."
            >
              <CampaignDetails data={rowData} />
            </DataTableModal>
          ),

          (rowData) => (
            <DataTableRowDeleteAction
              label={row.getValue("title")}
              id={rowData.id}
              queryKey={QUERY_KEY.CAMPAIGN.MY_CAMPAIGN}
              deleteFun={deleteCampaign}
            />
          ),
        ]}
      />
    ),
  },
];
