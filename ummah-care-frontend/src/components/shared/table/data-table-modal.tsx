"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Edit, Eye } from "lucide-react";
import { createContext, JSX, ReactNode, useCallback, useState } from "react";
import { v4 as UUID4 } from "uuid";

export const DataTableModalPortalContext = createContext<HTMLElement | null>(
  null,
);

interface DataTableModalProps {
  mode: "create" | "edit" | "view";
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

type Mode = DataTableModalProps["mode"];

const btnTextMap: Record<Mode, string> = {
  create: "Add New",
  edit: "Edit Item",
  view: "View Details",
};

const iconMap: Partial<Record<Mode, JSX.Element>> = {
  edit: <Edit />,
  view: <Eye />,
};

export function DataTableModal({
  mode,
  title,
  description,
  className,
  children,
}: DataTableModalProps) {
  const [dialogContentContainer, setDialogContentContainer] =
    useState<HTMLElement | null>(null);

  const dialogContentRef = useCallback((node: HTMLDivElement | null) => {
    setDialogContentContainer(node);
  }, []);

  return (
    <DataTableModalPortalContext.Provider value={dialogContentContainer}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={cn(
              mode !== "create" && "flex justify-between w-full capitalize",
            )}
            variant={mode === "create" ? "default" : "ghost"}
          >
            {btnTextMap[mode]}
            {iconMap[mode] ?? null}
          </Button>
        </DialogTrigger>
        <DialogContent
          aria-describedby={description ? `${mode}-${UUID4()}` : undefined}
          className={cn("sm:max-w-xl", className)}
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <div ref={dialogContentRef} className="relative">
              {children}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </DataTableModalPortalContext.Provider>
  );
}
