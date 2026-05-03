"use client";

import { deleteCampaign } from "@/actions/campaign.action";
import { DataTableRowDeleteAction } from "@/components/shared/table/data-table-row-delete-action";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CAMPAIGN_STATUS } from "@/constants/campaign.const";
import { QUERY_KEY } from "@/constants/query.const";
import { ICampaignResponse } from "@/types/campaign.type";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "../../shared/table/data-table-column-header";
import { DataTableModal } from "../../shared/table/data-table-modal";
import { DataTableRowActions } from "../../shared/table/data-table-row-actions";
import CampaignDetails from "./campaign-details";
import CampaignForm from "./campaign-form";
import { statuses } from "./campaign-table-data";

export const campaignTableColumns: ColumnDef<ICampaignResponse>[] = [
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
      const goalAmount = row.getValue("goalAmount") as number;
      const currency = row.original.currency;
      const currentAmount = row.original.currentAmount;

      const hasGoal = goalAmount > 0;

      const remainingAmount = Math.max(currentAmount, 0);

      const raisedAmount = Math.max(goalAmount - remainingAmount, 0);

      const progressPercentage =
        goalAmount > 0 ? Math.min((raisedAmount / goalAmount) * 100, 100) : 0;

      const isCompleted = hasGoal && raisedAmount >= goalAmount;

      return (
        <div className="space-y-1">
          <div className="text-sm font-medium flex items-center gap-2">
            {currentAmount} / {goalAmount} {currency}
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
              queryKey={QUERY_KEY.CAMPAIGN.CAMPAIGNS}
              deleteFun={deleteCampaign}
            />
          ),
        ]}
      />
    ),
  },
];
