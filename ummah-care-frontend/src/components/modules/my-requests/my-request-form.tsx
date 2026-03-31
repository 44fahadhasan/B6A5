"use client";

import { createMyRequest, updateMyRequest } from "@/actions/request.action";
import AppCheckboxField from "@/components/shared/form/app-checkbox-field";
import { AppForm } from "@/components/shared/form/app-form";
import AppInputField from "@/components/shared/form/app-input-field ";
import AppSelectField from "@/components/shared/form/app-select-field";
import AppTextareaField from "@/components/shared/form/app-textarea-field";
import { FieldGroup } from "@/components/ui/field";
import { QUERY_KEY } from "@/constants/query.const";
import { CATEGORY, HELP_TYPE, URGENCY } from "@/constants/request.const";
import { useRefreshQuery } from "@/hooks/use-refresh-query";
import { IRequestResponse, TRequestPayload } from "@/types";
import { createOptions } from "@/utils/form-utils";
import { myRequestSchema } from "./my-requests.schema";

const categoryOptions = createOptions(CATEGORY);
const urgencyOptions = createOptions(URGENCY);
const helpTypeOptions = createOptions(HELP_TYPE);

type MyRequestFormProps = {
  data?: IRequestResponse;
};

export default function MyRequestForm({ data }: MyRequestFormProps) {
  const { refresh } = useRefreshQuery([QUERY_KEY.REQUEST.MY_REQUEST]);

  const isUpdate = Boolean(data);

  const defaultValues: TRequestPayload = {
    title: data?.title ?? "",
    description: data?.description ?? "",
    category: data?.category ?? "FOOD",
    urgency: data?.urgency ?? "MEDIUM",
    helpType: data?.helpType ?? "PHYSICAL",
    location: data?.location ?? "",
    isAnonymous: data?.isAnonymous ?? false,
  };

  const messages = {
    loading: isUpdate ? "Updating request..." : "Creating request...",
    success: isUpdate
      ? "Request updated successfully!"
      : "Request created successfully!",
    error: isUpdate ? "Failed to update request" : "Failed to create request",
    button: isUpdate ? "Update Request" : "Create Request",
  };

  const mutationFn = isUpdate
    ? (payload: TRequestPayload) => {
        if (!data?.id) throw new Error("Request ID is required for update");
        return updateMyRequest(data.id, payload);
      }
    : createMyRequest;

  return (
    <AppForm<TRequestPayload, IRequestResponse>
      mutationFn={mutationFn}
      schema={myRequestSchema}
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
            <form.Field name="title">
              {(field) => (
                <AppInputField
                  field={field}
                  label="Title"
                  placeholder="Enter request title"
                />
              )}
            </form.Field>
            <form.Field name="description">
              {(field) => (
                <AppTextareaField
                  field={field}
                  label="Description"
                  placeholder="Describe your request"
                />
              )}
            </form.Field>
            <form.Field name="location">
              {(field) => (
                <AppInputField
                  field={field}
                  label="Location"
                  placeholder="Enter location (optional)"
                />
              )}
            </form.Field>
          </FieldGroup>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            <form.Field name="category">
              {(field) => (
                <AppSelectField
                  field={field}
                  label="Category"
                  placeholder="Select category"
                  options={categoryOptions}
                />
              )}
            </form.Field>
            <form.Field name="urgency">
              {(field) => (
                <AppSelectField
                  field={field}
                  label="Urgency"
                  placeholder="Select urgency"
                  options={urgencyOptions}
                />
              )}
            </form.Field>
            <form.Field name="helpType">
              {(field) => (
                <AppSelectField
                  field={field}
                  label="Help Type"
                  placeholder="Select help type"
                  options={helpTypeOptions}
                />
              )}
            </form.Field>
            <form.Field name="isAnonymous">
              {(field) => (
                <AppCheckboxField
                  field={field}
                  label="Post as Anonymous"
                  orientation="horizontal"
                  description="Your identity will be hidden from other users."
                />
              )}
            </form.Field>
          </FieldGroup>
        </>
      )}
    </AppForm>
  );
}
