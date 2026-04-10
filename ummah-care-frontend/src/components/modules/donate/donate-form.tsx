"use client";

import {
  createDonation,
  initiateDonationPayment,
} from "@/actions/donate.action";
import { AppForm } from "@/components/shared/form/app-form";
import AppInputField from "@/components/shared/form/app-input-field ";
import AppSelectField from "@/components/shared/form/app-select-field";
import AppTextareaField from "@/components/shared/form/app-textarea-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FieldGroup } from "@/components/ui/field";
import { PAYMENT_CALLBACK_URL } from "@/constants/donate.const";
import { QUERY_KEY } from "@/constants/query.const";
import { useRefreshQuery } from "@/hooks/use-refresh-query";
import { cn } from "@/lib/utils";
import { IDonationResponse, TDonationPayload } from "@/types";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { createDonationSchema } from "./donate.schema";
import { PaymentActionCard } from "./payment-action-card";

type DonateFormProps = {
  requestId: string;
  campaignId?: string;
};

export default function DonateForm({ requestId, campaignId }: DonateFormProps) {
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [showPaymentCard, setShowPaymentCard] = useState(false);

  const { refresh } = useRefreshQuery([QUERY_KEY.RESPONSE.MY_RESPONSES], {
    withRouterRefresh: false,
  });

  const defaultValues: TDonationPayload = {
    requestId,
    campaignId,
    amount: "",
    currency: "BDT",
    notes: "",
  };

  const messages = {
    loading: "Processing donation...",
    success: "Donation created successfully!",
    error: "Failed to create donation",
    button: "Donate Now",
  };

  return (
    <div className="space-y-5">
      <AppForm<TDonationPayload, IDonationResponse>
        className={cn(paymentError || paymentUrl ? "hidden" : "")}
        mutationFn={createDonation}
        schema={createDonationSchema}
        defaultValues={defaultValues}
        submitButtonText={messages.button}
        loadingMessage={messages.loading}
        successMessage={messages.success}
        errorMessage={messages.error}
        onSuccess={async ({ data }) => {
          await refresh();

          setPaymentError("");

          const paymentRes = await initiateDonationPayment(data.id, {
            successUrl: PAYMENT_CALLBACK_URL.SUCCESS,
            cancelUrl: PAYMENT_CALLBACK_URL.CANCEL,
          });

          if (!paymentRes.success) {
            setPaymentError(paymentRes.message);
            return;
          }

          setPaymentUrl(paymentRes.data.paymentUrl);
          setShowPaymentCard(true);
        }}
      >
        {(form) => (
          <FieldGroup>
            <form.Field name="amount">
              {(field) => (
                <AppInputField
                  field={field}
                  label="Donation Amount"
                  placeholder="Enter amount (e.g., 100)"
                  type="number"
                  min="1"
                  step="1"
                />
              )}
            </form.Field>
            <form.Field name="currency">
              {(field) => (
                <AppSelectField
                  field={field}
                  label="Currency"
                  placeholder="Select currency"
                  options={[
                    { label: "BDT (Bangladeshi Taka)", value: "BDT" },
                    { label: "USD (US Dollar)", value: "USD" },
                    { label: "EUR (Euro)", value: "EUR" },
                  ]}
                />
              )}
            </form.Field>
            <form.Field name="notes">
              {(field) => (
                <AppTextareaField
                  field={field}
                  label="Notes"
                  placeholder="Add a personal message or note..."
                  className="min-h-16 text-xs md:text-sm"
                />
              )}
            </form.Field>
          </FieldGroup>
        )}
      </AppForm>

      {paymentError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{paymentError}</AlertDescription>
        </Alert>
      )}

      {showPaymentCard && <PaymentActionCard paymentUrl={paymentUrl} />}
    </div>
  );
}
