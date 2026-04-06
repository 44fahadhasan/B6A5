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
import { ReactNode } from "react";

type AppModalProps = {
  title?: string;
  description?: string;
  triggerText?: string;
  triggerClassName?: string;
  className?: string;
  children: ReactNode;
  variant?:
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive";
  icon?: ReactNode;
  onOpenChange?: (open: boolean) => void;
};

export function AppModal({
  title,
  description,
  triggerText,
  triggerClassName,
  className,
  children,
  variant = "default",
  icon,
  onOpenChange,
}: AppModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      {triggerText && (
        <DialogTrigger asChild>
          <Button size="sm" className={cn(triggerClassName)} variant={variant}>
            {triggerText}
            {icon && <span className="ml-1">{icon}</span>}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent
        className={cn("sm:max-w-xl", className)}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        <ScrollArea className="max-h-[70vh] pr-4">{children}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
