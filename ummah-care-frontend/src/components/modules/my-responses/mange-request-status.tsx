"use client";

import { updateRequestStatus } from "@/actions/request.action";
import { AppForm } from "@/components/shared/form/app-form";
import AppSelectField from "@/components/shared/form/app-select-field";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { QUERY_KEY } from "@/constants/query.const";
import { REQUEST_STATUS } from "@/constants/request.const";
import { useRefreshQuery } from "@/hooks/use-refresh-query";
import { IRequestResponse, TRequestStatusUpdatePayload } from "@/types";
import { createOptions } from "@/utils/form-utils";
import { requestStatusUpdateSchema } from "../my-requests/my-requests.schema";

type Props = {
  requestId: string;
  currentStatus: TRequestStatusUpdatePayload["status"];
};

const statusOptions = createOptions(REQUEST_STATUS);

export default function MangeRequestStatus({
  requestId,
  currentStatus,
}: Props) {
  const { refresh } = useRefreshQuery([QUERY_KEY.REQUEST.MY_REQUEST]);

  const defaultValues: TRequestStatusUpdatePayload = {
    status: currentStatus,
  };

  const mutationFn = (payload: TRequestStatusUpdatePayload) =>
    updateRequestStatus(requestId, payload);

  return (
    <AppForm<TRequestStatusUpdatePayload, IRequestResponse>
      mutationFn={mutationFn}
      schema={requestStatusUpdateSchema}
      defaultValues={defaultValues}
      submitButtonText="Update Status"
      loadingMessage="Updating status..."
      successMessage="Request status updated successfully!"
      errorMessage="Failed to update request status"
      onSuccess={async () => await refresh()}
    >
      {(form) => (
        <FieldGroup>
          <form.Field name="status">
            {(field) => (
              <AppSelectField
                field={field}
                label="Request Status"
                placeholder="Select status"
                options={statusOptions.slice(0, 3)}
              />
            )}
          </form.Field>
          <FieldDescription className="text-destructive">
            Note: Requests marked as <strong>Completed</strong> cannot be
            updated.
          </FieldDescription>
        </FieldGroup>
      )}
    </AppForm>
  );
}
