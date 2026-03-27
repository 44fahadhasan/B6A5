"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function ContactForm() {
  return (
    <form className="w-full">
      <FieldGroup>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="first-name">First name</FieldLabel>
            <Input autoComplete="off" id="first-name" placeholder="John" />
          </Field>
          <Field>
            <FieldLabel htmlFor="last-name">Last name</FieldLabel>
            <Input autoComplete="off" id="last-name" placeholder="Doe" />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            autoComplete="off"
            id="email"
            placeholder="johndoe@example.com"
            type="email"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">
            Phone <span className="text-muted-foreground">(Optional)</span>
          </FieldLabel>
          <Input
            autoComplete="off"
            id="phone"
            placeholder="+1 (555) 123-4567"
            type="tel"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="message">How can we help?</FieldLabel>
          <Textarea
            autoComplete="off"
            id="message"
            placeholder="Your message"
          />
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="consent" />
          <FieldLabel
            className="font-normal text-muted-foreground text-sm leading-snug"
            htmlFor="consent"
          >
            I agree to the{" "}
            <Link
              className="text-primary hover:underline"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
            .
          </FieldLabel>
        </Field>
      </FieldGroup>
      <Button className="mt-5 w-full" type="button">
        Submit
      </Button>
    </form>
  );
}
