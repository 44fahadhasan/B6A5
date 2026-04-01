import { RequestsFilters } from "./requests-filters";
import { RequestsHeader } from "./requests-header";
import { RequestsList } from "./requests-list";
import { RequestsLoadingSkeleton } from "./requests-loading-skeleton";
import { RequestsPagination } from "./requests-pagination";

export default function Requests() {
  return (
    <div className="max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 py-8 space-y-7">
      <RequestsHeader />
      <RequestsFilters />
      <RequestsList />
      <RequestsLoadingSkeleton />
      <RequestsPagination />
    </div>
  );
}
