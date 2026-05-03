import Tasks from "@/components/modules/tasks";
import {
  RawQueryParams,
  buildQueryString,
} from "@/utils/build-query-string.util";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<RawQueryParams>;
}) {
  const queryParamsObjects = await searchParams;
  const queryString = buildQueryString(queryParamsObjects);

  return <Tasks queryString={queryString} />;
}
