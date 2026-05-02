/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import useDebounce from "@/hooks/use-debounce";
import { useFetch } from "@/hooks/use-fetch";
import { IApiErrorResponse, IApiResponse } from "@/types";
import { AnyFieldApi } from "@tanstack/react-form";
import { useContext, useState } from "react";
import { DataTableModalPortalContext } from "../table/data-table-modal";

export type SingleComboboxItem = {
  id: string;
  label: string;
  value: string;
  meta?: Record<string, any>;
};

type QueryFn = (
  query: string,
) => Promise<IApiResponse<SingleComboboxItem[]> | IApiErrorResponse>;

type AppSearchableSingleComboboxProps = {
  field: AnyFieldApi;
  label?: string;
  queryKey: string;
  placeholder?: string;
  queryFn: QueryFn;
  portalContainer?: HTMLElement | null;
  renderItem?: (item: SingleComboboxItem) => React.ReactNode;
};

export default function AppSearchableSingleCombobox({
  field,
  label,
  queryKey,
  placeholder = "Search and select...",
  queryFn,
  portalContainer,
  renderItem,
}: AppSearchableSingleComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const modalPortalContainer = useContext(DataTableModalPortalContext);
  const container = portalContainer || modalPortalContainer || undefined;

  const debouncedQuery = useDebounce(search.trim());

  const { data, isLoading, isError, error } = useFetch({
    queryKey: [queryKey, debouncedQuery],
    queryFn: () => queryFn(`search=${debouncedQuery}`),
  });

  const items = data?.data ?? [];

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setSearch("");
  };

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const selectedItem =
    items.find((item) => item.value === field.state.value) ?? null;

  return (
    <Field data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <FieldContent>
        <Combobox
          id={field.name}
          name={field.name}
          open={open}
          items={items}
          value={selectedItem}
          onOpenChange={handleOpenChange}
          itemToStringLabel={(item: SingleComboboxItem) => item.label}
          onValueChange={(item) => field.handleChange(item?.value ?? "")}
        >
          <ComboboxInput
            showClear
            placeholder={placeholder}
            onChange={(e) => setSearch(e.target.value)}
            aria-invalid={isInvalid}
          />
          <ComboboxContent container={container}>
            {isLoading ? (
              <ComboboxSkeleton />
            ) : isError || !data?.success ? (
              <ComboboxEmpty>
                {data?.message ?? error?.message ?? "Failed to load data"}
              </ComboboxEmpty>
            ) : items.length === 0 ? (
              <ComboboxEmpty>No results found.</ComboboxEmpty>
            ) : (
              <ComboboxList>
                {(item: SingleComboboxItem) => (
                  <ComboboxItem key={item.id} value={item}>
                    {renderItem ? (
                      renderItem(item)
                    ) : (
                      <DefaultItem item={item} />
                    )}
                  </ComboboxItem>
                )}
              </ComboboxList>
            )}
          </ComboboxContent>
        </Combobox>
      </FieldContent>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

function DefaultItem({ item }: { item: SingleComboboxItem }) {
  return (
    <Item size="xs" className="flex items-center gap-3 p-1">
      <ItemContent className="min-w-0">
        <ItemTitle className="truncate">{item.label}</ItemTitle>
      </ItemContent>
    </Item>
  );
}

function ComboboxSkeleton() {
  return (
    <div className="space-y-2 p-2">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Skeleton key={idx} className="h-7 w-full" />
      ))}
    </div>
  );
}
