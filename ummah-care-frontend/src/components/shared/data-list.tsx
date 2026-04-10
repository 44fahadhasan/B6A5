"use client";

import { cn } from "@/lib/utils";
import { IApiErrorResponse, IApiResponse } from "@/types";
import { ReactNode } from "react";
import { RequestsPagination } from "../modules/requests/requests-pagination";
import { ErrorMessage } from "./error-message";

type DataListProps<T> = {
  data?: IApiResponse<T[]> | IApiErrorResponse;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  renderItem: (item: T) => ReactNode;
  emptyState?: ReactNode;
  loadingState?: ReactNode;
  className?: string;
};

export function DataList<T>({
  data,
  isLoading,
  isError,
  error,
  renderItem,
  emptyState = null,
  loadingState = null,
  className,
}: DataListProps<T>) {
  if (isLoading) return loadingState;

  if (!data?.success || isError) {
    return (
      <ErrorMessage
        name={error?.name ?? "Error"}
        message={data?.message ?? error?.message}
      />
    );
  }

  const items = data?.data ?? [];

  return items.length ? (
    <div className="space-y-7">
      <div
        className={cn("grid sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}
      >
        {items.map(renderItem)}
      </div>
      {data?.success && "meta" in data && data.meta && (
        <RequestsPagination meta={data.meta} />
      )}
    </div>
  ) : (
    emptyState
  );
}
