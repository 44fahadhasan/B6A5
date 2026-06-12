"use client";

import { DataTableFacetedFilter } from "@/components/shared/table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/shared/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useTableToolbar from "@/hooks/use-table-toolbar";
import { type Table } from "@tanstack/react-table";
import { type LucideIcon, X } from "lucide-react";

export interface UserTableToolbarConfig {
  showStatusFilter?: boolean;
  showUserTypeFilter?: boolean;
  placeholder?: string;
  statuses?: Array<{ label: string; value: string; icon?: LucideIcon }>;
  userTypes?: Array<{ label: string; value: string; icon?: LucideIcon }>;
}

interface UserTableToolbarProps<TData> {
  table: Table<TData>;
  config?: UserTableToolbarConfig;
}

export function UserTableToolbar<TData>({
  table,
  config = {},
}: UserTableToolbarProps<TData>) {
  const {
    showStatusFilter = true,
    showUserTypeFilter = false,
    placeholder = "Filter users...",
    statuses = [],
    userTypes = [],
  } = config;

  const filterKeys = ["status"];
  if (showUserTypeFilter) {
    filterKeys.push("userType");
  }

  const {
    search,
    setSearch,
    filterValues,
    setFilterValues,
    isFiltered,
    resetFilters,
  } = useTableToolbar({
    filterKeys,
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder={placeholder}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-8 w-37.5 lg:w-62.5"
        />
        {showStatusFilter &&
          table.getColumn("status") &&
          statuses.length > 0 && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
              selectedValues={filterValues.status}
              onSelectionChange={(values) => setFilterValues("status", values)}
            />
          )}
        {showUserTypeFilter &&
          table.getColumn("userTypes") &&
          userTypes.length > 0 && (
            <DataTableFacetedFilter
              column={table.getColumn("userTypes")}
              title="User Type"
              options={userTypes}
              selectedValues={filterValues.userType}
              onSelectionChange={(values) =>
                setFilterValues("userType", values)
              }
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
