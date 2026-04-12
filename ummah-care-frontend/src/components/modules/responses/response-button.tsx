"use client";

import { AppModal } from "@/components/shared/app-modal";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import { THelpType } from "@/types";
import { toast } from "sonner";
import ResponseForm from "./response-form";

type ResponseButtonProps = {
  isUrgent: boolean;
  requestId: string;
  helpType: THelpType;
};

export default function ResponseButton({
  isUrgent,
  requestId,
  helpType,
}: ResponseButtonProps) {
  const session = useSession();

  const buttonText = isUrgent ? "Help Now" : "Offer Help";
  const buttonVariant = isUrgent ? "destructive" : "default";

  return (
    <>
      {session ? (
        <AppModal
          className="sm:max-w-sm"
          triggerClassName="flex-1"
          variant={buttonVariant}
          triggerText={buttonText}
        >
          <ResponseForm helpType={helpType} requestId={requestId} />
        </AppModal>
      ) : (
        <Button
          size="sm"
          className="flex-1"
          variant={buttonVariant}
          onClick={() => {
            toast.error("You must be signed in to respond to this request.");
          }}
        >
          {buttonText}
        </Button>
      )}
    </>
  );
}
