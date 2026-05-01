import Assignments from "@/components/modules/assignments";
import {
  RawQueryParams,
  buildQueryString,
} from "@/utils/build-query-string.util";

export default async function AssignmentsPage({
  searchParams,
}: {
  searchParams: Promise<RawQueryParams>;
}) {
  const queryParamsObjects = await searchParams;
  const queryString = buildQueryString(queryParamsObjects);

  return <Assignments queryString={queryString} />;
}
