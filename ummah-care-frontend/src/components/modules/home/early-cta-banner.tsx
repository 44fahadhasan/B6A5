import { Button } from "@/components/ui/button";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export function EarlyCtaBanner() {
  return (
    <div className="py-16">
      <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between border-x">
        <div className="overflow-x-hidden">
          <FullWidthDivider className="-top-p" contained />
        </div>
        <div className="border-b px-2 py-8">
          <h2 className="text-center font-semibold text-lg md:text-2xl">
            Start Making a Difference Today.
          </h2>
          <p className="text-balance text-center text-muted-foreground text-sm md:text-base">
            Join as a{" "}
            <span className="font-semibold text-foreground">volunteer</span> or{" "}
            <span className="font-semibold text-foreground">donor</span> and
            help the Ummah thrive.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 bg-secondary/80 p-4 dark:bg-secondary/40">
          <Button asChild size="sm">
            <Link href="/sign-up">
              Get Started <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </div>
        <FullWidthDivider className="-bottom-px" contained />
      </div>
    </div>
  );
}
