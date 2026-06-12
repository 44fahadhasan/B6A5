"use client";

import { DataTableFacetedFilter } from "@/components/shared/table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/shared/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useTableToolbar from "@/hooks/use-table-toolbar";
import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { statuses } from "./all-donations-table-data";

interface AllDonationsTableToolbarProps<TData> {
  table: Table<TData>;
}

export function AllDonationsTableToolbar<TData>({
  table,
}: AllDonationsTableToolbarProps<TData>) {
  const {
    search,
    setSearch,
    filterValues,
    setFilterValues,
    isFiltered,
    resetFilters,
  } = useTableToolbar({
    filterKeys: ["status"],
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Filter donations..."
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
      </div>
    </div>
  );
}
