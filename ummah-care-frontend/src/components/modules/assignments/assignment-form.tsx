"use client";

import {
  createAssignment,
  updateAssignment,
} from "@/actions/assignment.action";
import { AppForm } from "@/components/shared/form/app-form";
import AppInputField from "@/components/shared/form/app-input-field ";
import AppTextareaField from "@/components/shared/form/app-textarea-field";
import { FieldGroup } from "@/components/ui/field";
import {
  ASSIGNMENT_STATUS,
  ASSIGNMENT_TARGET_TYPE,
} from "@/constants/assignment.const";
import { QUERY_KEY } from "@/constants/query.const";
import { useRefreshQuery } from "@/hooks/use-refresh-query";
import {
  IAssignmentResponse,
  TCreateAssignmentPayload,
} from "@/types/assignment.type";
import { createAssignmentSchema } from "./assignments.schema";

type AssignmentFormProps = {
  data?: IAssignmentResponse;
};

export default function AssignmentForm({ data }: AssignmentFormProps) {
  const { refresh } = useRefreshQuery([QUERY_KEY.ASSIGNMENT.ASSIGNMENTS]);

  const isUpdate = Boolean(data);

  const defaultValues: TCreateAssignmentPayload = {
    requestId: data?.request.id ?? "",
    volunteerId: data?.volunteerId ?? "",
    targetType: data?.targetType ?? ASSIGNMENT_TARGET_TYPE.VOLUNTEER,
    status: data?.status ?? ASSIGNMENT_STATUS.ASSIGNED,
    notes: data?.notes ?? "",
  };

  const messages = {
    loading: isUpdate ? "Updating assignment..." : "Creating assignment...",
    success: isUpdate
      ? "Assignment updated successfully!"
      : "Assignment created successfully!",
    error: isUpdate
      ? "Failed to update assignment"
      : "Failed to create assignment",
    button: isUpdate ? "Update Assignment" : "Create Assignment",
  };

  const mutationFn = isUpdate
    ? (payload: TCreateAssignmentPayload) => {
        if (!data?.id) throw new Error("Assignment ID is required for update");
        return updateAssignment(data.id, payload);
      }
    : createAssignment;

  return (
    <AppForm
      mutationFn={mutationFn}
      schema={createAssignmentSchema}
      defaultValues={defaultValues}
      submitButtonText={messages.button}
      loadingMessage={messages.loading}
      successMessage={messages.success}
      errorMessage={messages.error}
      onSuccess={async () => await refresh()}
    >
      {(form) => (
        <>
          <FieldGroup>
            <form.Field name="requestId">
              {(field) => (
                <AppInputField
                  field={field}
                  label="Request ID"
                  placeholder="Enter request ID"
                />
              )}
            </form.Field>
            <form.Field name="volunteerId">
              {(field) => (
                <AppInputField
                  field={field}
                  label="Volunteer ID"
                  placeholder="Enter volunteer ID"
                />
              )}
            </form.Field>
          </FieldGroup>
          <FieldGroup>
            <form.Field name="notes">
              {(field) => (
                <AppTextareaField
                  field={field}
                  label="Notes"
                  placeholder="Add optional notes"
                />
              )}
            </form.Field>
          </FieldGroup>
        </>
      )}
    </AppForm>
  );
}
