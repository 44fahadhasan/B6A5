"use client";

import { createCampaign, updateCampaign } from "@/actions/campaign.action";
import { AppForm } from "@/components/shared/form/app-form";
import AppInputField from "@/components/shared/form/app-input-field ";
import AppSelectField from "@/components/shared/form/app-select-field";
import AppTextareaField from "@/components/shared/form/app-textarea-field";
import { FieldGroup } from "@/components/ui/field";
import { CAMPAIGN_CURRENCY, CAMPAIGN_STATUS } from "@/constants/campaign.const";
import { QUERY_KEY } from "@/constants/query.const";
import { useRefreshQuery } from "@/hooks/use-refresh-query";
import { ICampaignResponse, TCampaignPayload } from "@/types/campaign.type";
import { createOptions } from "@/utils/form-utils";
import { createCampaignSchema } from "./campaign.schema";

const currencyOptions = createOptions(CAMPAIGN_CURRENCY);
const statusOptions = createOptions(CAMPAIGN_STATUS);

type CampaignFormProps = {
  data?: ICampaignResponse;
};

export default function CampaignForm({ data }: CampaignFormProps) {
  const { refresh } = useRefreshQuery([QUERY_KEY.CAMPAIGN.CAMPAIGNS]);

  const isUpdate = Boolean(data);

  const defaultValues: TCampaignPayload = {
    title: data?.title ?? "",
    description: data?.description ?? "",
    goalAmount: data?.goalAmount ?? 0,
    currency: data?.currency ?? CAMPAIGN_CURRENCY.BDT,
    status: data?.status ?? CAMPAIGN_STATUS.ACTIVE,
    // startDate: data?.startDate ?? "",
    // endDate: data?.endDate ?? "",
  };

  const messages = {
    loading: isUpdate ? "Updating campaign..." : "Creating campaign...",
    success: isUpdate
      ? "Campaign updated successfully!"
      : "Campaign created successfully!",
    error: isUpdate ? "Failed to update campaign" : "Failed to create campaign",
    button: isUpdate ? "Update Campaign" : "Create Campaign",
  };

  const mutationFn = isUpdate
    ? (payload: TCampaignPayload) => {
        if (!data?.id) throw new Error("Campaign ID is required for update");
        return updateCampaign(data.id, payload);
      }
    : createCampaign;

  return (
    <AppForm
      mutationFn={mutationFn}
      schema={createCampaignSchema}
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
                  placeholder="Enter campaign title"
                />
              )}
            </form.Field>
            <form.Field name="description">
              {(field) => (
                <AppTextareaField
                  field={field}
                  label="Description"
                  placeholder="Describe your campaign"
                />
              )}
            </form.Field>
          </FieldGroup>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            <form.Field name="goalAmount">
              {(field) => (
                <AppInputField
                  field={field}
                  label="Goal Amount"
                  type="number"
                  placeholder="Enter goal amount"
                />
              )}
            </form.Field>
            <form.Field name="currency">
              {(field) => (
                <AppSelectField
                  field={field}
                  label="Currency"
                  placeholder="Select currency"
                  options={currencyOptions}
                />
              )}
            </form.Field>
            <form.Field name="status">
              {(field) => (
                <AppSelectField
                  field={field}
                  label="Status"
                  placeholder="Select status"
                  options={statusOptions}
                />
              )}
            </form.Field>
          </FieldGroup>

          {/* <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            <form.Field name="startDate">
              {(field) => (
                <AppInputField
                  field={field}
                  label="Start Date (Optional)"
                  type="datetime-local"
                />
              )}
            </form.Field>
            <form.Field name="endDate">
              {(field) => (
                <AppInputField
                  field={field}
                  label="End Date (Optional)"
                  type="datetime-local"
                />
              )}
            </form.Field>
          </FieldGroup> */}
        </>
      )}
    </AppForm>
  );
}
