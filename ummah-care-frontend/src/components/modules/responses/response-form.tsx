"use client";

import { createResponse, updateResponse } from "@/actions/response.actions";
import { AppForm } from "@/components/shared/form/app-form";
import AppSelectField from "@/components/shared/form/app-select-field";
import AppTextareaField from "@/components/shared/form/app-textarea-field";
import { FieldGroup } from "@/components/ui/field";
import { QUERY_KEY } from "@/constants/query.const";
import { USER_STATUS } from "@/constants/user.const";
import { useRefreshQuery } from "@/hooks/use-refresh-query";
import { useSession } from "@/hooks/use-session";
import {
  ICreateMyResponse,
  IResponse,
  IUpdateMyResponse,
  TResponsePayload,
  TResponseType,
} from "@/types";
import InactiveAccountCard from "./inactive-account-card";
import { createResponseSchema } from "./response.schema";
import { getResponseTypeOptions } from "./response.utils";

type ResponseFormProps = {
  data?: IResponse;
  requestId: string;
};

export default function ResponseForm({ data, requestId }: ResponseFormProps) {
  const isUpdate = Boolean(data);

  const { refresh } = useRefreshQuery([QUERY_KEY.RESPONSE.MY_RESPONSES]);

  const session = useSession();

  if (!session || session.user.status !== USER_STATUS.ACTIVE) return null;

  const responseTypeOptions = getResponseTypeOptions(session.user.userTypes);

  if (responseTypeOptions.length === 0) {
    return <InactiveAccountCard />;
  }

  const defaultValues: TResponsePayload = {
    requestId,
    responseType:
      data?.responseType ?? (responseTypeOptions[0].value as TResponseType),
    message: data?.message ?? "",
  };

  const messages = {
    loading: isUpdate ? "Updating response..." : "Creating response...",
    success: isUpdate
      ? "Response updated successfully!"
      : "Response created successfully!",
    error: isUpdate ? "Failed to update response" : "Failed to create response",
    button: isUpdate ? "Update Response" : "Submit",
  };

  const mutationFn = isUpdate
    ? (payload: TResponsePayload) => {
        if (!data?.id) throw new Error("Response ID is required for update");
        return updateResponse(data.id, payload);
      }
    : createResponse;

  return (
    <AppForm<TResponsePayload, ICreateMyResponse | IUpdateMyResponse>
      mutationFn={mutationFn}
      schema={createResponseSchema}
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
            <form.Field name="responseType">
              {(field) => (
                <AppSelectField
                  field={field}
                  label="Response Type"
                  placeholder="Select response type"
                  options={responseTypeOptions}
                />
              )}
            </form.Field>
            <form.Field name="message">
              {(field) => (
                <AppTextareaField
                  field={field}
                  label="Message (optional)"
                  placeholder="Enter a message for your response"
                />
              )}
            </form.Field>
          </FieldGroup>
        </>
      )}
    </AppForm>
  );
}
