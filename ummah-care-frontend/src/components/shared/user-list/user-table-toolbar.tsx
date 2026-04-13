"use client";

import { DataTableFacetedFilter } from "@/components/shared/table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/shared/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { type Table } from "@tanstack/react-table";
import { type LucideIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(
    new Set(searchParams.getAll("status")),
  );
  const [selectedUserTypes, setSelectedUserTypes] = useState<Set<string>>(
    new Set(searchParams.getAll("userType")),
  );
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("status");
    selectedStatuses.forEach((s) => params.append("status", s));
    params.delete("userType");
    selectedUserTypes.forEach((t) => params.append("userType", t));
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    if (params.toString() !== searchParams.toString()) {
      router.replace(`?${params}`, { scroll: false });
    }
  }, [
    selectedStatuses,
    selectedUserTypes,
    debouncedSearch,
    router,
    searchParams,
  ]);

  const isFiltered =
    selectedStatuses.size > 0 ||
    selectedUserTypes.size > 0 ||
    search.length > 0;

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
              selectedValues={selectedStatuses}
              onSelectionChange={setSelectedStatuses}
            />
          )}
        {showUserTypeFilter &&
          table.getColumn("userTypes") &&
          userTypes.length > 0 && (
            <DataTableFacetedFilter
              column={table.getColumn("userTypes")}
              title="User Type"
              options={userTypes}
              selectedValues={selectedUserTypes}
              onSelectionChange={setSelectedUserTypes}
            />
          )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedStatuses(new Set());
              setSelectedUserTypes(new Set());
              setSearch("");
            }}
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
