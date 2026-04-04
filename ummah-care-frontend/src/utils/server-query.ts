import { IApiResponse } from "@/types";
import {
  dehydrate,
  QueryClient,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";

export async function prefetchQuery<T>(
  queryKey: QueryKey,
  queryFn: QueryFunction<IApiResponse<T>>,
) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey, queryFn });

  const data = queryClient.getQueryData<IApiResponse<T>>(queryKey);

  return {
    data,
    queryClient,
    dehydratedState: dehydrate(queryClient),
  };
}
