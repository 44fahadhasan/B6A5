"use client";

import {
  roles,
  statuses,
} from "@/components/modules/all-users/all-users-table-data";
import { DataTableFacetedFilter } from "@/components/shared/table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/shared/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface AllUsersTableToolbarProps<TData> {
  table: Table<TData>;
}

export function AllUsersTableToolbar<TData>({
  table,
}: AllUsersTableToolbarProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(
    new Set(searchParams.getAll("role")),
  );
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(
    new Set(searchParams.getAll("status")),
  );
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("role");
    selectedRoles.forEach((r) => params.append("role", r));
    params.delete("status");
    selectedStatuses.forEach((s) => params.append("status", s));
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    if (params.toString() !== searchParams.toString()) {
      router.replace(`?${params}`, { scroll: false });
    }
  }, [selectedRoles, selectedStatuses, debouncedSearch, router, searchParams]);

  const isFiltered =
    selectedRoles.size > 0 || selectedStatuses.size > 0 || search.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Filter users..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-8 w-37.5 lg:w-62.5"
        />
        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
            options={roles}
            selectedValues={selectedRoles}
            onSelectionChange={setSelectedRoles}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
            selectedValues={selectedStatuses}
            onSelectionChange={setSelectedStatuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedRoles(new Set());
              setSelectedStatuses(new Set());
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
