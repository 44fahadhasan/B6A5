"use client";

import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type UseRefreshQueryOptions = {
  withRouterRefresh?: boolean;
  refetchType?: "all" | "active" | "inactive";
};

export function useRefreshQuery(
  queryKey: QueryKey,
  options?: UseRefreshQueryOptions,
) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { withRouterRefresh = true, refetchType = "all" } = options || {};

  const refresh = async () => {
    if (withRouterRefresh) {
      router.refresh();
    }

    await queryClient.invalidateQueries({ queryKey });
    await queryClient.refetchQueries({ queryKey, type: refetchType });
  };

  return { refresh };
}
