import { RequestCard } from "./request-card";
import { RequestsEmptyState } from "./requests-empty-state";

export function RequestsList() {
  const hasData = true;

  if (!hasData) {
    return <RequestsEmptyState />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <RequestCard />
      <RequestCard />
      <RequestCard />
    </div>
  );
}
