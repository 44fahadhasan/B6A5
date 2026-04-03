import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideAlertCircle } from "lucide-react";

type ErrorMessageProps = {
  name?: string;
  message?: string;
};

export function ErrorMessage({
  name,
  message = '"Something went wrong"',
}: ErrorMessageProps) {
  return (
    <Card size="sm" className={cn("ring-destructive bg-destructive/10")}>
      <CardContent className="flex flex-col items-center justify-center p-0">
        <LucideAlertCircle className="size-7 text-destructive mb-1" />
        {name && <CardTitle className="text-destructive">{name}</CardTitle>}
        <CardDescription className="text-destructive">
          {message}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
