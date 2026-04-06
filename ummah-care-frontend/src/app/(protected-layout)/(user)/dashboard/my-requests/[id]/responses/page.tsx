import MyRequestResponses from "@/components/modules/my-request-response";
import {
  buildQueryString,
  RawQueryParams,
} from "@/utils/build-query-string.util";

type MyRequestResponsesPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<RawQueryParams>;
};

export default async function MyRequestResponsesPage({
  params,
  searchParams,
}: MyRequestResponsesPageProps) {
  const { id } = await params;

  const queryParamsObjects = await searchParams;
  const queryString = buildQueryString(queryParamsObjects);

  return <MyRequestResponses requestId={id} queryString={queryString} />;
}
