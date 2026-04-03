"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

type QueryResetButtonProps = {
  children?: ReactNode | string;
  className?: string;
};

export default function QueryResetButton({
  children,
  className,
}: QueryResetButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasParams = searchParams.toString().length > 0;
  if (!hasParams) return null;

  return (
    <Button
      size="sm"
      variant="outline"
      className={cn("ml-auto", className)}
      onClick={() => router.replace(pathname, { scroll: false })}
    >
      {children ? (
        children
      ) : (
        <>
          Reset
          <X />
        </>
      )}
    </Button>
  );
}
