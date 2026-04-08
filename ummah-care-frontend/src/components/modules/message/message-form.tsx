"use client";

import { createMessage, updateMessage } from "@/actions/message.action";
import { AppForm } from "@/components/shared/form/app-form";
import AppTextareaField from "@/components/shared/form/app-textarea-field";
import { FieldGroup } from "@/components/ui/field";
import { QUERY_KEY } from "@/constants/query.const";
import { useRefreshQuery } from "@/hooks/use-refresh-query";
import { IMessageResponse, TMessagePayload } from "@/types";
import { createMessageSchema } from "./message.schema";

type MessageFormProps = {
  data?: IMessageResponse;
  requestId: string;
  receiverId: string;
};

export default function MessageForm({
  data,
  receiverId,
  requestId,
}: MessageFormProps) {
  const isUpdate = Boolean(data?.id);

  const { refresh } = useRefreshQuery(
    [QUERY_KEY.MESSAGE.MY_CONVERSATION, requestId, receiverId],
    {
      withRouterRefresh: false,
    },
  );

  const defaultValues: TMessagePayload = {
    message: data?.message ?? "",
    receiverId,
    requestId,
  };

  const messages = {
    loading: isUpdate ? "Updating message..." : "Sending message...",
    success: isUpdate
      ? "Message updated successfully!"
      : "Message sent successfully!",
    error: isUpdate ? "Failed to update message" : "Failed to send message",
    button: isUpdate ? "Update Message" : "Send",
  };

  const mutationFn = isUpdate
    ? (payload: TMessagePayload) => {
        if (!data?.id) throw new Error("Message ID is required for update");
        return updateMessage(data.id, payload);
      }
    : createMessage;

  return (
    <AppForm<TMessagePayload>
      mutationFn={mutationFn}
      schema={createMessageSchema}
      defaultValues={defaultValues}
      submitButtonText={messages.button}
      loadingMessage={messages.loading}
      successMessage={messages.success}
      errorMessage={messages.error}
      onSuccess={async () => await refresh()}
    >
      {(form) => (
        <FieldGroup>
          <form.Field name="message">
            {(field) => (
              <AppTextareaField
                field={field}
                label="Message"
                placeholder="Type your message here..."
                className="min-h-10 text-xs md:min-h-16 md:text-sm"
              />
            )}
          </form.Field>
        </FieldGroup>
      )}
    </AppForm>
  );
}
