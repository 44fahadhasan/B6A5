"use client";

import { getSession } from "@/actions/auth-actions";
import { QUERY_KEY } from "@/constants/query.const";
import { useFetch } from "./use-fetch";

export const useSession = () => {
  const { data, isLoading, isError, error } = useFetch({
    queryKey: [QUERY_KEY.SESSION],
    queryFn: getSession,
    refetchOnWindowFocus: "always",
  });

  if (!data || !data.data) return null;

  return {
    isLoading,
    isError,
    error,
    user: data.data.user,
    session: data.data.session,
  };
};
