"use client";

import { statuses } from "@/components/modules/assignments/assignments-table-data";
import { DataTableFacetedFilter } from "@/components/shared/table/data-table-faceted-filter";
import { DataTableModal } from "@/components/shared/table/data-table-modal";
import { DataTableViewOptions } from "@/components/shared/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useTableToolbar from "@/hooks/use-table-toolbar";
import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import AssignmentForm from "./assignment-form";

interface AssignmentsTableToolbarProps<TData> {
  table: Table<TData>;
}

export function AssignmentsTableToolbar<TData>({
  table,
}: AssignmentsTableToolbarProps<TData>) {
  const {
    search,
    setSearch,
    filterValues,
    setFilterValues,
    isFiltered,
    resetFilters,
  } = useTableToolbar({
    filterKeys: ["status", "targetType"],
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Search assignments..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-8 w-37.5 lg:w-62.5"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
            selectedValues={filterValues.status}
            onSelectionChange={(values) => setFilterValues("status", values)}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <DataTableModal
          mode="create"
          title="Create Assignment"
          description="Create a new assignment for a request."
        >
          <AssignmentForm />
        </DataTableModal>
      </div>
    </div>
  );
}
