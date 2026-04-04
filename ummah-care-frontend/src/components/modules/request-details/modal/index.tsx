import { getRequestById } from "@/actions/request.action";
import { ErrorMessage } from "@/components/shared/error-message";
import { QUERY_KEY } from "@/constants/query.const";
import { prefetchQuery } from "@/utils/server-query";
import RequestDetailsContent from "../request-details-content";
import ModalWrapper from "./modal-wrapper";

type RequestDetailsModalProps = { id: string };

export default async function RequestDetailsModal({
  id,
}: RequestDetailsModalProps) {
  const { data } = await prefetchQuery(
    [QUERY_KEY.REQUEST.REQUEST_DETAILS, id],
    () => getRequestById(id),
  );

  return (
    <ModalWrapper>
      {data?.success ? (
        <RequestDetailsContent request={data.data} />
      ) : (
        <ErrorMessage message={data?.message} />
      )}
    </ModalWrapper>
  );
}
