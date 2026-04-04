import { getRequestById } from "@/actions/request.action";
import { ErrorMessage } from "@/components/shared/error-message";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import RequestDetailsContent from "./request-details-content";

export default async function RequestDetails({ id }: { id: string }) {
  const { data } = await prefetchQuery(
    [QUERY_KEY.REQUEST.REQUEST_DETAILS, id],
    () => getRequestById(id),
  );

  if (!data?.success) {
    return <ErrorMessage message={data?.message} />;
  }

  return <RequestDetailsContent request={data.data} />;
}
