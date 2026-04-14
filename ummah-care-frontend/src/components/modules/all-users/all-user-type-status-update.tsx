"use client";

import { updateUserTypeStatus } from "@/actions/user.action";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUERY_KEY } from "@/constants/query.const";
import { USER_TYPE_STATUS } from "@/constants/user.const";
import { useAsyncFormSubmit } from "@/hooks/use-async-form-submit";
import { useRefreshQuery } from "@/hooks/use-refresh-query";
import { IUserType } from "@/types";
import { createOptions } from "@/utils/form-utils";
import { Edit } from "lucide-react";
import { useState } from "react";

type AllUserTypeStatusUpdateProps = {
  userTypeId: string;
  userType: IUserType;
};

const statusOptions = createOptions(USER_TYPE_STATUS);

export function AllUserTypeStatusUpdate({
  userTypeId,
  userType,
}: AllUserTypeStatusUpdateProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>(userType.status);

  const { refresh } = useRefreshQuery([QUERY_KEY.USER.ALL_USERS]);

  const handleUpdateStatus = useAsyncFormSubmit<string, unknown>({
    mutateAsync: async (status: string) => {
      setIsPending(true);
      const response = await updateUserTypeStatus(userTypeId, status);
      setIsPending(false);
      return response;
    },
    loadingMessage: "Updating user type status...",
    successMessage: "User type status updated successfully!",
    errorMessage: "Failed to update user type status.",
    onSuccess: async () => {
      setOpen(false);
      await refresh();
    },
    onError: () => {
      setOpen(false);
    },
  });

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          Update
          <Edit className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="capitalize">
            Update {userType.type.toLowerCase()} Status
          </AlertDialogTitle>
          <AlertDialogDescription className="capitalize">
            Select a new status for the {userType.type.toLowerCase()} role.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>New Status</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            Close
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending || selectedStatus === userType.status}
            onClick={(e) => {
              e.preventDefault();
              handleUpdateStatus(selectedStatus);
            }}
          >
            {isPending ? "Updating..." : "Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
