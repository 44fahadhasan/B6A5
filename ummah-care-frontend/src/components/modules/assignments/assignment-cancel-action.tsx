"use client";

import { cancelAssignment } from "@/actions/assignment.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { QUERY_KEY } from "@/constants/query.const";
import { useAsyncFormSubmit } from "@/hooks/use-async-form-submit";
import { useRefreshQuery } from "@/hooks/use-refresh-query";
import { IAssignmentResponse } from "@/types";
import { X } from "lucide-react";
import { useState } from "react";

type AssignmentCancelActionProps = {
  id: string;
  label: string;
};

export function AssignmentCancelAction({
  id,
  label,
}: AssignmentCancelActionProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const { refresh } = useRefreshQuery([QUERY_KEY.ASSIGNMENT.ASSIGNMENTS]);

  const handleCancel = useAsyncFormSubmit<string, IAssignmentResponse>({
    mutateAsync: async (assignmentId: string) => {
      setIsPending(true);
      const response = await cancelAssignment(assignmentId);
      setIsPending(false);
      return response;
    },
    loadingMessage: "Canceling assignment...",
    successMessage: "Assignment canceled successfully!",
    errorMessage: "Failed to cancel assignment.",
    onSuccess: async () => {
      await refresh();
      setOpen(false);
    },
    onError: () => {
      setOpen(false);
    },
  });

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          onClick={() => setOpen(true)}
          className="flex justify-between w-full"
        >
          Cancel
          <X />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. <strong>&quot;{label}&quot;</strong>{" "}
            will be marked as canceled.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            Close
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              handleCancel(id);
            }}
          >
            {isPending ? "Canceling..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
