import MyResponses from "@/components/modules/my-responses";
import { RESPONSE_TYPE } from "@/constants/response.const";
import {
  buildQueryString,
  RawQueryParams,
} from "@/utils/build-query-string.util";

export default async function MyResponsesPage({
  searchParams,
}: {
  searchParams: Promise<RawQueryParams>;
}) {
  const queryParamsObjects = await searchParams;

  const queryString = buildQueryString({
    ...queryParamsObjects,
    responseType: RESPONSE_TYPE.DONATE,
  });

  return <MyResponses queryString={queryString} />;
}
