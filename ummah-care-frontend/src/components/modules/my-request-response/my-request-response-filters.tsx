import QueryResetButton from "@/components/shared/query-filters/query-reset-button";
import QuerySelect from "@/components/shared/query-filters/query-select";
import { RESPONSE_TYPE } from "@/constants/response.const";
import { createOptions } from "@/utils/form-utils";

export function MyRequestResponseFilters() {
  return (
    <div className="flex flex-wrap gap-3 items-center border rounded-lg p-4 bg-muted/30">
      <QuerySelect
        paramName="responseType"
        placeholder="Response Type"
        options={createOptions(RESPONSE_TYPE)}
      />

      <QueryResetButton />
    </div>
  );
}
