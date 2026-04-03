import {
  dehydrate,
  QueryClient,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";

export async function prefetchQuery<T>(
  queryKey: QueryKey,
  queryFn: QueryFunction<T>,
) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey, queryFn });

  return {
    queryClient,
    dehydratedState: dehydrate(queryClient),
  };
}
