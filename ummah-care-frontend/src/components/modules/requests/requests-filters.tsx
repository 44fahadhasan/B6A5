import QueryResetButton from "@/components/shared/query-filters/query-reset-button";
import QuerySelect from "@/components/shared/query-filters/query-select";
import { createOptions } from "@/utils/form-utils";
import { FILTER_CONFIG } from "./filter.config";

export function RequestsFilters() {
  return (
    <div className="flex flex-wrap gap-3 items-center border rounded-lg p-4 bg-muted/30">
      {FILTER_CONFIG.map((filter) => (
        <QuerySelect
          key={filter.paramName}
          paramName={filter.paramName}
          placeholder={filter.placeholder}
          options={createOptions(filter.source)}
        />
      ))}

      <QueryResetButton />
    </div>
  );
}
