"use client";

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
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useRefreshQuery } from "@/hooks/use-refresh-query";
import { IApiErrorResponse, IApiResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Delete } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DataTableRowDeleteActionProps {
  id: string;
  label?: string;
  showIcon?: boolean;
  showSeparator?: boolean;
  queryKey: string;
  deleteFun: (id: string) => Promise<IApiResponse | IApiErrorResponse>;
}

export function DataTableRowDeleteAction({
  id,
  label,
  queryKey,
  deleteFun,
  showIcon = true,
  showSeparator = true,
}: DataTableRowDeleteActionProps) {
  const [open, setOpen] = useState<boolean>(false);

  const { refresh } = useRefreshQuery([queryKey]);
  const { mutateAsync, isPending } = useMutation({ mutationFn: deleteFun });

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting... Please wait.");

    try {
      const { success, message } = await mutateAsync(id);

      if (!success) {
        toast.error(message || "Failed to delete.", { id: toastId });
        return;
      }

      toast.success(message || "Deleted successfully", { id: toastId });

      await refresh();
      setOpen(false);
    } catch (error) {
      toast.error((error as Error)?.message || "Something went wrong.", {
        id: toastId,
      });
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <div>
          {showSeparator && <DropdownMenuSeparator />}
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setOpen(true)}
            className="flex justify-between w-full"
          >
            Delete
            {showIcon && <Delete />}
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
            {label ? (
              <>
                <strong>&quot;{label}&quot;</strong> will be permanently deleted
                from our servers.
              </>
            ) : (
              "This item will be permanently deleted from our servers."
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            {isPending ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
