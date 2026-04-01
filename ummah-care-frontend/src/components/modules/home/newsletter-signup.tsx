import { TypographyH3, TypographyMuted } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { ArrowRightIcon, AtSignIcon } from "lucide-react";

export function NewsletterSignup() {
  return (
    <>
      <Separator />
      <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-x bg-secondary/80 px-2 py-8 md:px-4 dark:bg-secondary/40">
        <div className="space-y-1">
          <TypographyH3 className="text-center md:text-4xl">
            Subscribe to our newsletter
          </TypographyH3>
          <TypographyMuted className="text-balance text-center md:text-base">
            Get the latest updates and insights delivered right to your inbox.
          </TypographyMuted>
        </div>
        <div className="flex items-center justify-center gap-2">
          <InputGroup className="max-w-70 bg-card">
            <InputGroupInput placeholder="Enter your email" />
            <InputGroupAddon>
              <AtSignIcon data-icon="inline-start" />
            </InputGroupAddon>
          </InputGroup>
          <Button size="sm">
            Subscribe <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </div>
      <Separator />
    </>
  );
}
