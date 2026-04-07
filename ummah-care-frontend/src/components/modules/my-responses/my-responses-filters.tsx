"use client";

import QueryResetButton from "@/components/shared/query-filters/query-reset-button";
import QuerySelect from "@/components/shared/query-filters/query-select";
import { USER_STATUS } from "@/constants/user.const";
import { useSession } from "@/hooks/use-session";
import { createOptions } from "@/utils/form-utils";
import { getResponseTypeOptions } from "../responses/response.utils";
import { FILTER_CONFIG } from "./filter.config";

export function MyResponsesFilters() {
  const session = useSession();

  if (!session || session.user.status !== USER_STATUS.ACTIVE) return null;

  const responseTypeOptions = getResponseTypeOptions(session.user.userTypes);

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

      <QuerySelect
        paramName="responseType"
        placeholder="Response Type"
        options={responseTypeOptions}
      />

      <QuerySelect
        paramName="sortOrder"
        placeholder="Sort"
        options={[
          {
            label: "Old",
            value: "asc",
          },
          {
            label: "New",
            value: "desc",
          },
        ]}
      />

      <QueryResetButton />
    </div>
  );
}
